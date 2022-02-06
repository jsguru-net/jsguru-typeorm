import { describe, expect, test } from "@jest/globals";
import {
  createConnection,
  FindConditions,
  getConnection,
  getManager,
  In,
  Like,
  Not,
} from "typeorm";
import { Customer, CustomerSource, Event } from "../../src/entity";
import { CustomerGender } from "../../src/entity/Customer";
import { CustomerRepository } from "../../src/repository/CustomerRepository";

describe("Query", () => {
  beforeAll(async () => {
    // setup one time
    await createConnection();
  });
  describe("Simple query", () => {
    it("test query mapping", () => {
      // s
      // other conditions
      const filter = {
        s: "nh", // email or fullname
        customerSource: {
          id: [1, 2, 3],
        },
      };

      console.error(filter);
      expect(filter).toBeTruthy();
    });
    it("find by id", async () => {
      const entityManager = getManager();
      const customerRepository =
        entityManager.getCustomRepository(CustomerRepository);
      const customer = await customerRepository.findOne(104201, {
        relations: ["customerSource"],
      });
      expect(customer).toBeTruthy();
    }, 20000);
    it("find by filters", async () => {
      const entityManager = getManager();
      const customerRepository =
        entityManager.getCustomRepository(CustomerRepository);
      const [customers, count] = await customerRepository.search({
        select: [
          "id",
          "fullname",
          "email",
          "createdAt",
          "updatedAt",
          "phoneNumber",
          "gender",
        ],
        relations: ["customerSource"],
        where: {
          gender: In([CustomerGender.MALE, CustomerGender.FEMALE]),
          customerSource: {
            id: In([1, 2, 3]),
          },
        },
        take: 10,
        skip: 0,
        order: {
          id: "DESC",
          fullname: "ASC",
        },
      });
      console.error(customers, count);
      expect(customers.length).toBeTruthy();
    }, 20000);
  });
  describe("Query builder", () => {
    it("Find events in Feb", async () => {
      const entityManager = getManager();
      const eventRepository = entityManager.getRepository(Event);
      const eventQuery = eventRepository
        .createQueryBuilder("event")
        .where(
          "event.id in (SELECT DISTINCT(id) FROM `jsguru-typeorm`.events evt WHERE MONTH(evt.event_date) = :month)",
          {
            month: 2,
          }
        );
      const [eventsInFeb, count] = await eventQuery.getManyAndCount();

      expect(eventsInFeb).toBeTruthy();
    });
    it("Statistic for events by month and year", async () => {
      const entityManager = getManager();
      const eventRepository = entityManager.getRepository(Event);
      const eventQuery = eventRepository
        .createQueryBuilder("event")
        .select("MONTH(event.event_date)", "event_month")
        .addSelect("YEAR(event.event_date)", "event_year")
        .addSelect("COUNT(event.id)", "number_of_events")
        .groupBy("event_month")
        .addGroupBy("event_year");
      const monthlyStatsRaws = await eventQuery.getRawMany();
      const monthlyStats = monthlyStatsRaws.map((s: any) => {
        const item = {
          eventMonth: s.event_month,
          eventYear: s.event_year,
          numberOfEvents: parseInt(s.number_of_events),
        };
        return item;
      });
      expect(monthlyStats).toBeTruthy();
    });
  });
  describe("Update", () => {
    it("should update data", async () => {
      const entityManager = getManager();
      const customerSourceRepository =
        entityManager.getRepository(CustomerSource);
      await customerSourceRepository.update(
        { id: 8 },
        {
          description: "Zalo from nodeJS",
        }
      );
      const customerSource = await customerSourceRepository.findOne(8);
      console.log(customerSource);
      expect(customerSource).toBeTruthy();
    });
  });
  afterAll(async () => {
    await getConnection().close();
  });
});
