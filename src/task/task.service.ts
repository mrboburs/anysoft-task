
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import knex, { Knex } from 'knex';
import { InjectKnex, KnexModule } from 'nestjs-knex';
import { CreateTaskDto, GetTaskDto, StatusEnum, UpdateTaskDto } from './dto/task.dto';


@Injectable()
export class TaskService {
  constructor(@InjectKnex() private readonly knex: Knex) { }


  async getGroupedTasks(status:string,page: number , limit: number ): Promise<any>  {
    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;
    if ( page < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if ( limit < 1) {
      throw new BadRequestException('Invalid limit number');
    }

   // Query the database to retrieve tasks grouped by status
    const tasks = await this.knex('task')
    .select('*')
    .whereNull('deleted_at')
    .andWhere('status',status)
    
    ;

    return tasks;
    
  }


  async changeTaskStatus(id: number, task: UpdateTaskDto): Promise<any> {
    let res =await this.knex.select().from<GetTaskDto>('task')
    .whereNull('deleted_at')
    .where({ id }).first();
    if (!res) {
      throw new NotFoundException(' Task with the specified ID was not found')
    } 

   await this.knex('task').where({ id }).update(task);

    return await this.knex.select().from<GetTaskDto>('task')
    .where({ id },)
    .first();
  }
  async searchTasks(search: string, page: number , limit: number ): Promise<any> {
      // Validate the page and limit parameters
      if ( page < 1) {
        throw new BadRequestException('Invalid page number');
      }
  
      if ( limit < 1) {
        throw new BadRequestException('Invalid limit number');
      }
    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    // Query the database to perform the search
    const tasks = await this.knex('task')
      .where('title', 'ilike', `%${search}%`) // Adjust this to your search criteria
      // .orWhere('description', 'ilike', `%${query}%`) // Additional search criteria
      .offset(offset)
      .limit(limit)
      .select('*');

    return tasks;
  }

  async createTask(task: CreateTaskDto): Promise<any> {
    const title =task.title
    // Check if the task already exists
    const existingTask = await this.knex('task').where({ title }).first();
    if (existingTask) {
      // Task already exists, handle accordingly
      return { success: false, message: 'Task already exists' };
    }
    const createdTask = await this.knex('task').insert(task).returning('id');
    // const id =createdTask[0].id
    // task.order_id=id+1
    // await this.knex('task').where({ id}).update(task);
    return {success: true, message: 'Task created successfully'};
  }

  // get by id 
  async findById(id: number): Promise<any> {
   
    let task =await this.knex.select().from<GetTaskDto>('task')
    .where({ id },)
    .whereNull('deleted_at')
    .first();
    if (!task) {
      throw new NotFoundException(' Task with the specified ID was not found')
    } 
    return task
  }

  async updateTask(id: number, task: UpdateTaskDto): Promise<any> {
    let res =await this.knex.select().from<GetTaskDto>('task')
    .whereNull('deleted_at')
    .where({ id }).first();
    if (!res) {
      throw new NotFoundException(' Task with the specified ID was not found')
    } 
    await this.knex('task').where({ id }).update(task);
    return "successfully updated ";
  }

  async softDelete(id: number): Promise<void> {
    
    let task =await this.knex.select().from<GetTaskDto>('task').where({ id }).first();
    if (!task) {
      throw new NotFoundException(' Task with the specified ID was not found')
    } 
    await this.knex('task').where({ id })
    .update({ deleted_at: this.knex.fn.now() }); // Assuming 'deleted' is a boolean column

  }


  async hardDelete(id: number): Promise<void> {
    let task =await this.knex.select().from<GetTaskDto>('task').where({ id }).first();
    if (!task) {
      throw new NotFoundException(' Task with the specified ID was not found')
    } 
   await this.knex('task').where({ id }).del();
   
  }


  async getActiveList(page: number , limit: number ): Promise<any[]>  {
    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;
    if ( page < 1) {
      throw new BadRequestException('Invalid page number');
    }

    if ( limit < 1) {
      throw new BadRequestException('Invalid limit number');
    }

    // Query the database to retrieve a subset of records
    const tasks = await this.knex('task')
      .offset(offset)
      .limit(limit)
      .whereNull('deleted_at')
      .select('*');

    return tasks;
    
  }
  async getSoftDeletedList(page: number , limit: number ): Promise<any[]>  {
    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    // Query the database to retrieve a subset of records
    const tasks = await this.knex('task')
      .offset(offset)
      .limit(limit)
      .whereNotNull('deleted_at')
      .select('*');

    return tasks;
    
  }
}

