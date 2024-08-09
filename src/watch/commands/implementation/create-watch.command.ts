import { CommandBase } from 'src/common/lib/cqrs';

export class CreateWatchCommand extends CommandBase {
  public readonly name?: string;

  public readonly brand?: string;

  public readonly referenceNumber?: string;

  constructor(name?: string, brand?: string, referenceNumber?: string) {
    super();
    this.name = name;
    this.brand = brand;
    this.referenceNumber = referenceNumber;
  }
}
