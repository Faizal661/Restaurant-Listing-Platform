export class Restaurant {
  constructor(
    public id: number | null,
    public name: string,
    public address: string,
    public contact: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
