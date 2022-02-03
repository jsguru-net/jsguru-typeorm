import { Entity, JoinColumn, ManyToOne, Unique } from "typeorm";
import { EmailCampaign } from "./EmailCampaign";
import { Customer } from "./Customer";
import { BaseEntity } from "../shared";

@Entity({
  name: "email_campaign_contacts",
})
@Unique("uq_email_campaign_contacts_email_campaign_id_customer_id", [
  "emailCampaign",
  "customer",
])
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
