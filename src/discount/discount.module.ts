import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount } from './discount.model';
@Module({
    imports: [SequelizeModule.forFeature([Discount])],
    // export it to use it outside this module
    exports: [SequelizeModule]
})
export class DiscountModule {}
