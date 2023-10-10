import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-all.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Product } from './models/product.model';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }
  
  @ApiOperation({summary: 'create Product'})
  @ApiResponse({status: 201, type: Product})
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({summary: 'find all  Product'})
  @ApiResponse({status: 201, type: [Product]})
  @Get()
  findAll(@Query() findProductDto: FindProductDto) {
    return this.productService.findAll(findProductDto);
  }

  @ApiOperation({summary: 'find one Product'})
  @ApiResponse({status: 201, type: Product})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @ApiOperation({summary: 'update'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @ApiOperation({summary: 'delete'})
  @ApiResponse({status: 201, type: String})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
