import express from "express"
import __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js"
import Contenedor from "./Contenedor/contenedor.js";
import { Server } from "socket.io";
import containerSQL from "./Contenedor/containerSQL.js";
import sqliteOptions from "./dbs/knex.js";
import ChatContainer from "./Contenedor/chatContainer.js";
const app = express();
app.use(express.static(__dirname+"/public"));
app.set("views",__dirname+"/public");
app.set("view engine","ejs");
app.get("/",async(req,res)=>{
    res.render("index")
});
const productsService = new Contenedor();
app.use(express.json());
app.use("/api/productos",productsRouter);
const server = app.listen(8080, ()=>console.log("Listening"))
const io = new Server(server);

const productSQL = new containerSQL(sqliteOptions, "products")
const messagesSQL = new containerSQL(sqliteOptions, "messages")
const messages = []
app.get("/productos",async(req,res)=>{
    let productos = await productSQL.getAll();
res.render("productos",
{
    productos
}
)
});

app.get("/chat",(req,res)=>{
    res.render("chat");
})
const chatService = new ChatContainer();
io.on("connection", async socket=>{
    let productos = await productSQL.getAll()
    socket.emit("productos", await productSQL.getAll())

    socket.on("message", async data=>{
        await messagesSQL.addProduct(data);
        const messagesC = await messagesSQL.getAll();
        io.emit("logs",messagesC);
    })
    socket.emit("logs", await messagesSQL.getAll());
    socket.on("authenticated",data=>{
        socket.broadcast.emit("newUserConnected", data);
    })
})
