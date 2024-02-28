import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { SharedModule } from './shared/shared.module';


@Module({
  imports: [
    SharedModule,
    OrderModule,
   
  ],
})
export class AppModule {}