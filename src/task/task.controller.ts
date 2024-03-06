
import { Controller, Get, Post, Put,BadRequestException, Patch, Delete, Param, Body, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, GetTaskDto, PaginationDto, StatusEnum, UpdateTaskDto } from './dto/task.dto';

@Controller('v1/tasks')
export class TaskController {
  constructor(private readonly TaskService: TaskService) {}

// change the task status
  @Patch('/change-status/:id')
  async changeTaskStatus(@Param('id',ParseIntPipe) id: number, @Body() task: UpdateTaskDto): Promise<any> {
    return this.TaskService.changeTaskStatus(id, task);
  }

  // searching endpoint by title field
  @Get('/search')
  async searchTasks(
    @Query('search') search: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
  

    // Call the service method to perform the search and retrieve paginated results
    const searchResults = await this.TaskService.searchTasks(search, page, limit);

    return searchResults;
  }


// get soft-deteleted list of tasks
@Get('/soft-deleted-list')
async getSoftDeletedList( @Query(ValidationPipe) paginationDto: PaginationDto) {
  return this.TaskService.getSoftDeletedList(paginationDto.page,paginationDto.limit);
}

// get grouped tasks
@Get('/grouped')
  async getGroupedTasks( 
    @Query('status') status: string ,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.TaskService.getGroupedTasks(status,page,limit);
  }

// get active list of tasks
  @Get()
  async getActiveList( @Query(ValidationPipe) paginationDto: PaginationDto) {
    return this.TaskService.getActiveList(paginationDto.page,paginationDto.limit);
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    
    return this.TaskService.findById(id);
  }
// Create tasks
  @Post()
  async createTask(@Body() Task: CreateTaskDto): Promise<any> {
    return this.TaskService.createTask(Task, );
  }

  @Put(':id')
  async updateTask(@Param('id',ParseIntPipe) id: number, @Body() Task: UpdateTaskDto): Promise<any> {
    return this.TaskService.updateTask(id, Task);
  }
  @Patch(':id')
  async softDelete(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this.TaskService.softDelete(id);
  }
  @Delete(':id')
  async hardDelete(@Param('id',ParseIntPipe) id: number): Promise<void> {
    return this.TaskService.hardDelete(id);
  }
}

