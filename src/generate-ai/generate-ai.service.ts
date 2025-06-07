import { Injectable } from '@nestjs/common';
import { CreateGenerateAiDto } from './dto/create-generate-ai.dto';
import { UpdateGenerateAiDto } from './dto/update-generate-ai.dto';

@Injectable()
export class GenerateAiService {
  create(createGenerateAiDto: CreateGenerateAiDto) {
    return 'This action adds a new generateAi';
  }

  findAll() {
    return `This action returns all generateAi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generateAi`;
  }

  update(id: number, updateGenerateAiDto: UpdateGenerateAiDto) {
    return `This action updates a #${id} generateAi`;
  }

  remove(id: number) {
    return `This action removes a #${id} generateAi`;
  }
}
