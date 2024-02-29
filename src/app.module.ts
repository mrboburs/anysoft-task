import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { SharedModule } from './shared/shared.module';


@Module({
  imports: [
    SharedModule,
    TaskModule,
   
  ],
})
export class AppModule {}