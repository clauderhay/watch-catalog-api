import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { isNilOrEmpty } from 'src/common/lib';
import { Watch } from 'src/database/entities/watch.entity';
import { Repository } from 'typeorm';
import { UpdateWatchCommand } from '../implementation/update-watch.command';

@CommandHandler(UpdateWatchCommand)
export class UpdateWatchCommandHandler
  implements ICommandHandler<UpdateWatchCommand, Watch>
{
  constructor(
    @InjectRepository(Watch)
    private readonly repo: Repository<Watch>,
  ) {}

  public async execute(command: UpdateWatchCommand): Promise<Watch> {
    const { id, name, brand, referenceNumber } = command;
    const watch = await this.repo.findOne({ where: { id } });
    if (isNilOrEmpty(watch)) {
      throw new NotFoundException(`Watch with ID ${id} not found`);
    }

    if (name !== undefined) watch.name = name;
    if (brand !== undefined) watch.brand = brand;
    if (referenceNumber !== undefined) watch.referenceNumber = referenceNumber;

    return this.repo.save(watch);
  }
}
