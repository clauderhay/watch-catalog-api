import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWatch {
  @IsString()
  @IsNotEmpty()
  public name?: string;

  @IsString()
  @IsNotEmpty()
  public brand?: string;

  @IsString()
  @IsNotEmpty()
  public referenceNumber?: string;

  constructor(name?: string, brand?: string, referenceNumber?: string) {
    this.name = name;
    this.brand = brand;
    this.referenceNumber = referenceNumber;
  }
}
