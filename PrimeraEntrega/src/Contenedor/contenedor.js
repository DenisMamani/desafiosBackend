import fs from "fs";
import path from "path";
import __dirname from "../utils.js";
const pathToFile = __dirname + "/files/products.json";
const fechaHora = () => {
    const fh = new Date();
    const day = fh.getDate()
    const month = fh.getMonth()
    const year = fh.getFullYear()
    return `${day}/${month}/${year}`
}
class Contenedor {
    save = async (product) => {
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let productos = JSON.parse(data);
                let id = productos.length + 1;
                product.id = id;
                product.timestamp = fechaHora()
                productos.push(product)
                await fs.promises.writeFile(pathToFile, JSON.stringify(productos, null, 2))
                return {
                    status: "success",
                    message: "Product created",
                }
            } 
                product.id = 1;
                product.timestamp = fechaHora()
                await fs.promises.writeFile(pathToFile, JSON.stringify([product], null, 2));
                return {
                    status: "success",
                    message: "Product created",
                }
            
        } catch (error) {
            return {
                status: "Error",
                message: error.message
            }
        }
    }
    readFile = async() =>{
        const data = await fs.promises.readFile(pathToFile, "utf-8");
        return JSON.parse(data);
    }
    exists = async(id) =>{
        const carts = await this.readFile();
        return carts.some(cart => cart.id === id);
    }
    getAll = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, "utf-8");
                let products = JSON.parse(data);
                return {
                    status: "success",
                    products: products,
                };
            } else {
                return {
                    status: "error",
                    message: "No products found",
                }
            }
        } catch (error) {
            return {
                status: "error",
                message: error.message,
            };
        }
    }
    getById = async (id) => {
        if (!id) {
            return {
                status: "error",
                message: "ID is required",
            };
        }
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, "utf-8");
            let products = JSON.parse(data);
            let product = products.find((product) => product.id == id);
            if (product) {
                return {
                    status: "success",
                    product: product,
                };
            } else {
                return {
                    status: "error",
                    message: "Product not found",
                };
            }
        } else {
            return {
                status: "error",
                message: "Product not found"
            }
        }
    }
    deleteById = async (id) => {
        if (!id) {
            return {
                status: "error",
                message: "ID is required",
            };
        }
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, "utf-8")
            let products = JSON.parse(data)
            let newProducts = products.filter((product) => product.id != id)
            await fs.promises.writeFile(
                pathToFile,
                JSON.stringify(newProducts, null, 2)
            );
            return {
                status: "success",
                message: "Product deleted",
            }
        } else {
            return {
                status: "error",
                message: "No prodcuts found",
            }
        }
    }
     update = async (product, id) => {
        const allProducts = await this.getAll()
        const products = allProducts.products

        let newProduct = products.map(element => {
            if (element.id == id) {
                return {
                    ...product,
                    id: id,
                }
            } else {
                return element
            }
        })
        newProduct = JSON.stringify(newProduct, null, "\t")
        await fs.promises.writeFile(pathToFile, newProduct)
    }
    deleteAll = async () => {
        try {
            if (fs.existsSync(pathToFile)) {
                await fs.promises.unlink(pathToFile)
            } else {
                return {
                    status: "error",
                    message: "No products found",
                }
            }
        } catch (error) {
            return {
                status: "error",
                message: error.message,
            };
        }
    }
}
export default Contenedor