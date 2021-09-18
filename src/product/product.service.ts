import { Injectable } from '@nestjs/common';
import { Category } from 'src/category/category.model';
import { Discount } from 'src/discount/discount.model';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    async list() {
        try {
            var products = await Product.findAll();
            return { status: true, statusCode: 200, message: 'ok', data: products, error: null };
        } catch (e) {
            console.log(e);
            return { status: false, statusCode: 500, message: 'nok', data: [], error: e };
        }
    }

    async checkDiscountForProduct(product_id: number, discount_title: string) {

        try {
            var discount = await Discount.findOne({
                where: { title: discount_title },
            })

            if (!discount)
                return { status: false, statusCode: 204, message: 'discount not found', data: [], error: null };


            var product = await Product.findOne({
                where: {
                    id: product_id,
                },
                include: [Category]
            });

            if (!product)
                return { status: false, statusCode: 204, message: 'product not found', data: [], error: null };

            if (product.discount_id == discount.id) {
                var priceAfterDiscount = (parseFloat(product.price) * (100 - discount.value)) / 100

                var result = {
                    priceBeforeDiscount: parseFloat(product.price),
                    priceAfterDiscount: priceAfterDiscount,
                    percent: discount.value
                }

                return { status: true, statusCode: 200, message: "discount applied", data: result, error: null }
            } else {

                if (product.category) {
                    var response = await this.checkDiscountForCategories(product.category_id, discount, product)
                    return response;

                }

                var result = {
                    priceBeforeDiscount: parseFloat(product.price),
                    priceAfterDiscount: parseFloat(product.price),
                    percent: 0
                }

                return { status: true, statusCode: 200, message: "discount is not for this product", data: result, error: null }
            }


        } catch (err) {
            return { status: false, statusCode: 500, message: 'nok', data: [], error: err };
        }

    }

    async checkDiscountForCategories(categoryId, discount, product) {
        var category = await Category.findOne({
            where: {
                id: categoryId,
            },
        })


        if (category) {
            if (category.discount_id == discount.id) {
                var priceAfterDiscount = (parseFloat(product.price) * (100 - discount.value)) / 100
                var result = {
                    priceBeforeDiscount: parseFloat(product.price),
                    priceAfterDiscount: priceAfterDiscount,
                    percent: discount.value
                }

                return { status: true, statusCode: 200, message: "discount applied", data: result, error: null }
            } else {
                return await this.checkDiscountForCategories(category.category_id, discount, product)
                // var parentCategory = await Category.findOne({
                //     where: { id: product.category.category_id }
                // })
                // if (parentCategory && parentCategory.discount_id == discount.id) {
                //     var priceAfterDiscount = (parseFloat(product.price) * (100 - discount.value)) / 100
                //     var result = {
                //         priceBeforeDiscount: parseFloat(product.price),
                //         priceAfterDiscount: priceAfterDiscount,
                //         percent: discount.value
                //     }
                //     return { status: true, statusCode: 200, message: "discount applied", data: result, error: null }
                // }
            }
        } else {

            var res = {
                priceBeforeDiscount: parseFloat(product.price),
                priceAfterDiscount: parseFloat(product.price),
                percent: 0
            }

            return { status: true, statusCode: 200, message: "discount is not for this product", data: res, error: null }
        }


    }

}
