import { Module } from '@nestjs/common';
import { GenerateAiService } from './generate-ai.service';
import { GenerateAiController } from './generate-ai.controller';

@Module({
  controllers: [GenerateAiController],
  providers: [GenerateAiService],
})
export class GenerateAiModule {}
