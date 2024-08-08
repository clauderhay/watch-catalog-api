import { Test, TestingModule } from '@nestjs/testing';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';
import { Watch } from 'src/database/entities/watch.entity';
import { GetWatchesQuery } from './queries/implementation/get-watches.query';
import { CreateWatch } from './models/create-watch.response';
import { PaginatedResult } from './models/paginated-result.model';
import { UpdateWatch } from './models/update-watch.response';
import { CqrsModule } from '@nestjs/cqrs';

describe('WatchController', () => {
  let watchController: WatchController;
  let watchService: WatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [WatchController],
      providers: [
        {
          provide: WatchService,
          useValue: {
            createWatch: jest.fn(),
            getWatches: jest.fn(),
            getWatchById: jest.fn(),
            updateWatch: jest.fn(),
            deleteWatch: jest.fn(),
          },
        },
      ],
    }).compile();

    watchController = module.get<WatchController>(WatchController);
    watchService = module.get<WatchService>(WatchService);
  });

  it('should be defined', () => {
    expect(watchController).toBeDefined();
  });

  describe('create', () => {
    it('should create a new watch', async () => {
      const createWatchDto: CreateWatch = {
        name: 'Rolex01',
        brand: 'Rolex',
        referenceNumber: 'REF001',
      };
      const result: Watch = { id: '1', ...createWatchDto };
      jest.spyOn(watchService, 'createWatch').mockResolvedValue(result);

      expect(await watchController.create(createWatchDto)).toBe(result);
      expect(watchService.createWatch).toHaveBeenCalledWith(createWatchDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of watches', async () => {
      const result: PaginatedResult<Watch> = {
        items: [
          {
            id: '1',
            name: 'Rolex01',
            brand: 'Rolex',
            referenceNumber: 'REF001',
          },
        ],
        total: 1,
        page: 1,
        perPage: 10,
      };
      const getWatchesQuery = new GetWatchesQuery(undefined, undefined, 1, 10);
      jest.spyOn(watchService, 'getWatches').mockResolvedValue(result);

      expect(await watchController.findAll()).toBe(result);
      expect(watchService.getWatches).toHaveBeenCalledWith(getWatchesQuery);
    });
  });

  describe('findOne', () => {
    it('should return a single watch by ID', async () => {
      const result: Watch = {
        id: '1',
        name: 'Rolex01',
        brand: 'Rolex',
        referenceNumber: 'REF001',
      };
      jest.spyOn(watchService, 'getWatchById').mockResolvedValue(result);

      expect(await watchController.findOne('1')).toBe(result);
      expect(watchService.getWatchById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception if watch is not found', async () => {
      jest
        .spyOn(watchService, 'getWatchById')
        .mockRejectedValue(new Error('Watch not found'));

      await expect(watchController.findOne('1')).rejects.toThrow(
        'Watch not found',
      );
    });
  });

  describe('update', () => {
    it('should update a watch by ID', async () => {
      const updateWatchDto: UpdateWatch = { name: 'Updated Rolex' };
      const result: Watch = {
        id: '1',
        name: 'Updated Rolex',
        brand: 'Rolex',
        referenceNumber: 'REF001',
      };
      jest.spyOn(watchService, 'updateWatch').mockResolvedValue(result);

      expect(await watchController.update('1', updateWatchDto)).toBe(result);
      expect(watchService.updateWatch).toHaveBeenCalledWith(
        '1',
        updateWatchDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a watch by ID', async () => {
      jest.spyOn(watchService, 'deleteWatch').mockResolvedValue(undefined);

      expect(await watchController.remove('1')).toBeUndefined();
      expect(watchService.deleteWatch).toHaveBeenCalledWith('1');
    });
  });
});
