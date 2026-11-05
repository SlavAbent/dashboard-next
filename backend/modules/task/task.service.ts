import { notFound } from '../../shared/errors/app-error.ts';
import { TaskRepository } from './task.repository.ts';
import type {
  CreateTaskInput,
  MoveTaskInput,
  UpdateTaskInput,
} from './task.types.ts';

type TaskRepositoryContract = Pick<
  TaskRepository,
  'create' | 'update' | 'move' | 'delete'
>;

export class TaskService {
  private readonly repository: TaskRepositoryContract;

  constructor(repository: TaskRepositoryContract = new TaskRepository()) {
    this.repository = repository;
  }

  async createTask(userId: string, input: CreateTaskInput) {
    const task = await this.repository.create(userId, input);
    if (!task) throw notFound('Folder');
    return task;
  }

  async updateTask(userId: string, id: string, input: UpdateTaskInput) {
    const task = await this.repository.update(userId, id, input);
    if (!task) throw notFound('Task');
    return task;
  }

  async moveTask(userId: string, id: string, input: MoveTaskInput) {
    const task = await this.repository.move(userId, id, input);
    if (!task) throw notFound('Task');
    return task;
  }

  async deleteTask(userId: string, id: string) {
    if (!(await this.repository.delete(userId, id))) throw notFound('Task');
  }
}
