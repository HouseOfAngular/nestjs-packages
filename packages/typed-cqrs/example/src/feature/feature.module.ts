import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SomeCommandHandler } from './some-command-handler';
import { SomeHandler } from './some-handler';

@Module({
  imports: [CqrsModule],
  providers: [SomeHandler, SomeCommandHandler]
})
export class FeatureModule {}
