import { Entity, JoinColumn, ManyToOne } from "typeorm";
import { EmailCampaign } from "./EmailCampaign";
import { Customer } from "./Customer";
import { BaseEntity } from "../shared";

@Entity({
  name: "email_campaign_contacts",
})
export class EmailCampaignContact extends BaseEntity {
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
  @ManyToOne(() => Customer, (customer) => customer.id, {
    nullable: false,
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    createForeignKeyConstraints: true,
  })
  @JoinColumn({
    name: "customer_id",
  })
  customer: Customer;
}
