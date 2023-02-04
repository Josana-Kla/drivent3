import { prisma } from "@/config";
import { Hotel } from "@prisma/client";

async function getAllHotels(): Promise<Hotel[]> {
  return prisma.hotel.findMany();
}

async function getHotelRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: { id: hotelId },
    include: { Rooms: true }
  });
}

const hotelRepository = {
  getAllHotels,
  getHotelRoomsByHotelId
};

export default hotelRepository;
