import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Roles } from 'src/user/roles/roles.decorator';
import { Role } from 'src/user/roles/roles.enum';
import { ProductDto } from '../dto/ProductDto';
import { ProductService } from '../service/product.service';
import { ProductUpdateDto } from '../dto/ProductUpdateDto';

@Controller('api/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('list')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Roles(Role.Admin, Role.Manager)
  @Post('')
  addProduct(@Body() productDto: ProductDto) {
    return this.productService.addProduct(productDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() productDto: ProductUpdateDto) {
    return this.productService.updateProduct(id, productDto);
  }

  @Roles(Role.Admin, Role.Manager)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
