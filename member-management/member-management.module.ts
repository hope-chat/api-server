import { Module } from '@nestjs/common';
import { MemberManagementController } from './member-management.controller';
import { MemberManagementService } from './member-management.service';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [MemberModule],
  controllers: [MemberManagementController],
  providers: [MemberManagementService]
})
export class MemberManagementModule {}