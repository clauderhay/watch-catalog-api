import { Test, TestingModule } from '@nestjs/testing';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';
import { Watch } from 'src/database/entities/watch.entity';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PaginatedResult } from './models/paginated-result.model';
import { UpdateWatch } from './models/update-watch.response';
import { CreateWatch } from './models/create-watch.response';
import { PageableFilter } from './models/pageable-filter.model';

describe('WatchController', () => {
  let controller: WatchController;
  let service: WatchService;

  const mockWatchService = {
    getWatchById: jest.fn(),
    getWatches: jest.fn(),
    createWatch: jest.fn(),
    updateWatch: jest.fn(),
    deleteWatch: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchController],
      providers: [{ provide: WatchService, useValue: mockWatchService }],
    }).compile();

    controller = module.get<WatchController>(WatchController);
    service = module.get<WatchService>(WatchService);
  });

  describe('findOne', () => {
    it('should return a watch', async () => {
      const result: Watch = {
        id: 1,
        name: 'Rolex',
        brand: 'Rolex',
        referenceNumber: 'REF001',
      };
      jest.spyOn(service, 'getWatchById').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });

    it('should throw NotFoundException if watch not found', async () => {
      jest.spyOn(service, 'getWatchById').mockResolvedValue(null);

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return a paginated result of watches', async () => {
      const result: PaginatedResult<Watch> = {
        items: [],
        total: 0,
        page: 1,
        perPage: 10,
      };
      jest.spyOn(service, 'getWatches').mockResolvedValue(result);

      const pageableFilterDto: PageableFilter = { page: 1, perPage: 10 };
      expect(await controller.findAll(pageableFilterDto)).toBe(result);
    });

    it('should throw InternalServerErrorException on service error', async () => {
      jest.spyOn(service, 'getWatches').mockRejectedValue(new Error());

      const pageableFilterDto: PageableFilter = { page: 1, perPage: 10 };
      await expect(controller.findAll(pageableFilterDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('create', () => {
    it('should create and return a watch', async () => {
      const createWatchDto: CreateWatch = {
        name: 'Rolex01',
        brand: 'Rolex',
        referenceNumber: 'REF001',
      };
      const result: Watch = { id: 1, ...createWatchDto };
      jest.spyOn(service, 'createWatch').mockResolvedValue(result);

      expect(await controller.create(createWatchDto)).toEqual({
        status: 'OK',
        message: 'The watch has been successfully created.',
        data: result,
      });
    });

    it('should throw InternalServerErrorException on service error', async () => {
      const createWatchDto: CreateWatch = {
        name: 'Rolex01',
        brand: 'Rolex',
        referenceNumber: 'REF001',
      };
      jest.spyOn(service, 'createWatch').mockRejectedValue(new Error());

      await expect(controller.create(createWatchDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('should update and return a watch', async () => {
      const updateWatchDto: UpdateWatch = {
        name: 'Casio Sports',
        brand: 'Casio',
        referenceNumber: 'REF00X1',
      };
      const result: Watch = { id: 1, ...updateWatchDto };
      jest.spyOn(service, 'updateWatch').mockResolvedValue(result);

      expect(await controller.update(1, updateWatchDto)).toEqual({
        status: 'OK',
        message: 'The watch has been successfully updated.',
        data: result,
      });
    });

    it('should throw NotFoundException if watch not found', async () => {
      const updateWatchDto: UpdateWatch = {
        name: 'Casio Sports',
        brand: 'Casio',
        referenceNumber: 'REF00X1',
      };
      jest.spyOn(service, 'updateWatch').mockResolvedValue(null);

      await expect(controller.update(1, updateWatchDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a watch and return a success message', async () => {
      jest.spyOn(service, 'deleteWatch').mockResolvedValue(true);

      expect(await controller.remove(1)).toEqual({
        status: 'OK',
        message: 'The watch has been successfully deleted.',
      });
    });

    it('should throw NotFoundException if watch not found', async () => {
      jest.spyOn(service, 'deleteWatch').mockResolvedValue(false);

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
