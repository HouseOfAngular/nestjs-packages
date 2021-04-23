import { CommandHandler, IInferredCommandHandler } from '@nestjs/cqrs';
import { SomeCommand } from './some-command';

@CommandHandler(SomeCommand)
export class SomeCommandHandler implements IInferredCommandHandler<SomeCommand> {
  async execute(command: SomeCommand): Promise<string> {
    return 'Command result';
  }
}
