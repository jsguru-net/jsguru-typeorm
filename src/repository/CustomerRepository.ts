import { EntityRepository, FindConditions, Repository } from "typeorm";
import { Customer } from "../entity";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  search(conditions?: FindConditions<Customer>): Promise<[Customer[], number]> {
    return this.findAndCount(conditions);
  }
}
