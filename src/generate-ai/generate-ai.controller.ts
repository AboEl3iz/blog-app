import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GenerateAiService } from './generate-ai.service';
import { CreateGenerateAiDto } from './dto/create-generate-ai.dto';
import { UpdateGenerateAiDto } from './dto/update-generate-ai.dto';

@Controller('generate-ai')
export class GenerateAiController {
  constructor(private readonly generateAiService: GenerateAiService) {}

  @Post()
  create(@Body() createGenerateAiDto: CreateGenerateAiDto) {
    return this.generateAiService.create(createGenerateAiDto);
  }

  @Get()
  findAll() {
    return this.generateAiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generateAiService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGenerateAiDto: UpdateGenerateAiDto) {
    return this.generateAiService.update(+id, updateGenerateAiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generateAiService.remove(+id);
  }
}
