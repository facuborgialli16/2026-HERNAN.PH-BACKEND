import eventRepository from "../repositories/event.repository.js"
import ServerError from "../helpers/error.helpers.js"

class EventController {

    async create(request, response) {
        try {

            const event = await eventRepository.create(request.body)

            response.json({
                ok: true,
                status: 201,
                message: "Evento creado correctamente",
                data: {
                    event
                }
            })

        }
        catch (error) {

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


    async getEvents(request, response) {
        try {

            const events = await eventRepository.getAll()

            response.json({
                ok: true,
                status: 200,
                message: "Eventos obtenidos correctamente",
                data: {
                    events
                }
            })

        }
        catch (error) {

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


    async getById(request, response) {
        try {

            const { event_id } = request.params

            const event = await eventRepository.getById(event_id)

            if (!event) {
                throw new ServerError("Evento no encontrado", 404)
            }

            response.json({
                ok: true,
                status: 200,
                message: "Evento encontrado",
                data: {
                    event
                }
            })

        }
        catch (error) {

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


    async getByCode(request, response) {
        try {
            const { code } = request.params
            const event = await eventRepository.getByCode(code)
            if (!event) { throw new ServerError("Codigo de evento invalido", 404) }
            response.json({ ok: true, status: 200, message: "Evento encontrado", data: { event } })
        } catch (error) {
            response.json({ ok: false, status: 500, message: "Error interno del servidor", data: null })
        }
    }

    async delete(request, response) {
        try {
            const { event_id } = request.params
            await eventRepository.delete(event_id)
            response.json({ ok: true, status: 200, message: "Evento eliminado correctamente", data: null })
        } catch (error) {
            response.json({ ok: false, status: 500, message: "Error interno del servidor", data: null })
        }
    }

}

const eventController = new EventController()

export default eventController