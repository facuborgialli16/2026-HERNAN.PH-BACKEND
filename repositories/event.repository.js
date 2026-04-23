import Event from "../models/event.model.js"
import crypto from "crypto"

class EventRepository {

    async create(data) {

        // Generar siempre un código único para evitar conflictos con el índice de la base de datos
        // Si es público, el código simplemente no se usa en el frontend
        data.code = crypto.randomBytes(4).toString("hex")

        return await Event.create(data)

    }

    async getAll() {
        return await Event.find()
    }

    async getById(id) {
        return await Event.findById(id)
    }

    async getByCode(code) {
        return await Event.findOne({ code })
    }

    async delete(id) {
        return await Event.findByIdAndDelete(id)
    }

}
const eventRepository = new EventRepository()

export default eventRepository