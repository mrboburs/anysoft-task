
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto, GetOrderDto, UpdateOrderDto } from './dto/order.dto';


@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<GetOrderDto> {
    console.log("id", id);
    return this.orderService.findById(id);
  }

  @Post()
  async create(@Body() order: CreateOrderDto): Promise<CreateOrderDto> {
    return this.orderService.create(order, );
  }

  @Put(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() order: UpdateOrderDto): Promise<UpdateOrderDto> {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this.orderService.delete(id);
  }
}
