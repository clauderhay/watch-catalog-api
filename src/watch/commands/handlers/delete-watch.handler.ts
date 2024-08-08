import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { isNilOrEmpty } from 'src/common/lib';
import { Watch } from 'src/database/entities/watch.entity';
import { Repository } from 'typeorm';
import { DeleteWatchCommand } from '../implementation/delete-watch.command';

@CommandHandler(DeleteWatchCommand)
export class DeleteWatchCommandHandler
  implements ICommandHandler<DeleteWatchCommand, void>
{
  constructor(
    @InjectRepository(Watch)
    private readonly repo: Repository<Watch>,
  ) {}

  public async execute(command: DeleteWatchCommand): Promise<void> {
    const { id } = command;
    const watch = await this.repo.findOne({ where: { id } });
    if (isNilOrEmpty(watch)) {
      throw new NotFoundException(`Watch with ID ${id} not found`);
    }
    await this.repo.delete(id);
  }
}
