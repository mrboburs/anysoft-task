import { IsNotEmpty, IsNumber, IsString, IsEnum } from "class-validator";

export enum TaskEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted',
  }

export class CreateTaskDto {
    @IsNotEmpty()
    @IsNumber()
    order_id:number;
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsEnum(TaskEnum)
    status: TaskEnum;
    estimate:number;
}

export class GetTaskDto {
    id:number;
    order_id:number;
    title: string;
    description: string;
    status: TaskEnum;
    estimate:number;
    created_at:Date;

}
export class UpdateTaskDto {  
    
    @IsNumber()
    order_id:number;
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsEnum(TaskEnum)
    status: TaskEnum;
    @IsNumber()
    estimate:number;
}