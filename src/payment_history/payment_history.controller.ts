import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { PaymentHistoryService } from './payment_history.service';
import { CreatePaymentHistoryDto } from './dto/create-payment_history.dto';
import { UpdatePaymentHistoryDto } from './dto/update-payment_history.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentHistory } from './models/payment_history.model';

@Controller('payment-history')
export class PaymentHistoryController {
  constructor(private readonly paymentHistoryService: PaymentHistoryService) { }

  @ApiOperation({summary: 'create payment'})
  @ApiResponse({status: 201, type: PaymentHistory})
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createPaymentHistoryDto: CreatePaymentHistoryDto) {
    return this.paymentHistoryService.create(createPaymentHistoryDto);
  }

  @ApiOperation({summary: 'find all payments'})
  @ApiResponse({status: 201, type: [PaymentHistory]})
  @UseGuards(JwtAuthGuard)
  @Get('all/:order_id')
  findAll(@Param('order_id') order_id: string) {
    return this.paymentHistoryService.findAll(+order_id);
  }

  @ApiOperation({summary: 'find one payment'})
  @ApiResponse({status: 201, type: PaymentHistory})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentHistoryService.findOne(+id);
  }

  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updatePaymentHistoryDto: UpdatePaymentHistoryDto) {
    return this.paymentHistoryService.update(+id, updatePaymentHistoryDto);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentHistoryService.remove(+id);
  }
}
