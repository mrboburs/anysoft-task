// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex, KnexModule } from 'nestjs-knex';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/order.dto';
// import { InjectKnex } from '@nestjs/knex';

@Injectable()
export class OrderService {
  constructor(@InjectKnex() private readonly knex: Knex) { }

  async create(order: CreateOrderDto): Promise<CreateOrderDto> {
    const [createdOrder] = await this.knex('orders').insert(order).returning('id');
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
