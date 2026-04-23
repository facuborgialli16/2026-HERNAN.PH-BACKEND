import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({

    photoNumber: {
        type: Number,
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    }

})

const orderSchema = new mongoose.Schema({

    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },

    clientName: {
        type: String,
        required: true
    },

    items: [orderItemSchema],

    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "paid", "delivered"],
        default: "pending"
    }

}, { timestamps: true })

export default mongoose.model("Order", orderSchema)