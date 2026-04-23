import Gallery from "../models/gallery.model.js"

class GalleryRepository {

    async create(data) {
        return await Gallery.create(data)
    }

    async getByEvent(eventId) {
        return await Gallery.find({ eventId })
    }

    async getById(galleryId) {
        return await Gallery.findById(galleryId)
    }

    async update(galleryId, data) {
        return await Gallery.findByIdAndUpdate(
            galleryId,
            data,
            { new: true }
        )
    }

    async delete(galleryId) {
        return await Gallery.findByIdAndDelete(galleryId)
    }

}

const galleryRepository = new GalleryRepository()

export default galleryRepository