import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Watch } from 'src/database/entities/watch.entity';
import { Repository } from 'typeorm';
import { GetWatchesQuery } from '../implementation/get-watches.query';
import { PaginatedResult } from 'src/watch/models/paginated-result.model';
@QueryHandler(GetWatchesQuery)
export class GetWatchesQueryHandler implements IQueryHandler<GetWatchesQuery> {
  constructor(
    @InjectRepository(Watch) private readonly repo: Repository<Watch>,
  ) {}

  public async execute(
    query: GetWatchesQuery,
  ): Promise<PaginatedResult<Watch>> {
    const { name, referenceNumber, page = 1, perPage = 10 } = query;

    const qb = this.repo.createQueryBuilder('watch');

    if (name) {
      qb.andWhere('watch.name LIKE :name', { name: `%${name}%` });
    }

    if (referenceNumber) {
      qb.andWhere('watch.referenceNumber LIKE :referenceNumber', {
        referenceNumber: `%${referenceNumber}%`,
      });
    }

    const [items, total] = await qb
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { items, total, page, perPage };
  }
}
