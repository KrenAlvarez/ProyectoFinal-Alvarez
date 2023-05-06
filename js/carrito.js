const pintarCarrito=()=>{


    modalContainer.innerHTML ="";
    modalContainer.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h2 class="modal-header-title">Carrito</h2>

    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h2");
    modalbutton.innerText = "❌";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", ()=>{
        modalContainer.style.display="none";
    });
    modalHeader.append(modalbutton);

    /*array del carrito*/
    carrito.forEach((product)=>{
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content"
        carritoContent.innerHTML = `
            <img src= "${product.img}">
            <h3>${product.nombre} </h3>
            <p>$ ${product.precio} </p>
            <span class="icon-minus"></span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="icon-plus"></span>
            <p>Total: $ ${product.cantidad * product.precio}</p>
        
        `;
        modalContainer.append(carritoContent);

        //span suma y resta⬇⬇⬇
        let restar = carritoContent.querySelector(".icon-minus") //capturo el span   
        restar.addEventListener("click", ()=>{
            if(product.cantidad !== 1){  
            product.cantidad--;
            }
            guardadoLs();//!important llamar a las funciones
            pintarCarrito();
        });//escuchador de evento sobre el span restar

        let sumar = carritoContent.querySelector(".icon-plus")
        sumar.addEventListener("click", ()=>{
            product.cantidad++
            guardadoLs();//!important llamar a las funciones 
            pintarCarrito();
        });


        /*ver cuanto productos tiene el carrito(objetos dentro del arry )*/
        console.log(carrito.length);

        //Poder eliminar productos del carrito
        let eliminar = document.createElement("span");
        eliminar.innerText = "";
        eliminar.className = "icon-bin";
        carritoContent.append(eliminar);

        eliminar.addEventListener("click", eliminarProducto);
    });

    /*Total de la compra*/
    const total = carrito.reduce((acc, el)=>acc+el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div")
    totalBuying.className = "total-content"
    totalBuying.innerHTML =`Total a pagar: $ ${total}`;
    modalContainer.append(totalBuying)
};

verCarrito.addEventListener("click", pintarCarrito);

/*funcion eliminar elemento del carrito*/
const eliminarProducto = ()=>{
    const foundId = carrito.find((element)=> element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    guardadoLs();//seteado del carrito una vez eliminado el product
    pintarCarrito();
};

const carritoCounter = ()=>{
    cantidadCarrito.style.display="block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength))

    cantidadCarrito.innerText= JSON.parse(localStorage.getItem("carritoLength"));

  
};

carritoCounter();