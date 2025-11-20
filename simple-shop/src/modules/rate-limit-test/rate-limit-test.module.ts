import { Module } from '@nestjs/common';
import { RateLimitTestController } from './rate-limit-test.controller';

@Module({
  controllers: [RateLimitTestController],
})
export class RateLimitTestModule {}
