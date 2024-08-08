import { CommandBase } from 'src/common/lib/cqrs';

export class UpdateWatchCommand extends CommandBase {
  public id: string;

  public name?: string;

  public brand?: string;

  public referenceNumber?: string;

  constructor(
    id: string,
    name?: string,
    brand?: string,
    referenceNumber?: string,
  ) {
    super();
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.referenceNumber = referenceNumber;
  }
}
