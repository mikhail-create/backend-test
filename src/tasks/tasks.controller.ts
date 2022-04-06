import { Body, Controller, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/files/utils/file-upload';
import { CreateTaskDto, TaskDto } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Post('/new')
    createRecordbook(@Body() dto: CreateTaskDto) {
        return this.tasksService.createTaskList(dto)
    }

    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/taskFiles',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    @Put('/:_id')
    addTaskToList(@Body() dto: TaskDto, @Param('_id') _id: string, @UploadedFile() file: any) {
        const filePath = "http://localhost:5000/uploads/taskFiles/" + file.filename
        return this.tasksService.addTaskToList(dto, _id, filePath)
    }

    @Get('/group/:group')
    getTaskByGroup(@Param('group') group: string) {
        return this.tasksService.getTaskByGroup(group)
    }

    @Get('/id/:_id')
    getTaskById(@Param('_id') _id: string) {
        return this.tasksService.getTaskById(_id)
    }
}


