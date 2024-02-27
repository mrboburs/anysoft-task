import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
export declare class IdValidationPipe implements PipeTransform<any> {
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
