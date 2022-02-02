import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    type: "bigint",
  })
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
