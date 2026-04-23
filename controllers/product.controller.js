import productRepository from "../repositories/product.repository.js"
import ServerError from "../helpers/error.helpers.js"

class ProductController {

    async create(request, response) {
        try {

            const { name, price } = request.body

            const product = await productRepository.create({
                name,
                price
            })

            response.json({
                ok: true,
                status: 201,
                message: "Producto creado correctamente",
                data: { product }
            })

        } catch (error) {

            return response.json({
                ok: false,
                status: 500,
                message: "Error interno del servidor",
                data: null
            })

        }
    }

    async getAll(request, response) {
        try {

            const products = await productRepository.getAll()

            response.json({
                ok: true,
                status: 200,
                message: "Productos obtenidos correctamente",
                data: { products }
            })

        } catch {

            response.json({
                ok: false,
                status: 500,
                message: "Error interno del servidor",
                data: null
            })

        }
    }

    async update(request, response) {
        try {
            const { product_id } = request.params
            const { name, price } = request.body
            const product = await productRepository.update(product_id, { name, price })
            response.json({ ok: true, status: 200, message: "Producto actualizado", data: { product } })
        } catch {
            response.json({ ok: false, status: 500, message: "Error interno del servidor", data: null })
        }
    }

    async delete(request, response) {
        try {
            const { product_id } = request.params
            await productRepository.delete(product_id)
            response.json({ ok: true, status: 200, message: "Producto eliminado", data: null })
        } catch {
            response.json({ ok: false, status: 500, message: "Error interno del servidor", data: null })
        }
    }

}

const productController = new ProductController()

export default productController