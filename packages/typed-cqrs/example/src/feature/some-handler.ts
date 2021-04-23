import { QueryHandler, IInferringQueryHandler } from '@nestjs/cqrs';
import { SomeQuery } from './some-query';

@QueryHandler(SomeQuery)
export class SomeHandler implements IInferringQueryHandler<SomeQuery> {
  // try changing to :Promise<number> and return value of number -> error!
  async execute(query: SomeQuery): Promise<string> {
    return 'Hello';
  }
}
