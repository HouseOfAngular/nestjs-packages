import { ICommand } from '@nestjs/cqrs';

export class Command<T> implements ICommand {
  resultType$e1ca39fa!: T;
}
