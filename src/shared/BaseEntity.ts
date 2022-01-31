import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DateTimeHelpers } from "./helpers";
export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    name: "created_at",
    type: "datetime",
  })
  createdAt: Date;
  @Column({
    name: "updated_at",
    type: "datetime",
  })
  updatedAt: Date;
  @BeforeInsert()
  beforeInsert() {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }
}
