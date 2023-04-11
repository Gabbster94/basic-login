import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();
const getHashedPassword = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltOrRounds);

  return hashedPassword;
};

async function main() {
  const alicePass = await getHashedPassword('aliceStrongPassword');

  const alice = await prisma.user.upsert({
    where: { email: 'alice@baselogin.io' },
    update: {},
    create: {
      email: 'alice@baselogin.io',
      name: 'Alice',
      hashedPassword: alicePass
    },
  });

  const bobPass = await getHashedPassword('bobStrongPassword');

  const bob = await prisma.user.upsert({
    where: { email: 'bob@baselogin.io' },
    update: {},
    create: {
      email: 'bob@baselogin.io',
      name: 'Bob',
      hashedPassword: bobPass
    },
  });

  console.log({ alice, bob });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
