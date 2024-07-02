export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    public readonly text?: string,
    public readonly completedAt?: Date
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    if (this.text) {
      returnObj.text = this.text;
    }
    if (this.completedAt) {
      returnObj.completedAt = this.completedAt;
    }

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateTodoDto?] {
    const { id, text, completedAt } = props;

    let newCompletedAt = completedAt;

    if (!id || isNaN(Number(id))) {
      return ['Id must be a number', undefined];
    }

    if (completedAt) {
      newCompletedAt = new Date(completedAt);
      if (newCompletedAt.toString() === 'Invalid Date')
        return ['completedAt most be a valid date', undefined];
    }
    if (text) {
      if (typeof text !== 'string')
        return ['text property must be a string', undefined];
    }

    return [undefined, new UpdateTodoDto(id, text, completedAt)];
  }
}
