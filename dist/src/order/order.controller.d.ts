import { OrderService } from './order.service';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    findAll(): Promise<any[]>;
    findById(id: number): Promise<GetOrderDto>;
    create(order: CreateOrderDto): Promise<CreateOrderDto>;
    update(id: number, order: UpdateOrderDto): Promise<UpdateOrderDto>;
    delete(id: number): Promise<void>;
}
