import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Event } from "./Event";
import { BaseEntity } from "../shared";
import { EmailTemplate } from "./EmailTemplate";

export enum EmailCampaignStatus {
  PENDING = "pending",
  INPROGRESS = "inprogress",
  PAUSED = "paused",
  CANCELLED = "cancelled",
  COMPLETED = "completed",
}

@Entity({
  name: "email_campaigns",
})
export class EmailCampaign extends BaseEntity {
  @Column({
    length: 80,
    type: "varchar",
    nullable: false,
  })
  name: string;
  @Column({
    length: 120,
    type: "varchar",
    nullable: true,
  })
  description: string;
  @Column({
    type: "text",
    nullable: true,
  })
  target: string;
  @ManyToOne(() => Event, (event) => event.id, {
    nullable: true,
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: "event_id",
  })
  event: Event;
  @ManyToOne(() => EmailTemplate, (emailTemplate) => emailTemplate.id, {
    nullable: true,
    onUpdate: "SET NULL",
    onDelete: "SET NULL",
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: "email_template_id",
  })
  emailTemplate: EmailTemplate;
  @Column({
    type: "bigint",
    nullable: true,
    default: 0,
  })
  sent: number;
  @Column({
    type: "bigint",
    nullable: true,
    default: 0,
  })
  opened: number;
  @Column({
    type: "bigint",
    nullable: true,
    default: 0,
  })
  clicked: number;
  @Column({
    type: "bigint",
    nullable: true,
    default: 0,
  })
  replied: number;
  @Column({
    type: "enum",
    enum: EmailCampaignStatus,
    default: EmailCampaignStatus.PENDING,
    nullable: true,
  })
  status: EmailCampaignStatus;
}
