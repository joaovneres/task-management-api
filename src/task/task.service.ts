import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto, TaskStatusEnum } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    create(task: TaskDto) {
        task.id = uuid();
        task.status = TaskStatusEnum.TO_DO;
        this.tasks.push(task);
    }

    findById(id: string): TaskDto {
        const foundTask = this.tasks.find(task => task.id === id);
        if (foundTask === undefined) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return foundTask;
    }

    findAll(params: { title: string, status: string }): TaskDto[] {
        return this.tasks.filter(task => {
            if (params.title != undefined && !task.title.includes(params.title)) {
                return false;
            }
            if (params.status != undefined && !task.status.includes(params.status)) {
                return false;
            }
            return true;
        });
    }

    update(task: TaskDto) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if (taskIndex === -1) {
            throw new NotFoundException(`Task with id ${task.id} not found`);
        }
        this.tasks[taskIndex] = task;
    }

    delete(id: string) {
        let taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        this.tasks.splice(taskIndex, 1);
    }
}
