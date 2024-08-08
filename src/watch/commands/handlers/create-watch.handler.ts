import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Watch } from 'src/database/entities/watch.entity';
import { Repository } from 'typeorm';
import { CreateWatchCommand } from '../implementation/create-watch.command';

@CommandHandler(CreateWatchCommand)
export class CreateWatchCommandHandler
  implements ICommandHandler<CreateWatchCommand, Watch>
{
  constructor(
    @InjectRepository(Watch)
    private readonly repo: Repository<Watch>,
  ) {}

  public async execute(command: CreateWatchCommand): Promise<Watch> {
    const { name, brand, referenceNumber } = command;
    const watch = this.repo.create({ name, brand, referenceNumber });

    return this.repo.save(watch);
  }
}
