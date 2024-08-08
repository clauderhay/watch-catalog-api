import { CommandBase } from 'src/common/lib/cqrs';

export class GetWatchesQuery extends CommandBase {
  public name?: string;

  public referenceNumber?: string;

  public page: number;

  public perPage: number;

  constructor(name?: string, referenceNumber?: string, page = 1, perPage = 10) {
    super();
    this.name = name;
    this.referenceNumber = referenceNumber;
    this.page = page;
    this.perPage = perPage;
  }
}
