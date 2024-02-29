
import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from './dto/task.dto';


@Controller('tasks')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

  @Get()
  async findAll() {
    return this.TaskService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<GetTaskDto> {
    console.log("id", id);
    return this.TaskService.findById(id);
  }

  @Post()
  async create(@Body() Task: CreateTaskDto): Promise<CreateTaskDto> {
    return this.TaskService.create(Task, );
  }

  @Put(':id')
  async update(@Param('id',ParseIntPipe) id: number, @Body() Task: UpdateTaskDto): Promise<UpdateTaskDto> {
    return this.TaskService.update(id, Task);
  }

  @Delete(':id')
  async delete(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this.TaskService.delete(id);
  }
}
