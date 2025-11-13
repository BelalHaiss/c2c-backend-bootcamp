import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private schema: ZodType<T>) {}

  transform(value: T, metadata: ArgumentMetadata) {
    console.log(metadata, 'metadata');
    const parsedValue = this.schema.parse(value);
    console.log(parsedValue, 'parsedValue');
    return parsedValue;
  }
}
