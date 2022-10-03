import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import DatabaseFiles from './database-files.entity';

@Injectable()
export class DatabaseFilesService {
    constructor(
        @InjectRepository(DatabaseFiles)
        private databaseFilesRepository: Repository<DatabaseFiles>,
      ) {}
     
      async uploadDatabaseFile(dataBuffer: Buffer, filename: string) {
        const newFile = await this.databaseFilesRepository.create({
          filename,
          data: dataBuffer
        })
        await this.databaseFilesRepository.save(newFile);
        return newFile;
      }
     
      async getFileById(fileId: number) {
        const file = await this.databaseFilesRepository.findOne(fileId);
        if (!file) {
          throw new NotFoundException();
        }
        return file;
      }


}
