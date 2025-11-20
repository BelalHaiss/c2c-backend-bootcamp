import { PartialType } from '@nestjs/mapped-types';
import { CreateRateLimitTestDto } from './create-rate-limit-test.dto';

export class UpdateRateLimitTestDto extends PartialType(CreateRateLimitTestDto) {}
