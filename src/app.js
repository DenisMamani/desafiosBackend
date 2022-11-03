import express from 'express';
import productsRouter from "./routes/products.router.js"
import __dirname from './utils.js';

const app = express();

app.use(express.static(__dirname+"/public"));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));//parsea datos mas complejos de la url
app.use("/api/productos",productsRouter);
app.listen(8080, ()=>console.log("Listening"))
