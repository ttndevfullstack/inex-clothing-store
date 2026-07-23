import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { ProductDto } from '../dto/ProductDto';
import { ProductUpdateDto } from '../dto/ProductUpdateDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async getProduct(id: string): Promise<Product | { message }> {
    try {
      const product = await this.productModel.findById(id);
      if (product) {
        return product;
      }
      return { message: 'Product not found!' };
    } catch (error: any) {
      console.error('Error:', error);
      throw new HttpException('Get product failed!', HttpStatus.FORBIDDEN);
    }
  }

  async getAllProduct(): Promise<Product[] | { message }> {
    try {
      const productList = await this.productModel.find().exec();
      if (productList) {
        return productList;
      }
      return { message: 'Product not found!' };
    } catch (error: any) {
      console.error('Error:', error);
      throw new HttpException('Register failed!', HttpStatus.FORBIDDEN);
    }
  }

  async addProduct(productDto: ProductDto): Promise<{ message }> {
    try {
      const newProduct = await this.productModel.create(productDto);
      if (newProduct) {
        return { message: 'Product is added' };
      }
      return { message: 'Product information is not exactly!' };
    } catch (error: any) {
      console.error('Error:', error);
      throw new HttpException('Add product failed!', HttpStatus.FORBIDDEN);
    }
  }

  async updateProduct(
    productId: string,
    productDto: ProductUpdateDto,
  ): Promise<{ message }> {
    try {
      const product = await this.productModel.findByIdAndUpdate(
        productId,
        productDto,
        { new: true },
      );
      if (!product) {
        return { message: 'Product is not found!' };
      }

      return { message: 'Product is updated' };
    } catch (error: any) {
      console.error('Error:', error);
      throw new HttpException('Update product failed!', HttpStatus.FORBIDDEN);
    }
  }

  async deleteProduct(productId: string): Promise<{ message }> {
    try {
      const product = await this.productModel.findById(productId);
      if (product) {
        await this.productModel.deleteOne({ _id: productId });
        return { message: 'Product is deleted' };
      }
      return { message: 'Product is not found!' };
    } catch (error: any) {
      console.error('Error:', error);
      throw new HttpException('Delete product failed!', HttpStatus.FORBIDDEN);
    }
  }
}
