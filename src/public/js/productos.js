const socket = io()
const productTable = document.getElementById("productTable")
socket.on("productos", data =>{
    let product = ""
    data.forEach(producto=>{
        product += `<tr>
        <td class="style borde">${producto.title}</td>
        <td class="style borde">${producto.price} </p></td>
        <td class="borde"><img class="img" src= ${producto.thumbnail} alt=""></td>
        </tr>`
        productTable.innerHTML = product
    })
})