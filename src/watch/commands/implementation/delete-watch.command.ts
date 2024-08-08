import { CommandBase } from 'src/common/lib/cqrs';

export class DeleteWatchCommand extends CommandBase {
  public id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }
}
