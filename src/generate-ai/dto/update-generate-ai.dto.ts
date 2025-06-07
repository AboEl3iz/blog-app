import { PartialType } from '@nestjs/mapped-types';
import { CreateGenerateAiDto } from './create-generate-ai.dto';

export class UpdateGenerateAiDto extends PartialType(CreateGenerateAiDto) {}
