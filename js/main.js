/*capturas de id*/
const shopContent = document.querySelector("#shopContent");
const verCarrito = document.querySelector("#verCarrito");
const modalContainer = document.querySelector("#modal-container");
const cantidadCarrito = document.querySelector("#cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const getProducts = async ()=>{
    const respuesta = await fetch("productos.json");
    const data = await respuesta.json();

    data.forEach((product)=>{
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src = "${product.img}">
            <h3>${product.nombre}</h3>
            <p class="price">$ ${product.precio}</p>
        
        `;
    
        shopContent.append(content);
    
        let comprar = document.createElement('button');
        comprar.innerText = "Comprar"
        comprar.className = "comprar";
    
        content.append(comprar);

        comprar.addEventListener("click", ()=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto agregado con exito',
                showConfirmButton: false,
                timer: 1500
              })
        })
    
        comprar.addEventListener("click", ()=>{
            /*validacion de repeticion de un producto en el carrito*/
            const repeat = carrito.some((repeatProduct)=> repeatProduct.id === product.id);
            console.log(repeat);
            /*condicion*/
            if (repeat) {
                carrito.map((prod)=>{
                    if(prod.id === product.id){
                        prod.cantidad++;
                    }
                });
            }else{
                carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad:product.cantidad,
    
            });
            
            console.log(carrito);
            carritoCounter();
            guardadoLs();/*llamamos a la funcion que guarda en el LS*/
            }
        });
    
    });
    
};
getProducts()


//Guardamos los elementos del carrito al LS
 const guardadoLs = ()=>{
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Recuperar elementos del LS 
//JSON.parse(localStorage.getItem("carrito"));
