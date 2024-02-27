import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderTest } from './order-test';

@Module({
    controllers: [OrderController],
    providers: [OrderService, OrderTest],
    exports: [OrderService]
})
export class OrderModule {
}


