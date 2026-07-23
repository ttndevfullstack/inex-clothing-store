import Stripe from 'stripe';
import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { Response } from 'express';
import { CartProductDto } from '../dto/cartProductDto';

@Injectable()
export class StripeService {
  constructor(@Inject('STRIPE_CLIENT') private stripe: Stripe) {}

  async createCheckoutSession(
    response: Response,
    cartProducts: CartProductDto[],
  ) {
    try {
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        cartProducts.map((product) => {
          const unitAmount = Number(product.price.replace('$', '')) * 100;
          const image = String(
            product.image[0][Object.keys(product.image[0])[0]],
          );

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.name,
                images: [image],
              },
              unit_amount: unitAmount,
            },
            quantity: product.quantity,
            // metadata: {
            //   color: product.color,
            //   size: product.size,
            //   quantity: product.quantity,
            // },
          };
        });

      const params: Stripe.Checkout.SessionCreateParams = {
        mode: 'payment' as Stripe.Checkout.SessionCreateParams.Mode,
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1NxPXqH49Gwp74XhWG48Kk1U' },
          { shipping_rate: 'shr_1NxPcRH49Gwp74XhVMDDm5n5' },
          { shipping_rate: 'shr_1NxPdpH49Gwp74Xhf3VdyRyK' },
        ],
        line_items: lineItems,
        success_url: `${process.env.CLIENT_URL}/payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/payment/canceled`,
      };

      // Create Checkout Sessions from body params.
      const session = await this.stripe.checkout.sessions.create(params);

      return response.status(HttpStatus.OK).json(session);
    } catch (err: any) {
      response.status(err.statusCode || 500).json(err.message);
    }
  }
}
