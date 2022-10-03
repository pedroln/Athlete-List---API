import { ApiProperty } from "@nestjs/swagger";
import { Events } from "../events.entity";

export class ReturnEventDto {
  @ApiProperty()
  event: Events;
  message: string;
}