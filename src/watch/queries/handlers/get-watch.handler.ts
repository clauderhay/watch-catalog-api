import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Watch } from 'src/database/entities/watch.entity';
import { Repository } from 'typeorm';
import { GetWatchQuery } from '../implementation/get-watch.query';
import { isNilOrEmpty } from 'src/common/lib';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetWatchQuery)
export class GetWatchQueryHandler
  implements IQueryHandler<GetWatchQuery, Watch>
{
  constructor(@InjectRepository(Watch) private repo: Repository<Watch>) {}

  public async execute(query: GetWatchQuery): Promise<Watch> {
    const { id } = query;
    const watch = await this.repo.findOneBy({ id: id });
    if (isNilOrEmpty(watch)) {
      throw new NotFoundException(`Watch with ID ${id} not found`);
    }
    return watch;
  }
}
