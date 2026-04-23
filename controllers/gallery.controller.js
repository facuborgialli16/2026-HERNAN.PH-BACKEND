import galleryRepository from "../repositories/gallery.repository.js"
import ServerError from "../helpers/error.helpers.js"

class GalleryController {

    async create(request, response) {
        try {

            const { event_id } = request.params
            const { name, pdfUrl } = request.body

            if (!name || !pdfUrl) {
                throw new ServerError("Debes enviar name y pdfUrl", 400)
            }

            const gallery = await galleryRepository.create({
                name,
                pdfUrl,
                eventId: event_id
            })

            response.json({
                ok: true,
                status: 201,
                message: "Galeria creada correctamente",
                data: { gallery }
            })

        } catch (error) {

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


    async getByEvent(request, response) {
        try {

            const { event_id } = request.params

            const galleries = await galleryRepository.getByEvent(event_id)

            response.json({
                ok: true,
                status: 200,
                message: "Galerias obtenidas correctamente",
                data: { galleries }
            })

        } catch (error) {

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

            const { gallery_id } = request.params

            const gallery = await galleryRepository.getById(gallery_id)

            response.json({
                ok: true,
                status: 200,
                message: "Galeria obtenida correctamente",
                data: { gallery }
            })

        } catch (error) {

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


    async update(request, response) {
        try {

            const { gallery_id } = request.params
            const { name, pdfUrl } = request.body

            const gallery = await galleryRepository.update(gallery_id, {
                name,
                pdfUrl
            })

            response.json({
                ok: true,
                status: 200,
                message: "Galeria actualizada correctamente",
                data: { gallery }
            })

        } catch (error) {

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


    async delete(request, response) {
        try {

            const { gallery_id } = request.params

            await galleryRepository.delete(gallery_id)

            response.json({
                ok: true,
                status: 200,
                message: "Galeria eliminada correctamente",
                data: null
            })

        } catch (error) {

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

const galleryController = new GalleryController()

export default galleryController