import {
  EntityRepository,
  FindConditions,
  FindManyOptions,
  Repository,
} from "typeorm";
import { Customer } from "../entity";

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  search(options?: FindManyOptions<Customer>): Promise<[Customer[], number]> {
    return this.findAndCount(options);
  }
}
