import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { IPageableFilterBase } from 'src/common/lib/filter/i-filter';
import { CreateWatch } from './create-watch.response';

export class PageableFilter
  extends CreateWatch
  implements IPageableFilterBase<number>
{
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  perPage?: number = 10;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  referenceNumber?: string;
}
