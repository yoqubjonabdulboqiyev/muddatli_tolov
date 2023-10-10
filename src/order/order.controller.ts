import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Order } from './models/order.model';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }
  @ApiOperation({summary: 'order create'})
  @ApiResponse({status: 201, type: Order})
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @ApiOperation({summary: 'find all orders'})
  @ApiResponse({status: 201, type: [Order]})
  @UseGuards(JwtAuthGuard)
  @Get('all/:user_id')
  findAll(@Param('user_id') user_id: string) {
    return this.orderService.findAll(+user_id);
  }
  
  @ApiOperation({summary: 'find one'})
  @ApiResponse({status: 201, type: Order})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
