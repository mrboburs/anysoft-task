// id-validation.pipe.ts
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class IdValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            if (!value) {
                throw new BadRequestException(`Parameter ${metadata.data} must be provided`);
            }

            const id = plainToClass(IdDto, { id: value });
            
            const errors = await validate(id);
            console.log(errors, 'err');
            
            if (errors.length  === 0) {
                throw new BadRequestException(`Invalid ${metadata.data}`);
            }

            return value;
        } catch (error: any) {
            return error.message
        }
    }
}

class IdDto {
    id: string;
}
