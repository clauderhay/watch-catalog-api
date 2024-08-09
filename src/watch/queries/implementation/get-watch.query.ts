import { CommandBase } from 'src/common/lib/cqrs';

export class GetWatchQuery extends CommandBase {
  public readonly id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }
}
