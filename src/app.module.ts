import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WatchModule } from './watch/watch.module';
import { Watch } from './database/entities/watch.entity';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    TypeOrmModule.forFeature([Watch]),
    WatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
