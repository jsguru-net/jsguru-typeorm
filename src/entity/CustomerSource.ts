import { Column, Entity } from "typeorm";
import { BaseEntity } from "../shared";

/*
	id BIGINT AUTO_INCREMENT,
  name VARCHAR(80) NOT NULL,
  description VARCHAR(255),
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,        
  PRIMARY KEY(id)
*/

@Entity({
  name: "customer_sources",
})
export class CustomerSource extends BaseEntity {
  @Column({
    type: "varchar",
    length: 80,
  })
  name: string;
  @Column({
    type: "varchar",
    length: 255,
  })
  description: string;
}
