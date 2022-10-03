import { Module } from '@nestjs/common';

import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { DatabaseFilesModule } from './database-files/database-files.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, EventsModule, DatabaseFilesModule],
})
export class AppModule {}
