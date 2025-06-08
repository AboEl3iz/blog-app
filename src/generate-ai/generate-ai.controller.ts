import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerateAiService } from './generate-ai.service';
import {  CreateGenerateAiReplyDto } from './dto/create-generate-ai.dto';
import { UpdateGenerateAiDto } from './dto/update-generate-ai.dto';
import { CreateGenerateAiIdeasDto } from './dto/create-generate-ai-ideas';

@Controller('generate-ai')
export class GenerateAiController {
  constructor(private readonly generateAiService: GenerateAiService) {}

  @Post("generate-reply")
  AIgenerateReply(@Body() createGenerateAiDto: CreateGenerateAiReplyDto) {
    return this.generateAiService.generateReply(createGenerateAiDto);
  }

  @Post("generate-post-ideas")
  AIgeneratePostIdeas(@Body() createGenerateAiDto: CreateGenerateAiIdeasDto) {
    return this.generateAiService.generatePostIdeas(createGenerateAiDto);
  }

  @Post("generate-post")
  AIgeneratePost(@Body() createGenerateAiDto: CreateGenerateAiIdeasDto) {
    return this.generateAiService.generatePost(createGenerateAiDto);
  }

  
  
}
