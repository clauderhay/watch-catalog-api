import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { Watch } from 'src/database/entities/watch.entity';
import { CreateWatch } from './models/create-watch.response';
import { PaginatedResult } from './models/paginated-result.model';
import { UpdateWatch } from './models/update-watch.response';
import { GetWatchesQuery } from './queries/implementation/get-watches.query';
import { WatchService } from './watch.service';

@ApiTags('watches')
@Controller('watches')
export class WatchController {
  constructor(private readonly watchService: WatchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new watch' })
  @ApiBody({
    description: 'Create a new watch',
    schema: {
      example: {
        name: 'Rolex01',
        brand: 'Rolex',
        referenceNumber: 'REF001',
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The watch has been successfully created.',
  })
  async create(@Body() createWatchDto: CreateWatch) {
    return this.watchService.createWatch(createWatchDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a list of all watches or search by name or reference number',
  })
  @ApiResponse({ status: 200, description: 'Return all watches.' })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'The name of the watch to search for.',
  })
  @ApiQuery({
    name: 'referenceNumber',
    required: false,
    type: String,
    description: 'The reference number of the watch to search for.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'The page number for pagination.',
    example: 1,
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
    type: Number,
    description: 'The number of items per page for pagination.',
    example: 10,
  })
  async findAll(
    @Query('name') name?: string,
    @Query('referenceNumber') referenceNumber?: string,
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<PaginatedResult<Watch>> {
    const getWatchesQuery = new GetWatchesQuery(
      name,
      referenceNumber,
      page,
      perPage,
    );
    return this.watchService.getWatches(getWatchesQuery);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a watch by ID' })
  @ApiResponse({ status: 200, description: 'Return the watch.' })
  @ApiResponse({ status: 404, description: 'Watch not found.' })
  async findOne(@Param('id') id: string): Promise<Watch> {
    return this.watchService.getWatchById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a watch by ID' })
  @ApiResponse({
    status: 200,
    description: 'The watch has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Watch not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateWatchDto: UpdateWatch,
  ): Promise<Watch> {
    return this.watchService.updateWatch(id, updateWatchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a watch by ID' })
  @ApiResponse({
    status: 200,
    description: 'The watch has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Watch not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.watchService.deleteWatch(id);
  }
}
