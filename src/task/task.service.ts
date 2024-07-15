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
        console.log(this.tasks);
    }

    delete(id: string) {
        let taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        this.tasks.splice(taskIndex, 1);
        console.log(this.tasks);
    }
}
