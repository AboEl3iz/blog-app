import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerateAiService } from './generate-ai.service';
import {  CreateGenerateAiReplyDto } from './dto/create-generate-ai.dto';
import { UpdateGenerateAiDto } from './dto/update-generate-ai.dto';
import { CreateGenerateAiIdeasDto } from './dto/create-generate-ai-ideas';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('generate-ai')
export class GenerateAiController {
  constructor(private readonly generateAiService: GenerateAiService) {}

  @Post("generate-reply")
  @ApiOperation({ summary: 'Generate a reply to a comment' })
  @ApiResponse({ status: 201, description: 'The generated reply' })
  AIgenerateReply(@Body() createGenerateAiDto: CreateGenerateAiReplyDto) {
    return this.generateAiService.generateReply(createGenerateAiDto);
  }

  @Post("generate-post-ideas")
  @ApiOperation({ summary: 'Generate post ideas based on a topic' })
  @ApiResponse({ status: 201, description: 'The generated post ideas' })
  AIgeneratePostIdeas(@Body() createGenerateAiDto: CreateGenerateAiIdeasDto) {
    return this.generateAiService.generatePostIdeas(createGenerateAiDto);
  }

  @Post("generate-post")
  @ApiOperation({ summary: 'Generate a post based on a topic' })
  @ApiResponse({ status: 201, description: 'The generated post' })
  AIgeneratePost(@Body() createGenerateAiDto: CreateGenerateAiIdeasDto) {
    return this.generateAiService.generatePost(createGenerateAiDto);
  }

  
  
}

