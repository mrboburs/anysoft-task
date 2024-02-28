import { Knex } from 'knex';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/order.dto';
export declare class OrderService {
    private readonly knex;
    constructor(knex: Knex);
    create(order: CreateOrderDto): Promise<CreateOrderDto>;
    findAll(): Promise<any[]>;
    findById(id: number): Promise<GetOrderDto>;
    update(id: number, order: UpdateOrderDto): Promise<UpdateOrderDto>;
    delete(id: number): Promise<void>;
}
