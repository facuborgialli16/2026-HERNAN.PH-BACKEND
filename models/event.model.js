import mongoose from "mongoose";

    const eventSchema = new mongoose.Schema({
      name: { type: String, required: true }, // Nombre del evento

      code: { 
        type: String,
        unique: true,
        sparse: true
      }, // Código para acceder si es privado

      type: { 
        type: String,
        enum: ["school", "birthday", "wedding", "sport", "other"],
        required: true
      },

      visibility: {
        type: String,
        enum: ["public", "private"],
        default: "private"
      },

      date: { type: Date },

      createdAt: {
        type: Date,
        default: Date.now
      }
  });

const Event = mongoose.model("Event", eventSchema);

export default Event;