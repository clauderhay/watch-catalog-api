import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { IPageableFilterBase } from 'src/common/lib/filter/i-filter';
import { CreateWatch } from './create-watch.response';

export class PageableFilter
  extends CreateWatch
  implements IPageableFilterBase<string>
{
  @IsOptional()
  @IsString({ each: true })
  ids?: string[];

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  perPage?: number;
}
