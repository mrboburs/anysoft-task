import { IsNotEmpty, IsNumber, IsString, IsEnum, } from "class-validator";
import { Timestamp } from "typeorm";

export class PaginationDto {
    // @IsNumber()
    // @Min(1)
    page: number = 1;
    // @IsNumber()
    // @Min(1)
    limit: number = 10;
  }
export enum StatusEnum {
 
    ToDo = 'todo',
    InProgress = 'in_progress',
    Test ='test',
    Done = 'done',
    Cancelled='cancelled'
  }

export class CreateTaskDto {
   
    @IsNumber()
    order_id:number;
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsEnum(StatusEnum)
    status: StatusEnum;
    @IsNotEmpty()
   @IsString()
    estimate:string;
}

export class GetTaskDto {
    id:number;
    order_id:number;
    title: string;
    description: string;
    status: StatusEnum;
    estimate:string;
    created_at:Date;

}
export class UpdateTaskDto {  
    order_id:number;
    title: string;
    description: string;
    status: StatusEnum;
    estimate:string;
}