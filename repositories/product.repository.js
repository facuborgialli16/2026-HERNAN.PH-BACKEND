import Product from "../models/product.model.js"

class ProductRepository {

    async create(data) {
        return await Product.create(data)
    }

    async getAll() {
        return await Product.find()
    }

    async getById(productId) {
        return await Product.findById(productId)
    }

    async update(productId, data) {
        return await Product.findByIdAndUpdate(
            productId,
            data,
            { new: true }
        )
    }

    async delete(productId) {
        return await Product.findByIdAndDelete(productId)
    }

}

const productRepository = new ProductRepository()

export default productRepository