import { CommandBase } from 'src/common/lib/cqrs';

export class UpdateWatchCommand extends CommandBase {
  public readonly id: number;

  public readonly name?: string;

  public readonly brand?: string;

  public readonly referenceNumber?: string;

  constructor(
    id: number,
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
