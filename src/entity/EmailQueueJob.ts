import { Column, Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { EmailCampaign } from "./EmailCampaign";
import { EmailCampaignContact } from "./EmailCampaignContact";
import { BaseEntity } from "../shared";

export enum EmailQueueJobStatus {
  PENDING = "pending",
  QUEUED = "queued",
  FAILED = "failed",
  DONE = "done",
}

@Entity({
  name: "email_queue_jobs",
})
@Unique("uq_email_queue_jobs_email_campaign_id_email_campaign_contact_id", [
  "emailCampaign",
  "emailCampaignContact",
])
export class EmailQueueJob extends BaseEntity {
  @ManyToOne(() => EmailCampaign, (emailCampaign) => emailCampaign.id, {
    nullable: false,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: "email_campaign_id",
  })
  emailCampaign: EmailCampaign;
  @ManyToOne(
    () => EmailCampaignContact,
    (emailCampaignContact) => emailCampaignContact.id,
    {
      nullable: false,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      createForeignKeyConstraints: true,
    }
  )
  @JoinColumn({
    name: "email_campaign_contact_id",
  })
  emailCampaignContact: EmailCampaignContact;
  @Column({
    type: "enum",
    enum: EmailQueueJobStatus,
    default: EmailQueueJobStatus.PENDING,
    nullable: true,
  })
  status: EmailQueueJobStatus;
  @Column({
    type: "bigint",
    nullable: true,
    default: 0,
  })
  mailServiceMessageId: number;
  @Column({
    type: "varchar",
    length: 20,
    nullable: true,
  })
  mailServiceMessageStatus: string;
}
