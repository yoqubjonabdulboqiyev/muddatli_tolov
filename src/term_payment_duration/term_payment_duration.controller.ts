import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TermPaymentDurationService } from './term_payment_duration.service';
import { CreateTermPaymentDurationDto } from './dto/create-term_payment_duration.dto';
import { UpdateTermPaymentDurationDto } from './dto/update-term_payment_duration.dto';

@Controller('term-payment-duration')
export class TermPaymentDurationController {
  constructor(private readonly termPaymentDurationService: TermPaymentDurationService) {}

  @Post()
  create(@Body() createTermPaymentDurationDto: CreateTermPaymentDurationDto) {
    return this.termPaymentDurationService.create(createTermPaymentDurationDto);
  }

  @Get()
  findAll() {
    return this.termPaymentDurationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termPaymentDurationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermPaymentDurationDto: UpdateTermPaymentDurationDto) {
    return this.termPaymentDurationService.update(+id, updateTermPaymentDurationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termPaymentDurationService.remove(+id);
  }
}
