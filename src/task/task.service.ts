import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository, UpdateResult } from 'typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>
    ) { }

    async create(task: TaskDto): Promise<TaskDto> {
        const taskToSave: TaskEntity = {
            title: task.title,
            description: task.description,
            status: TaskStatusEnum.TO_DO,
            expirationDate: task.expirationDate,
        };

        const createdTask = await this.taskRepository.save(taskToSave);

        return this.mapEntityToDto(createdTask);
    }

    async findById(id: string): Promise<TaskDto> {
        const foundTask = await this.taskRepository.findOne({ where: { id } });
        if (!foundTask) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return this.mapEntityToDto(foundTask);
    }

    async findAll(params: { title: string, status: string }): Promise<TaskDto[]> {
        const searchParams: FindOptionsWhere<TaskEntity> = {};

        if (params.title) {
            searchParams.title = Like(`%${params.title}%`);
        }
        if (params.status) {
            searchParams.status = Like(`%${params.status}%`);
        }

        const tasksFound = await this.taskRepository.find({
            where: searchParams
        });

        return tasksFound.map(this.mapEntityToDto);
    }

    async update(id: string, task: TaskDto): Promise<TaskDto> {
        await this.findById(id);
        const updatedTask = await this.taskRepository.update(id, this.mapDtoToEntity(task));

        return await this.findById(id);
    }

    async delete(id: string) {
        const result = await this.taskRepository.delete(id);

        if (!result.affected) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
    }

    private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
        return {
            id: taskEntity.id,
            title: taskEntity.title,
            description: taskEntity.description,
            status: TaskStatusEnum[taskEntity.status],
            expirationDate: taskEntity.expirationDate,
        };
    }

    private mapDtoToEntity(taskDto: TaskDto): Partial<TaskEntity> {
        return {
            title: taskDto.title,
            description: taskDto.description,
            status: taskDto.status.toString(),
            expirationDate: taskDto.expirationDate,
        };
    }
}
