import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsString,
} from "class-validator";
import { address } from "../types/address";
import { UUID } from "node:crypto";

export class MemberDTO {
  @IsString()
  full_name: string;

  @IsString()
  social_name: string;

  @IsDateString()
  date_birth: Date;

  @IsDateString()
  date_baptism: Date;

  @IsString()
  sex: "M" | "F";

  @IsNumberString()
  telephone: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  ministrys: Array<UUID>;

  address: address;
}
