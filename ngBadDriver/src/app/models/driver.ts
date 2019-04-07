export class Driver {
  id: number;
  city: string;
  road: string;
  plate: string;
  car: string;
  description: string;
  reportDate: string;
  createDate: string;

  constructor(
    id?: number,
    city?: string,
    road?: string,
    plate?: string,
    car?: string,
    description?: string,
    reportDate?: string,
    createDate?: string
    ) {
    this.id = id;
    this.city = city;
    this.road = road;
    this.plate = plate;
    this.car = car;
    this.description = description;
    this.reportDate = reportDate;
    this.createDate = createDate;
    }
}
