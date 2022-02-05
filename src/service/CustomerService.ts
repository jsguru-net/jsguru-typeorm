import { FindConditions } from "typeorm";
import { Customer } from "../entity";

export class CustomerService {
  search(conditions?: FindConditions<Customer>) {}
}
