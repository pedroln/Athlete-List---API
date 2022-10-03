/// <reference types="node" />
import { Repository } from 'typeorm';
import DatabaseFiles from './database-files.entity';
export declare class DatabaseFilesService {
    private databaseFilesRepository;
    constructor(databaseFilesRepository: Repository<DatabaseFiles>);
    uploadDatabaseFile(dataBuffer: Buffer, filename: string): Promise<DatabaseFiles>;
    getFileById(fileId: number): Promise<DatabaseFiles>;
}
