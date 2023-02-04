import { AuthenticatedRequest } from "@/middlewares";
import hotelService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    
    const hotels = await hotelService.getAllHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    if(error.name === "notFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "CannotFindAValidTicketToGetHotel") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getHotelById(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const hotelId: string = req.params.hotelId;

    const hotel = await hotelService.getHotelById(userId, hotelId);

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if(error.name === "notFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === "CannotFindAValidTicketToGetHotel") {
      return res.status(httpStatus.PAYMENT_REQUIRED).send(error);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
