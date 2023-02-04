import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        "name": "tipo1",         
        "price": 22,         
        "isRemote": true,      
        "includesHotel": true 
      }
    })
  }

  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        "email": "lulu@gmail.com",
        "password": "123456"
      }
    })
  }

  let enrollment = await prisma.enrollment.findFirst();
  if (!enrollment) {
    enrollment = await prisma.enrollment.create({
      data: {
        "name": "lulu",
        "cpf": "77876066496",
        "birthday": "2023-01-30T01:59:14.048Z",
        "phone": "(21)98559-9999",
        "userId": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    })
  }

  let address = await prisma.address.findFirst();
  if (!address) {
    address = await prisma.address.create({
      data: {
        "cep": "87020-260",
        "street": "Rua Secreta",
        "city": "Corococo",
        "state": "PR",
        "number": "1001",
        "neighborhood": "nada",
        "enrollmentId": 1,
        "createdAt": new Date(),
        "updatedAt": new Date()
      }
    })
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
