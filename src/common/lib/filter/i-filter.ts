export interface IFilterBase<TId = string> {
  $ids?: TId[];
  $orderBy?: string;
  $order?: 'ASC' | 'DESC';
}

export interface IPageableFilterBase<TId = number> extends IFilterBase<TId> {
  page?: number;
  perPage?: number;
}

export interface IResolvableUrl {
  $resolveImages?: boolean;
}

export type Filter<T, TId = string> = Partial<T & IFilterBase<TId>>;
export type PageableFilter<T, TId = string> = Partial<
  T & IPageableFilterBase<TId>
>;
