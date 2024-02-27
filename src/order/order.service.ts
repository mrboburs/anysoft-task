// src/user/user.service.ts
import { ConflictException, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex, KnexModule } from 'nestjs-knex';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/order.dto';
import { OrderTest } from './order-test';
// import { InjectKnex } from '@nestjs/knex';

@Injectable()
export class OrderService {
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private readonly orderTest: OrderTest
    ) { }

  async create(order: CreateOrderDto): Promise<CreateOrderDto> {
    const hasOrder = await this.orderTest.findOneOrder({ title: order.title });

    if (hasOrder) {
      throw new ConflictException("This order already created")
    }

    const [createdOrder] = await this.knex('orders').insert(order).returning('title');
    return createdOrder;
  }
  async findAll() {

    return this.knex('orders').select("*");
  }

  async findById(id: number): Promise<GetOrderDto> {
    let res = this.knex.select().from<GetOrderDto>('orders').where({ id }).first();
    return res
  }

  async update(id: number, order: UpdateOrderDto): Promise<UpdateOrderDto> {
    await this.knex('orders').where({ id }).update(order);
    return order;
  }

  async delete(id: number): Promise<void> {
    await this.knex('orders').where({ id }).del();
  }

  
}
