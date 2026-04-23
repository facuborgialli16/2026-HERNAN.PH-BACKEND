import Order from "../models/order.model.js"

class OrderRepository {

    async create(data) {
        return await Order.create(data)
    }

    async getById(orderId) {
        return await Order.findById(orderId)
    }

    async getByEvent(eventId) {
        return await Order.find({ eventId })
    }

}

const orderRepository = new OrderRepository()

export default orderRepository