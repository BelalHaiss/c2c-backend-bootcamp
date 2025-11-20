import { Controller, Get } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@Controller('rate-limit-test')
export class RateLimitTestController {
  @SkipThrottle({
    short: true,
    medium: true,
    long: true,
  })
  @Get('safe')
  findAll() {
    return 'This route is safe from rate limiting';
  }

  @Get('unsafe')
  findOne() {
    return 'This route is not safe from rate limiting';
  }
}
