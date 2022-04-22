//The Customer class containing all objectkeys from API when fetching a customer.
export class Customer {
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public phone: string,
    public id?: string
  ) {}
}
