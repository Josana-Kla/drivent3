import { ApplicationError } from "@/protocols";

export function cannotFindAValidTicketToGetHotel(): ApplicationError {
  return {
    name: "CannotFindAValidTicketToGetHotel",
    message: "Ticket wasn't paid or it's an remote event or hotel isn't included",
  };
}
