import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { TaskList } from './schemas/tasks-list.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(TaskList.name) private taskModel: Model<TaskList>) { }

    async createTaskList(dto: CreateTaskDto): Promise<TaskList> {
        const newTask = new this.taskModel(dto)
        return newTask.save()
    }

    async addTaskToList(dto: TaskDto, _id: string, filePath: string): Promise<TaskList> {
        dto.file = filePath
        const taskList = await this.taskModel.findOne({ _id: _id }).exec()
        taskList.tasks.push(dto)
        return taskList.save()
    }

    async getTaskByGroup(group: string): Promise<TaskList[]> {
        return this.taskModel.find({ groups: group }).exec()
    }

    async getTaskById(_id: string) {
        return this.taskModel.findOne({ _id: _id })
    }
}
