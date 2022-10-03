import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import DatabaseFiles from './database-files.entity';
import { DatabaseFilesService } from './database-files.service';


@Module({
  imports: [TypeOrmModule.forFeature([DatabaseFiles])],
  providers: [DatabaseFilesService],
  exports: [DatabaseFilesService],
})
export class DatabaseFilesModule { }