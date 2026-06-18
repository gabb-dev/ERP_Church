import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { MinistryService } from '../services/ministry.service';
import { CreateMinistryDto } from '../dtos/create-ministry.dto';

@Controller('ministrys')
export class MinistryController {
  constructor(private readonly ministryService: MinistryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const response = await this.ministryService.findAll();

    if (!response.status) {
      return {
        statusCode: 404,
        message: 'Nenhum ministério encontrado',
      };
    }

    return {
      statusCode: 200,
      message: 'OK',
      totalMinistries: response.data.length,
      ministries: response.data,
    };
  }

  @Get(':uuid')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('uuid') uuid: string) {
    const response = await this.ministryService.findOne(uuid);

    if (!response.status) {
      return {
        statusCode: 404,
        message: 'Ministério não encontrado',
      };
    }

    return {
      statusCode: 200,
      message: 'OK',
      ministry: response.data,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMinistryDto: CreateMinistryDto) {
    const response = await this.ministryService.create(createMinistryDto);

    if (!response.status) {
      return {
        statusCode: 400,
        message: 'Erro ao criar ministério',
        error: response.error,
      };
    }

    return {
      statusCode: 201,
      message: 'Ministério criado com sucesso',
      ministry: response.data,
    };
  }
}
