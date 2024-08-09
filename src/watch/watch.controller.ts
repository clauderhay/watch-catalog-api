import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  NotFoundException,
  InternalServerErrorException,
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
import { PageableFilter } from './models/pageable-filter.model';
import { PaginatedResult } from './models/paginated-result.model';
import { UpdateWatch } from './models/update-watch.response';
import { WatchService } from './watch.service';

@ApiTags('Watch')
@Controller('watch')
export class WatchController {
  constructor(private readonly watchService: WatchService) {}

  @Get('search')
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
    @Query() pageableFilter: PageableFilter,
  ): Promise<PaginatedResult<Watch>> {
    try {
      return await this.watchService.getWatches(pageableFilter);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch watches');
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a watch by ID' })
  @ApiResponse({ status: 200, description: 'Return the watch.' })
  @ApiResponse({ status: 404, description: 'Watch not found.' })
  async findOne(@Param('id') id: number): Promise<Watch> {
    const watch = await this.watchService.getWatchById(id);
    if (!watch) {
      throw new NotFoundException('Watch not found');
    }
    return watch;
  }

  @Post('create')
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
    try {
      const watch = await this.watchService.createWatch(createWatchDto);
      return {
        status: 'OK',
        message: 'The watch has been successfully created.',
        data: watch,
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to create watch');
    }
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a watch by ID' })
  @ApiBody({
    description: 'Update an existing watch',
    schema: {
      example: {
        name: 'Casio Sports',
        brand: 'Casio',
        referenceNumber: 'REF00X1',
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The watch has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Watch not found.' })
  async update(
    @Param('id') id: number,
    @Body() updateWatchDto: UpdateWatch,
  ): Promise<{ status: string; message: string; data: Watch }> {
    const updatedWatch = await this.watchService.updateWatch(
      id,
      updateWatchDto,
    );
    if (!updatedWatch) {
      throw new NotFoundException('Watch not found');
    }
    return {
      status: 'OK',
      message: 'The watch has been successfully updated.',
      data: updatedWatch,
    };
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a watch by ID' })
  @ApiResponse({
    status: 200,
    description: 'The watch has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Watch not found.' })
  async remove(
    @Param('id') id: number,
  ): Promise<{ status: string; message: string }> {
    const isDeleted = await this.watchService.deleteWatch(id);
    if (!isDeleted) {
      throw new NotFoundException('Watch not found');
    }
    return {
      status: 'OK',
      message: 'The watch has been successfully deleted.',
    };
  }
}
