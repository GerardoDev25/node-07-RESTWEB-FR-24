export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public completedAt?: Date | null
  ) {}

  public get isCompleted(): boolean {
    return !!this.completedAt;
  }
}
