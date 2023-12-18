// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './auths/auths.module';
import { AppDataSource } from './Data-Source-Config/app-data-source';
import { FarmerHomeModule } from './farmer-home/farmer-home.module';
import { ProductListModule } from './product-list/product-list.module';
import { AddToCartModule } from './add-to-cart/add-to-cart.module';
import { ViewCartModule } from './view-cart/view-cart.module';
import { OrderHistoryModule } from './order-history/order-history.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CustomerReportModule } from './customer-report/customer-report.module';
import { CustomerIndividualReportModule } from './customer-individual-report/customer-individual-report.module';
import { CustomerReviewsModule } from './customer-reviews/customer-reviews.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { LogoutModule } from './logout/logout.module';
import { AppController } from './root.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // Type of your database
      host: '52.206.229.102', // Database host
      port: 5432,        // Database port
      username: 'postgres',  // Database username
      password: 'postgres',  // Database password
      database: 'farmtobasketnestjs', // Database name
      entities: ['dist/entity/**/*.js'], // Path to your entities (compiled)
      synchronize: false, // Set to true only in development
      migrations: ['dist/migration/**/*.js'],
      // Additional configuration...
    }), 
    AuthsModule, FarmerHomeModule, ProductListModule, AddToCartModule, ViewCartModule, OrderHistoryModule, CheckoutModule, CustomerReportModule, CustomerIndividualReportModule, CustomerReviewsModule, ProductDetailsModule, LogoutModule],
  controllers: [AppController],  
})
export class AppModule {}
