import { IsNotEmpty, IsNumber, IsString, IsEnum } from "class-validator";

export enum OrderEnum {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted',
  }

export class CreateOrderDto {
    @IsNotEmpty()
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsEnum(OrderEnum)
    status: OrderEnum;
    estimate:number;
}

export class GetOrderDto {
    id:number;
    title: string;
    description: string;
    status: OrderEnum;
    estimate:number;
    created_at:Date;

}
export class UpdateOrderDto {  
   
    @IsString()
    title: string;
    @IsString()
    description: string;
    @IsEnum(OrderEnum)
    status: OrderEnum;
    @IsNumber()
    estimate:number;
}