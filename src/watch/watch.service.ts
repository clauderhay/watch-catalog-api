import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Watch } from 'src/database/entities/watch.entity';
import { CreateWatchCommand } from './commands/implementation/create-watch.command';
import { DeleteWatchCommand } from './commands/implementation/delete-watch.command';
import { UpdateWatchCommand } from './commands/implementation/update-watch.command';
import { CreateWatch } from './models/create-watch.response';
import { PageableFilter } from './models/pageable-filter.model';
import { PaginatedResult } from './models/paginated-result.model';
import { UpdateWatch } from './models/update-watch.response';
import { GetWatchQuery } from './queries/implementation/get-watch.query';
import { GetWatchesQuery } from './queries/implementation/get-watches.query';

@Injectable()
export class WatchService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createWatch(createWatchResponse: CreateWatch): Promise<Watch> {
    const { name, brand, referenceNumber } = createWatchResponse;
    return this.commandBus.execute(
      new CreateWatchCommand(name, brand, referenceNumber),
    );
  }

  async getWatches(
    pageableFilter: PageableFilter,
  ): Promise<PaginatedResult<Watch>> {
    const { page, perPage, name, referenceNumber } = pageableFilter;

    return this.queryBus.execute(
      new GetWatchesQuery(name, referenceNumber, page, perPage),
    );
  }

  async getWatchById(id: number): Promise<Watch> {
    return this.queryBus.execute(new GetWatchQuery(id));
  }

  async updateWatch(id: number, updateWatch: UpdateWatch): Promise<Watch> {
    const { name, brand, referenceNumber } = updateWatch;
    return this.commandBus.execute(
      new UpdateWatchCommand(id, name, brand, referenceNumber),
    );
  }

  async deleteWatch(id: number): Promise<boolean> {
    return this.commandBus.execute(new DeleteWatchCommand(id));
  }
}
