import express from "express"
import { connectMongoDB } from "./config/mongodb.config.js"
import authRouter from "./routes/auth.router.js"
import eventRouter from "./routes/event.router.js"
import galleryRouter from "./routes/gallery.router.js"
import productRouter from "./routes/product.router.js"
import orderRouter from "./routes/order.router.js"
import cors from "cors"
import { errorHandlerMiddleware } from "./middlewares/error.middleware.js"

connectMongoDB()

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("API funcionando 🚀")
})

/*
ROUTERS
*/
app.use("/api", authRouter)
app.use("/api", eventRouter)
app.use("/api", galleryRouter)
app.use("/api", productRouter)
app.use("/api", orderRouter)

/*
SERVER
*/

const PORT = 8080


app.use(errorHandlerMiddleware)
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`)
})