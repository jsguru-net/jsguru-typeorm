import { BaseEntity } from "../shared/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity({
  name: "events",
})
export class Event extends BaseEntity {
  constructor(partial: Partial<Event>) {
    super();
    Object.assign(this, partial);
  }
  @Column({
    length: 80,
    type: "varchar",
    nullable: false,
  })
  name: string;
  @Column({
    type: "date",
    nullable: false,
  })
  eventDate: Date;
  @Column({
    length: 255,
    type: "varchar",
    nullable: true,
  })
  image: string;
  @Column({
    type: "text",
    nullable: true,
  })
  description: string;
}
