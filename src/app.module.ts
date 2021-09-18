import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DiscountModule } from './discount/discount.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category/category.model';
import { Discount } from './discount/discount.model';
import { Product } from './product/product.model';
import { User } from './user/user.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'zarinpal',
      models: [User, Product, Discount, Category],
    }),
    UserModule, DiscountModule, CategoryModule, ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
