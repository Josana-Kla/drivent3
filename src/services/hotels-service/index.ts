import { notFoundError } from "@/errors";
import hotelRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { TicketStatus } from "@prisma/client";
import { cannotFindAValidTicketToGetHotel } from "./errors";

async function getAllHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if(ticket.status === TicketStatus.RESERVED || ticket.TicketType.isRemote === true || ticket.TicketType.includesHotel === false) {
    throw cannotFindAValidTicketToGetHotel();
  }

  const hotels = await hotelRepository.getAllHotels();

  return hotels;
}

async function getHotelById(userId: number, hotelId: string) {
  const hotelIdNumber = Number(hotelId);
  if(!hotelIdNumber) {
    throw notFoundError();
  }

  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  if(ticket.status === TicketStatus.RESERVED || ticket.TicketType.isRemote === true || ticket.    TicketType.includesHotel === false) {
    throw cannotFindAValidTicketToGetHotel();
  }

  const roomsByHotelId = await hotelRepository.getHotelRoomsByHotelId(hotelIdNumber);
  if (!roomsByHotelId) {
    throw notFoundError();
  }

  return roomsByHotelId;
}

const hotelService = {
  getAllHotels,
  getHotelById,
};

export default hotelService;
