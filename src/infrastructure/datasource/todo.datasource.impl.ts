import { prisma } from '../../data/postgres';
import {
  TodoDatasource,
  CreateTodoDto,
  TodoEntity,
  UpdateTodoDto,
} from '../../domain';
import { CustomError } from '../../domain/error';
export class TodoDatasourceImpl extends TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const newTodo = await prisma.todo.create({ data: createTodoDto! });
    return TodoEntity.fromObject(newTodo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todosObject = await prisma.todo.findMany();
    const todosEntity = todosObject.map(TodoEntity.fromObject);
    return todosEntity;
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({ where: { id } });

    if (!todo) {
      throw new CustomError(`todo with id: ${id} not found`, 404);
    }

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const { id } = updateTodoDto;

    await this.findById(id);

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);

    const deletedTodo = await prisma.todo.delete({ where: { id } });
    return TodoEntity.fromObject(deletedTodo);
  }
}
