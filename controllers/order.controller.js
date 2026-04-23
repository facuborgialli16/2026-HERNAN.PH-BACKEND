    import orderRepository from "../repositories/order.repository.js"
    import productRepository from "../repositories/product.repository.js"

    class OrderController {

    async create(request, response) {

            try {

                const { event_id } = request.params
                const { clientName, items } = request.body

                if (!items || items.length === 0) {
                    return response.json({
                        ok: false,
                        status: 400,
                        message: "Debes enviar items en la orden",
                        data: null
                    })
                }

                let total = 0
                const orderItems = []

                for (const item of items) {

                    const product = await productRepository.getById(item.productId)

                    if (!product) {
                        return response.json({
                            ok: false,
                            status: 404,
                            message: "Producto no encontrado",
                            data: null
                        })
                    }

                    const subtotal = product.price * item.quantity

                    total += subtotal

                    orderItems.push({
                        photoNumber: item.photoNumber,
                        productId: product._id,
                        quantity: item.quantity,
                        price: product.price
                    })

                }

                const order = await orderRepository.create({
                    eventId: event_id,
                    clientName,
                    items: orderItems,
                    total
                })

                response.json({
                    ok: true,
                    status: 201,
                    message: "Orden creada correctamente",
                    data: {
                        order
                    }
                })

            } catch (error) {

                response.json({
                    ok: false,
                    status: 500,
                    message: "Error interno del servidor",
                    data: null
                })

            }

        }

        async getByEv(request, response) {
        try {

            const { event_id } = request.params

            const orders = await orderRepository.getByEvent(event_id)

            response.json({
                ok: true,
                status: 200,
                message: "Ordenes obtenidas correctamente",
                data: {
                    orders
                }
            })

        } catch (error) {

            console.log(error)

            if (error.status) {
                return response.json({
                    ok: false,
                    status: error.status,
                    message: error.message,
                    data: null
                })
            }

            return response.json({
                ok: false,
                status: 500,
                message: "Error interno del servidor",
                data: null
            })

        }
    }

    }



    const orderController = new OrderController()

    export default orderController