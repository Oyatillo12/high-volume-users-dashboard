import { faker } from "@faker-js/faker";
import type { User } from "../model/types";

export function generateUsers(count = 10_000): User[] {
  faker.seed(42);

  const users: User[] = [];

  for (let i = 0; i < count; i++) {
    users.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      age: faker.number.int({ min: 18, max: 70 }),
      country: faker.location.country(),
      isActive: faker.datatype.boolean(),
      createdAt: faker.date.past({ years: 2 }).toISOString(),
    });
  }
  return users;
}
