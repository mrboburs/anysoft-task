
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectKnex, KnexModule } from 'nestjs-knex';
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from './dto/task.dto';


@Injectable()
export class TaskService {
  constructor(@InjectKnex() private readonly knex: Knex) { }

  async create(task: CreateTaskDto): Promise<CreateTaskDto> {
    const [createdTask] = await this.knex('tasks').insert(task).returning('id');
    return createdTask;
  }

  async findAll() {

    return this.knex('tasks').select("*");
  }

  async findById(id: number): Promise<GetTaskDto> {
    let res = this.knex.select().from<GetTaskDto>('tasks').where({ id }).first();
    return res
  }

  async update(id: number, task: UpdateTaskDto): Promise<UpdateTaskDto> {
    await this.knex('tasks').where({ id }).update(task);
    return task;
  }

  async delete(id: number): Promise<void> {
    await this.knex('tasks').where({ id }).del();
  }
}
