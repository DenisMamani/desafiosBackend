import express from "express"
import productsRouter from "./routes/products.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express()
const PORT = process.env.PORT ||8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/api/products",productsRouter)
app.use("/api/cart",cartRouter)

const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`))