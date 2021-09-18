import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
@Module({
    imports: [SequelizeModule.forFeature([Category])],
    // export it to use it outside this module
    exports: [SequelizeModule]
})
export class CategoryModule {}
