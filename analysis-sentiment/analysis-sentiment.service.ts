import { Injectable } from '@nestjs/common';
import { Repository, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SentimentStatistics } from './entity/sentiment-statistics';
const util = require('../../util.js')
const config = require('../../config.js')

interface Sentiments {
  pleasure: string,
  anxiety: string,
  sorrow: string,
  embarrassed: string,
  anger: string,
  hurt: string
}

interface Prediction {
  sentiment: number;
  accuracy: number
}

@Injectable()
export class AnalysisSentimentService {
  constructor (
    @InjectRepository(SentimentStatistics) private sentimentStatisticsRepository: Repository<SentimentStatistics>,
  ) {}

  public async getNegativeSentimentPercentage(teenID: string): Promise<number> {
    const statistics: SentimentStatistics[] = await this.sentimentStatisticsRepository.find({ where: { id: teenID } });
    const sentimentIndexs = statistics.map(({sentiment}) => sentiment);
    var negativeEmotionCounts: number = 0;
    var positiveEmotionCounts: number = 0;
    sentimentIndexs.forEach(sentimentIndex => {
      if (sentimentIndex === '0')
        positiveEmotionCounts = positiveEmotionCounts+1;
      else 
        negativeEmotionCounts = negativeEmotionCounts+1;
    });

    if(positiveEmotionCounts+negativeEmotionCounts === 0)
      positiveEmotionCounts = 1;

    return Math.floor(negativeEmotionCounts/(positiveEmotionCounts+negativeEmotionCounts)*100);
  }

  public async getPeriodicSentimentStatistics(teenID: string, startDate: string, endDate: string): Promise<{ statistics: { date: Date; pleasure: number; anxiety: number; sorrow: number; embarrassed: number; anger: number; hurt: number; sentences: string[] }[] }> {
    // Date 객체로 변환
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    
    const statistics: SentimentStatistics[] = await this.sentimentStatisticsRepository.find({ where: { id: teenID } });
  
    const extractedData = statistics
        .filter(({ date }) => date >= parsedStartDate && date <= parsedEndDate) // 날짜 범위 필터링
        .map(({ date, sentiment, sentence }) => {
            const formattedDate = date.toISOString().split('T')[0];
            return { date: formattedDate, sentiment, sentence };
        });
  
    const dateSentimentCounts = new Map<string, Map<string, { count: number; sentences: string[] }>>();
  
    const sentimentEmotionMapping: { [key: string]: string } = {
      '0': 'pleasure',
      '1': 'anxiety',
      '2': 'sorrow',
      '3': 'embarrassed',
      '4': 'anger',
      '5': 'hurt',
    };
  
    const emotionCounts: { [key: string]: number } = {};
  
    const result: { date: Date; pleasure: number; anxiety: number; sorrow: number; embarrassed: number; anger: number; hurt: number; sentences: string[] }[] = [];
  
    extractedData.forEach(item => {
      const { date, sentiment, sentence } = item;
  
      const emotion = sentimentEmotionMapping[sentiment];
  
      if (!emotionCounts[emotion]) {
        emotionCounts[emotion] = 0;
      }
  
      emotionCounts[emotion]++;
  
      if (!dateSentimentCounts.has(date)) {
        dateSentimentCounts.set(date, new Map());
      }
  
      const dateMap = dateSentimentCounts.get(date)!;
  
      if (dateMap.has(emotion)) {
        const existingData = dateMap.get(emotion)!;
        existingData.count += 1;
        existingData.sentences.push(sentence);
      } else {
        dateMap.set(emotion, { count: 1, sentences: [sentence] });
      }
    });
  
    const dateSentimentCountsArray = Array.from(dateSentimentCounts).map(([date, sentiments]) => {
      const sentimentArray = Array.from(sentiments).map(([emotion, { count, sentences }]) => ({
        emotion,
        count,
        sentences,
      }));
      return { date, sentiments: sentimentArray };
    });
  
    dateSentimentCountsArray.forEach(({ date, sentiments }) => {
      const emotionData: { date: Date; pleasure: number; anxiety: number; sorrow: number; embarrassed: number; anger: number; hurt: number; sentences: string[] } = {
        date: new Date(date),
        pleasure: 0,
        anxiety: 0,
        sorrow: 0,
        embarrassed: 0,
        anger: 0,
        hurt: 0,
        sentences: [],
      };
  
      sentiments.forEach(({ emotion, count, sentences }) => {
        emotionData[emotion] = count;
        emotionData.sentences = emotionData.sentences.concat(sentences);
      });
  
      result.push(emotionData);
    });
  
    console.log(result)
    return { statistics: result };
  }

  public async storeAnalysis(id: string, teenMessage: string){
    const sentiments: Sentiments = await this.requestSentimentAnalysis(teenMessage);
    const prediction: Prediction = this.getMainEmotionWithIntegerAccuracy(sentiments);

    this.storeChildSentimentAnalysis(id, teenMessage, prediction.sentiment, prediction.accuracy, new Date())

  }

  private async requestSentimentAnalysis(childMessage): Promise<Sentiments> {
    return util.makeHttpRequest(config.URL_SENTIMENT_ANALYSIS_SERVER_ANALYZE, { 'Content-Type': 'application/json' }, { child: childMessage });
  }

  private getMainEmotionWithIntegerAccuracy(sentiments): Prediction{
    const emotionsAccuracyArr = [
      sentiments.pleasure, 
      sentiments.anxiety, 
      sentiments.sorrow, 
      sentiments.embarrassed, 
      sentiments.anger, 
      sentiments.hurt 
    ];

    let mainAccuracy = 0;
    let mainEmotion = 0;

    for (let emotion = 0; emotion < emotionsAccuracyArr.length; emotion++) {
      if (mainAccuracy < emotionsAccuracyArr[emotion]) {
        mainAccuracy = emotionsAccuracyArr[emotion];
        mainEmotion = emotion;
      }
    }
    mainAccuracy = Math.ceil(mainAccuracy * 100);
    
    return { accuracy: mainAccuracy, sentiment: mainEmotion };
  }

  private async storeChildSentimentAnalysis(id, sentence, sentiment, accuracy, date) {
    const childSentenceWithSentiment = this.sentimentStatisticsRepository.create({id, sentence, sentiment, accuracy, date});
    await this.sentimentStatisticsRepository.save(childSentenceWithSentiment);
  }
}