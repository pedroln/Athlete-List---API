import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Events } from './events.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseFilesModule } from 'src/database-files/database-files.module';

@Module({
  imports: [TypeOrmModule.forFeature([Events]), AuthModule, DatabaseFilesModule],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule { }
