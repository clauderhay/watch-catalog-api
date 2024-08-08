import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Watch } from 'src/database/entities/watch.entity';
import { CreateWatchCommandHandler } from './commands/handlers/create-watch.handler';
import { DeleteWatchCommandHandler } from './commands/handlers/delete-watch.handler';
import { UpdateWatchCommandHandler } from './commands/handlers/update-watch.handler';
import { GetWatchQueryHandler } from './queries/handlers/get-watch.handler';
import { GetWatchesQueryHandler } from './queries/handlers/get-watches.handler';
import { WatchService } from './watch.service';
import { WatchController } from './watch.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Watch]), CqrsModule],
  controllers: [WatchController],
  providers: [
    WatchService,
    CreateWatchCommandHandler,
    UpdateWatchCommandHandler,
    DeleteWatchCommandHandler,
    GetWatchesQueryHandler,
    GetWatchQueryHandler,
  ],
})
export class WatchModule {}
