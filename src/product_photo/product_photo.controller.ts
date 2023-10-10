import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductPhotoService } from './product_photo.service';
import { CreateProductPhotoDto } from './dto/create-product_photo.dto';
import { UpdateProductPhotoDto } from './dto/update-product_photo.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Product } from 'src/product/models/product.model';
import { Photo } from './models/product_photo.model';

@Controller('product-photo')
export class ProductPhotoController {
  constructor(private readonly productPhotoService: ProductPhotoService) { }

  @ApiOperation({ summary: 'create Product photo' })
  @ApiResponse({ status: 201, type: Photo })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductPhotoDto: CreateProductPhotoDto) {
    return this.productPhotoService.create(createProductPhotoDto);
  }

  @ApiOperation({summary: 'find all photo'})
  @ApiResponse({status: 201, type: [Photo]})
  @Get('all/:product_id')
  findAll(@Param('product_id') product_id: string) {
    return this.productPhotoService.findAll(+product_id);
  }

  @ApiOperation({summary: 'find one photo'})
  @ApiResponse({status: 201, type: Photo})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPhotoService.findOne(+id);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: Photo})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPhotoService.remove(+id);
  }
}
