import { Module } from '@nestjs/common';
import { AnalysisSentimentService } from './analysis-sentiment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentimentStatistics } from './entity/sentiment-statistics';

@Module({
  imports: [TypeOrmModule.forFeature([SentimentStatistics])],
  providers: [AnalysisSentimentService],
  exports: [AnalysisSentimentService]
})
export class AnalysisSentimentModule {}