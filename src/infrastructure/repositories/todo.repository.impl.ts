import {
  CreateTodoDto,
  TodoEntity,
  UpdateTodoDto,
  TodoDatasource,
  TodoRepository,
} from '../../domain';
export class TodoRepositoryImpl extends TodoRepository {
  constructor(private readonly todoDatasource: TodoDatasource) {
    super();
  }
  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.todoDatasource.getAll();
  }
  findById(id: number): Promise<TodoEntity> {
    return this.todoDatasource.findById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.todoDatasource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.todoDatasource.deleteById(id);
  }
}
