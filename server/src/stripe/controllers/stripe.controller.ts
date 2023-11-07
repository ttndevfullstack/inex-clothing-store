import { Body, Controller, Post, Res } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';
import { CartProductDto } from '../dto/cartProductDto';
import { Response } from 'express';

@Controller('api/stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Post('payment')
  createCheckoutSession(
    @Res() response: Response,
    @Body() cartProducts: CartProductDto[],
  ) {
    return this.stripeService.createCheckoutSession(response, cartProducts);
  }
}
