import { CommandBase } from 'src/common/lib/cqrs';

export class DeleteWatchCommand extends CommandBase {
  public readonly id: number;

  constructor(id: number) {
    super();
    this.id = id;
  }
}
