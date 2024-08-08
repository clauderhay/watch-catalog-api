import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Watch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Column({ type: 'varchar', length: 255 })
  brand?: string;

  @Column({ type: 'varchar', length: 255 })
  referenceNumber?: string;
}
