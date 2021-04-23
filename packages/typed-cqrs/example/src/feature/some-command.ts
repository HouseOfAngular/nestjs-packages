import { Command } from 'nestjs-typed-cqrs';

export class SomeCommand extends Command<string> {}
