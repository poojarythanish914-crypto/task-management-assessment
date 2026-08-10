import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task, TaskDocument } from "./schemas/task.schema";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>) {}

  async findAll(userId: string) {
    return this.taskModel.find({ userId: new Types.ObjectId(userId) }).sort({ createdAt: -1 }).lean();
  }

  async findOne(id: string, userId: string) {
    const task = await this.taskModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
    }).lean();

    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async create(dto: CreateTaskDto, userId: string) {
    return this.taskModel.create({
      ...dto,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      userId: new Types.ObjectId(userId),
    });
  }

  async update(id: string, dto: UpdateTaskDto, userId: string) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, userId: new Types.ObjectId(userId) },
      {
        ...dto,
        ...(dto.dueDate !== undefined ? { dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined } : {}),
      },
      { new: true, runValidators: true },
    ).lean();

    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async remove(id: string, userId: string) {
    const result = await this.taskModel.deleteOne({
      _id: id,
      userId: new Types.ObjectId(userId),
    });

    if (!result.deletedCount) throw new NotFoundException("Task not found");
    return { message: "Task deleted successfully" };
  }
}
