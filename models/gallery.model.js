import mongoose from "mongoose";

        const gallerySchema = new mongoose.Schema({
        eventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

        name: { 
            type: String,
            required: true
        },

        pdfUrl: {
            type: String 
        }

    });

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;