import { Router } from "express"; 
import Contenedor from "../Contenedor.js";
import uploader from "../services/upload.js";

const router = Router();

const contenedor = new Contenedor();
router.post("/",uploader.single("thumbnail"),async (req,res)=>{
    const thumbnail = req.protocol+"://"+req.hostname+":8080/thumbnail/"+req.file.filename
    let product = req.body;
    product.thumbnail = thumbnail;
    const result = await contenedor.save(product);
    res.send({status:"success", message:"Product added"});
})
router.get("/",async(req,res)=>{
    let result = await contenedor.getAll()
    res.send(result)
})
router.get("/:id",async(req,res)=>{
    let id = req.params.id
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
    let result = await contenedor.getById(id)
    res.send(result)
})
router.put("/:id",async(req,res)=>{//problemas al actualizar
    let id = req.params.id
    const newProduct = req.body.newProduct
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
    const oldProduct = await contenedor.getById(id)
    res.send({objetoAnterior:oldProduct,nuevoTituloObjeto:newProductTitle,nuevoPrecioObjeto:newProductPrice, nuevaPortadaObjeto: newProductThumbnail})
})
router.delete("/:id",async(req,res)=>{
    let id = req.params.id;
    if(isNaN(id)) return res.status(400).send({status:"error", error:"Invalid type"})
let result = await contenedor.deleteById(id)
    res.send(result)
})
export default router;  