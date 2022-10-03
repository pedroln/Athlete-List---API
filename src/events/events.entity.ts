import { ApiProperty } from '@nestjs/swagger';
import DatabaseFiles from 'src/database-files/database-files.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Events {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'timestamptz' })
  eventDate: Date;

  @Column({ unique: true, nullable: false, type: 'varchar', length: 200 })
  eventName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  eventResponsible: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  eventCity: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  eventState: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  eventAddress: string;

  @Column({ nullable: true, type: 'varchar', length: 200 })
  eventAddressComplement: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  eventEmail: string;

  @Column({ nullable: false, type: 'integer' })
  eventPhone: number;

  @JoinColumn({ name: 'eventImageId' })
  @OneToOne(
    () => DatabaseFiles,
    {
      nullable: true
    }
  )
  
  @Column({ nullable: true })
  public eventImageId?: number;


}