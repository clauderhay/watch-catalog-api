import { CommandBase } from 'src/common/lib/cqrs';

export class GetWatchesQuery extends CommandBase {
  public readonly name?: string;

  public readonly referenceNumber?: string;

  public readonly page: number;

  public readonly perPage: number;

  constructor(name?: string, referenceNumber?: string, page = 1, perPage = 10) {
    super();
    this.name = name;
    this.referenceNumber = referenceNumber;
    this.page = page;
    this.perPage = perPage;
  }
}
