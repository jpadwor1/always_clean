import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { labels, priorities, statuses } from './data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const customers = Array.from({ length: 100 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  address: faker.location.streetAddress({ useFullAddress: true }),
  email: faker.internet.email(),
  phone: faker.phone.number(),
}));

fs.writeFileSync(
  path.join(__dirname, 'customers.json'),
  JSON.stringify(customers, null, 2)
);

console.log('✅ Tasks data generated.');
