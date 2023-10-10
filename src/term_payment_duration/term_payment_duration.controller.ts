import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TermPaymentDurationService } from './term_payment_duration.service';
import { CreateTermPaymentDurationDto } from './dto/create-term_payment_duration.dto';
import { UpdateTermPaymentDurationDto } from './dto/update-term_payment_duration.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TermPaymentDuration } from './models/term_payment_duration.model';

@Controller('duration')
export class TermPaymentDurationController {
  constructor(private readonly termPaymentDurationService: TermPaymentDurationService) {}

  @ApiOperation({summary: 'create term payment duration'})
  @ApiResponse({status: 201, type: TermPaymentDuration})
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTermPaymentDurationDto: CreateTermPaymentDurationDto) {
    return this.termPaymentDurationService.create(createTermPaymentDurationDto);
  }
  @ApiOperation({summary: 'find one'})
  @ApiResponse({status: 201, type: TermPaymentDuration})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termPaymentDurationService.findOne(+id);
  }

  @ApiOperation({summary: 'find all terms '})
  @ApiResponse({status: 201, type: [TermPaymentDuration]})
  @Get('all/:product_id')
  findAll(@Param('product_id') product_id: string) {
    return this.termPaymentDurationService.findAll(+product_id);
  }

  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTermPaymentDurationDto: UpdateTermPaymentDurationDto) {
    return this.termPaymentDurationService.update(+id, updateTermPaymentDurationDto);
  }
  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termPaymentDurationService.remove(+id);
  }
}
