import { BaseEntity } from "../shared";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { CustomerSource } from ".";

/*
	id BIGINT AUTO_INCREMENT,
  fullname VARCHAR(60) NOT NULL,
  dob DATE,
  gender ENUM('female','male','unknown'),
  company VARCHAR(60),
  position VARCHAR(60),
  phone_number VARCHAR(20),
  email VARCHAR(80) NOT NULL,
  address VARCHAR(120),
  city VARCHAR(60),
  notes VARCHAR(255),
  source_id BIGINT,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,    
  PRIMARY KEY(id)
*/

export enum CustomerGender {
  FEMALE = "female",
  MALE = "male",
  UNKNOWN = "unknown",
}

@Entity({
  name: "customers",
})
export class Customer extends BaseEntity {
  constructor(partial: Partial<Customer>) {
    super();
    Object.assign(this, partial);
  }
  @Column({
    length: 60,
    type: "varchar",
    nullable: false,
  })
  @Index("ix_customers_fullname", {})
  fullname: string;
  @Column({
    type: "date",
    nullable: true,
  })
  dob: Date;
  @Column({
    type: "enum",
    enum: CustomerGender,
    nullable: true,
    default: CustomerGender.UNKNOWN,
  })
  gender: CustomerGender;
  @Column({
    length: 60,
    type: "varchar",
    nullable: true,
  })
  company: string;
  @Column({
    length: 60,
    type: "varchar",
    nullable: true,
  })
  position: string;
  @Column({
    length: 20,
    type: "varchar",
    nullable: true,
  })
  phoneNumber: string;
  @Index("uq_customers_email", {
    unique: true,
  })
  @Column({
    length: 80,
    type: "varchar",
    nullable: false,
  })
  email: string;
  @Column({
    length: 120,
    type: "varchar",
    nullable: true,
  })
  address: string;
  @Column({
    length: 60,
    type: "varchar",
    nullable: true,
  })
  city: string;
  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
  })
  notes: string;
  @ManyToOne(() => CustomerSource, (customerSource) => customerSource.id, {
    nullable: true,
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: "source_id",
  })
  customerSource: CustomerSource;
}
