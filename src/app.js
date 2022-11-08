import express from 'express';
import productsRouter from "./routes/products.router.js"
import __dirname from './utils.js';
import Contenedor from './Contenedor.js';
const app = express();

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));//parsea datos mas complejos de la url
app.use("/api/productos",productsRouter);

app.set("views",__dirname+"/views");
app.set("view engine","ejs");
app.get("/",(req,res)=>{
    res.render("index")
});
const productsService = new Contenedor();
app.get("/productos",async(req,res)=>{
    let productos = await productsService.getAll()
    let productosArray = productos.products
res.render("productos",
{
    productosArray
}
)
});

app.listen(8080, ()=>console.log("Listening"))
