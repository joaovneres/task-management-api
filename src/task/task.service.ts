import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {

    private tasks: TaskDto[] = [];

    create(task: TaskDto) {
        this.tasks.push(task);
        console.log(this.tasks)
    }

    findById(id: string): TaskDto {
        const foundTask = this.tasks.find(task => task.id === id);
        if(foundTask === undefined) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return foundTask;
    }

    update(task: TaskDto) {
        let taskIndex = this.tasks.findIndex(t => t.id === task.id);
        if(taskIndex === -1) {
            throw new NotFoundException(`Task with id ${task.id} not found`);
        }
        this.tasks[taskIndex] = task;
        console.log(this.tasks);
    }

    delete(id: string) {
        let taskIndex = this.tasks.findIndex(t => t.id === id);
        if(taskIndex === -1) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        this.tasks.splice(taskIndex, 1);
        console.log(this.tasks);
    }
}