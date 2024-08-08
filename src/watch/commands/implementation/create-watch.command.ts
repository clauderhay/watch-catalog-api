import { CommandBase } from 'src/common/lib/cqrs';

export class CreateWatchCommand extends CommandBase {
  public name?: string;

  public brand?: string;

  public referenceNumber?: string;

  constructor(name?: string, brand?: string, referenceNumber?: string) {
    super();
    this.name = name;
    this.brand = brand;
    this.referenceNumber = referenceNumber;
  }
}
