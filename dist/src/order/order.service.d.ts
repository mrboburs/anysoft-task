import { Knex } from 'knex';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderTest } from './order-test';
export declare class OrderService {
    private readonly knex;
    private readonly orderTest;
    constructor(knex: Knex, orderTest: OrderTest);
    create(order: CreateOrderDto): Promise<CreateOrderDto>;
    findAll(): Promise<any[]>;
    findById(id: number): Promise<GetOrderDto>;
    update(id: number, order: UpdateOrderDto): Promise<UpdateOrderDto>;
    delete(id: number): Promise<void>;
}
