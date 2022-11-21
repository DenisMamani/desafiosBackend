import express from "express"
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js"
import Contenedor from "./Contenedor/contenedor.js";
import { Server } from "socket.io";
import cartRouter from "./routes/cart.router.js"
const app = express();
app.use(express.static(__dirname+"/public"));
app.use(express.urlencoded({ extended:true }))
app.set("views",__dirname+"/public");
app.set("view engine","ejs");
app.get("/",async(req,res)=>{
    res.render("index")
});
const productsService = new Contenedor();
app.use(express.json());
app.use("/api/productos",productsRouter);
const server = app.listen(8080, ()=>console.log("Escuchando"))
const io = new Server(server);
const messages = []
app.get("/productos",async(req,res)=>{
    let productos = await productsService.getAll()
    let productosArray = productos.products
res.render("productos",
{
    productosArray
}
)
});

app.get("/chat",(req,res)=>{
    res.render("chat");
})
io.on("connection", async socket=>{
    let productos = await productsService.getAll()
    let productosArray = productos.products
    socket.emit("productos", productosArray)
    socket.emit("logs",messages);
    socket.on("message", async data=>{
        messages.push(data);
        io.emit("logs",messages);
    })
    socket.on("authenticated",data=>{
        socket.broadcast.emit("newUserConnected", data);
    })
})
app.use("/api/cart",cartRouter)
