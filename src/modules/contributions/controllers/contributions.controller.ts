import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { ContributionsService } from "../services/contributions.service";
import { CreateContributionDto } from "../dtos/create-contribution.dto";

@Controller("contributions")
export class ContributionsController {
  constructor(private readonly contributionsService: ContributionsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const response = await this.contributionsService.findAll();

    if (!response.status) {
      return {
        statusCode: 404,
        message: "Nenhuma contribuição encontrada",
      };
    }

    return {
      statusCode: 200,
      message: "OK",
      totalContributions: response.data.length,
      contributions: response.data,
    };
  }

  @Get(":uuid")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("uuid") uuid: string) {
    const response = await this.contributionsService.findOne(uuid);

    if (!response.status) {
      return {
        statusCode: 404,
        message: "Contribuição não encontrada",
      };
    }

    return {
      statusCode: 200,
      message: "OK",
      contribution: response.data,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createContributionDto: CreateContributionDto) {
    const response = await this.contributionsService.create(
      createContributionDto,
    );

    if (!response.status) {
      return {
        statusCode: 400,
        message: "Erro ao criar contribuição",
        error: response.error,
      };
    }

    return {
      statusCode: 201,
      message: "Contribuição criada com sucesso",
      contribution: response.data,
    };
  }
}
