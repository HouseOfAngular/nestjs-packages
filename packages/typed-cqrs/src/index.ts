import { Query } from './query';
import { ICommandHandler, IQueryHandler } from '@nestjs/cqrs';

export { Command } from './command';
export { Query } from './query';

import * as cqrs from '@nestjs/cqrs';
import { Command } from './command';

declare module '@nestjs/cqrs' {
  export interface QueryBus {
    execute<X>(query: Query<X>): Promise<X>;
  }

  export type IInferredQueryHandler<QueryType extends Query<unknown>> = QueryType extends Query<
    infer ResultType
  >
    ? IQueryHandler<QueryType, ResultType>
    : never;

  export interface CommandBus {
    execute<X>(command: Command<X>): Promise<X>;
  }

  export type IInferredCommandHandler<
    CommandType extends Command<unknown>
  > = CommandType extends Command<infer ResultType>
    ? ICommandHandler<CommandType, ResultType>
    : never;
}

export * from '@nestjs/cqrs';
