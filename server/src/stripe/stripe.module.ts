import { Stripe } from 'stripe';
import { Module, DynamicModule, Provider } from '@nestjs/common';
import { StripeService } from './services/stripe.service';
import { StripeController } from './controllers/stripe.controller';

@Module({})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config);
    const StripeProvider: Provider = {
      provide: 'STRIPE_CLIENT',
      useValue: stripe,
    };

    return {
      module: StripeModule,
      controllers: [StripeController],
      providers: [StripeProvider, StripeService],
      exports: [StripeProvider, StripeService],
      global: true,
    };
  }
}
