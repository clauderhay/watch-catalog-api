import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { isNilOrEmpty } from 'src/common/lib';
import { Watch } from 'src/database/entities/watch.entity';
import { Repository } from 'typeorm';
import { DeleteWatchCommand } from '../implementation/delete-watch.command';

@CommandHandler(DeleteWatchCommand)
export class DeleteWatchCommandHandler
  implements ICommandHandler<DeleteWatchCommand, boolean>
{
  constructor(
    @InjectRepository(Watch)
    private readonly repo: Repository<Watch>,
  ) {}

  public async execute(command: DeleteWatchCommand): Promise<boolean> {
    const { id } = command;

    try {
      const watch = await this.repo.findOneBy({ id });
      if (isNilOrEmpty(watch)) {
        throw new NotFoundException(`Watch with ID ${id} not found`);
      }

      const result = await this.repo.delete(id);
      return result.affected > 0;
    } catch (error) {
      throw new NotFoundException(
        `Failed to delete watch with ID ${id}: ${error.message}`,
      );
    }
  }
}
