import { CommandHandler, IInferringCommandHandler } from '@nestjs/cqrs';
import { SomeCommand } from './some-command';

@CommandHandler(SomeCommand)
export class SomeCommandHandler
  implements IInferringCommandHandler<SomeCommand> {
  async execute(command: SomeCommand): Promise<string> {
    return 'Command result';
  }
}
