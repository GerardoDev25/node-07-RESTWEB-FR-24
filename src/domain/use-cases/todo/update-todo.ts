import { TodoEntity } from '../../entities';
import { UpdateTodoDto } from '../../dtos';
import { TodoRepository } from '../../repositories';

export interface UpdateTodoUseCase {
  execute: (dto: UpdateTodoDto) => Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUseCase {
  constructor(private readonly repository: TodoRepository) {}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  }
}
