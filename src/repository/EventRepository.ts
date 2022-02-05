import { AbstractRepository, EntityRepository, Repository } from "typeorm";
import { Event } from "../entity";

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
