import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouterParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

  constructor(private readonly taskService: TaskService) { }

  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return this.taskService.create(task);
  }

  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return this.taskService.findById(id);
  }

  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return this.taskService.findAll(params);
  }

  @Put('/:id')
  async update(@Param() params: TaskRouterParameters, @Body() task: TaskDto): Promise<TaskDto> {
    return this.taskService.update(params.id, task);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

}
