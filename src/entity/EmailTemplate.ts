import { BaseEntity } from "../shared";
import { Column, Entity } from "typeorm";

@Entity({
  name: "email_templates",
})
export class EmailTemplate extends BaseEntity {
  @Column({
    length: 80,
    type: "varchar",
    nullable: false,
  })
  name: string;
  @Column({
    type: "bigint",
    nullable: false,
  })
  templateId: string;
  @Column({
    type: "json",
    nullable: false,
  })
  variables: Object;
  @Column({
    length: 120,
    type: "varchar",
    nullable: true,
  })
  description: string;
}
