import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { FeatureModule } from './feature';

@Module({
  imports: [CqrsModule, FeatureModule],
  controllers: [AppController]
})
export class AppModule {}
