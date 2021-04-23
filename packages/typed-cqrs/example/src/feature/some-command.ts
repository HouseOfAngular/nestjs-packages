import { Command } from '@nestjs-architects/typed-cqrs';

export class SomeCommand extends Command<string> {}
