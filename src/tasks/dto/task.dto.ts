export class CreateTaskDto {
    readonly name: string
    readonly groups: string[]
    readonly tasks: TaskDto[]
}

export class TaskDto {
    readonly description: string
    file: string
    readonly date: Date
    readonly author: string
}