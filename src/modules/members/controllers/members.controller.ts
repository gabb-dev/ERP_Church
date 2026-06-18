import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { MembersService } from "../services/members.service";
import { CreateMemberDto } from "../dtos/create-member.dto";

@Controller("members")
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const response = await this.membersService.findAll();

    if (!response.status) {
      return {
        statusCode: 404,
        message: "Nenhum membro encontrado",
      };
    }

    return {
      statusCode: 200,
      message: "OK",
      totalMembers: response.data.length,
      members: response.data,
    };
  }

  @Get(":uuid")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("uuid") uuid: string) {
    const response = await this.membersService.findOne(uuid);

    if (!response.status) {
      return {
        statusCode: 404,
        message: "Membro não encontrado",
      };
    }

    return {
      statusCode: 200,
      message: "OK",
      member: response.data,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMemberDto: CreateMemberDto) {
    const response = await this.membersService.create(createMemberDto);

    if (!response.status) {
      return {
        statusCode: 400,
        message: "Erro ao criar membro",
        error: response.error,
      };
    }

    return {
      statusCode: 201,
      message: "Membro criado com sucesso",
      member: response.data,
    };
  }
}
