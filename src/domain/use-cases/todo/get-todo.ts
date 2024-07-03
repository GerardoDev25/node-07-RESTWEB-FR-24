import { TodoEntity } from '../../entities';
import { TodoRepository } from '../../repositories';

export interface GetTodoByIdUseCase {
  execute: (id: number) => Promise<TodoEntity>;
}

export class GetTodoById implements GetTodoByIdUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(id: number): Promise<TodoEntity> {
    return this.repository.findById(id);
  }
}
