import { describe, expect, test } from "@jest/globals";
import { createConnection, getConnection, getManager } from "typeorm";
import { Customer, CustomerSource, Event } from "../../src/entity";
import { CustomerGender } from "../../src/entity/Customer";
import { EventRepository } from "../../src/repository/EventRepository";
import { StringHelpers } from "../../src/shared";
import { Male, Female } from "./data";
import * as _ from "lodash";
const isLeapYear = (year) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};

const randomDate = () => {
  const randomYear = 1980 + Math.floor(Math.random() * 30);
  const randomMonth = Math.floor(Math.random() * 11); //0 -> 11
  let randomDay = Math.floor(Math.random() * 30) + 1; // 1 -> 31
  if (randomMonth == 1) {
    randomDay = isLeapYear(randomYear) ? 29 : 28; // ignore leap year
  }
  return new Date(randomYear, randomMonth, randomDay);
};
const randomGender = () => {
  const r = Math.floor(Math.random() * 2);
  if (r == 0) return CustomerGender.UNKNOWN;
  if (r == 1) return CustomerGender.FEMALE;
  if (r == 2) return CustomerGender.MALE;
};
describe("Seed", () => {
  beforeAll(async () => {
    // setup one time
    await createConnection();
  });
  describe("seed", () => {
    it("should generate a collection of customer source", async () => {
      const entityManager = getManager();
      // await entityManager.query(`SET foreign_key_checks = 0`);
      // await entityManager.query(`TRUNCATE TABLE customer_sources`);
      // // await entityManager.query(`TRUNCATE TABLE customers`);

      // const customerSources: Array<CustomerSource> = [];
      // customerSources.push(new CustomerSource({ name: "Personal Contacts" }));
      // customerSources.push(new CustomerSource({ name: "Facebook" }));
      // customerSources.push(new CustomerSource({ name: "Email" }));
      // customerSources.push(new CustomerSource({ name: "Google Ads" }));
      // customerSources.push(new CustomerSource({ name: "Website" }));
      // customerSources.push(new CustomerSource({ name: "Telesale" }));
      // customerSources.push(new CustomerSource({ name: "Google Search" }));
      // customerSources.push(new CustomerSource({ name: "Zalo" }));
      // await entityManager.insert(CustomerSource, customerSources);

      const customers: Array<Customer> = [];
      const maleCustomers = _.uniqBy(Male, "name");
      const femaleCustomers = _.uniqBy(Female, "name").filter(
        (item) => !_.flatMap(maleCustomers, (o) => [o.name]).includes(item.name)
      );
      for (let i = 0; i < maleCustomers.length; i++) {
        const customerSourceId = Math.floor(Math.random() * 7) + 1;
        customers.push(
          new Customer({
            fullname: maleCustomers[i].name,
            email:
              StringHelpers.replaceVietNameseTones(maleCustomers[i].name) +
              "@yopmail.com",
            customerSource: new CustomerSource({ id: customerSourceId }),
            dob: randomDate(),
            gender: CustomerGender.MALE,
          })
        );
      }
      for (let i = 0; i < femaleCustomers.length; i++) {
        const customerSourceId = Math.floor(Math.random() * 7) + 1;
        customers.push(
          new Customer({
            fullname: femaleCustomers[i].name,
            email:
              StringHelpers.replaceVietNameseTones(femaleCustomers[i].name) +
              i +
              "@yopmail.com",
            customerSource: new CustomerSource({ id: customerSourceId }),
            dob: randomDate(),
            gender: CustomerGender.FEMALE,
          })
        );
      }
      // const NUMBER_OF_CUSTOMERS = 1e5;
      // for (let i = 0; i < NUMBER_OF_CUSTOMERS; i++) {
      //   const customerSourceId = Math.floor(Math.random() * 7) + 1;
      //   "".padStart;
      //   customers.push(
      //     new Customer({
      //       fullname: `The user fullname ${i.toString().padStart(5, "0")}`,
      //       email: `jsguru.example.${i.toString().padStart(5, "0")}`,
      //       customerSource: new CustomerSource({ id: customerSourceId }),
      //       dob: randomDate(),
      //       gender: randomGender(),
      //     })
      //   );
      // }
      const customerRepository = entityManager.getRepository(Customer);
      await customerRepository.save(customers, {
        chunk: 100,
      });

      const numberOfCustomers = await customerRepository.count();
      // expect(numberOfCustomers).toEqual(customers.length);
      // await entityManager.query(`SET foreign_key_checks = 1`);
      const events: Array<Event> = [];
      events.push(
        new Event({
          name: "Tết Dương Lịch 2022",
          eventDate: new Date("2022-01-01"),
        }),
        new Event({
          name: "Lễ Tình Nhân 2022",
          eventDate: new Date("2022-02-14"),
        }),
        new Event({
          name: "Ngày Thầy Thuốc Việt Nam 2022",
          eventDate: new Date("2022-02-27"),
        }),
        new Event({
          name: "Ngày Quốc Tết Phụ Nữ 2022",
          eventDate: new Date("2022-03-08"),
        }),
        new Event({
          name: "Ngày Quốc Tế Hạnh Phúc 2022",
          eventDate: new Date("2022-03-20"),
        }),
        new Event({
          name: "Ngày thành lập Đoàn TNCS Hồ Chí Minh",
          eventDate: new Date("2022-03-26"),
        }),
        new Event({
          name: "Ngày Cá tháng Tư",
          eventDate: new Date("2022-04-01"),
        }),
        new Event({
          name: "Ngày giải phóng miền Nam",
          eventDate: new Date("2022-04-30"),
        }),
        new Event({
          name: "Ngày Quốc tế Lao động",
          eventDate: new Date("2022-05-01"),
        }),
        new Event({
          name: "Ngày chiến thắng Điện Biên Phủ",
          eventDate: new Date("2022-05-07"),
        }),
        new Event({
          name: "Ngày của mẹ",
          eventDate: new Date("2022-05-03"),
        }),
        new Event({
          name: "Ngày sinh chủ tịch Hồ Chí Minh",
          eventDate: new Date("2022-05-19"),
        }),
        new Event({
          name: "Ngày Quốc tế thiếu nhi",
          eventDate: new Date("2022-06-01"),
        }),
        new Event({
          name: "Ngày của cha",
          eventDate: new Date("2022-06-17"),
        }),
        new Event({
          name: "Ngày báo chí Việt Nam",
          eventDate: new Date("2022-06-21"),
        }),
        new Event({
          name: "Ngày gia đình Việt Nam",
          eventDate: new Date("2022-06-28"),
        }),
        new Event({
          name: "Ngày dân số thế giới",
          eventDate: new Date("2022-07-11"),
        })
      );

      // const eventRepository =
      //   entityManager.getCustomRepository(EventRepository);
      // await eventRepository.save(events);

      expect(events).toBeTruthy();
    }, 600000);
  });
  afterAll(async () => {
    await getConnection().close();
  });
});
