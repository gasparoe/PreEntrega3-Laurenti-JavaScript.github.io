

let carritoLocal;

//CLASE PRODUCTO
class Producto {
    constructor(id, nombre, precio, img, descripcion) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1;
        this.descripcion = descripcion
    }
}

//LISTA DE PRODUCTOS
const pelota = new Producto(1, "Pelota Oficial", 25500, "./assets/pelota.jpeg", "Pelota adidas oficial con la cual se jugó el mundial Qatar 2022.");
const camisetaTitular = new Producto(2, "Camiseta Titular 2022", 23650, "./assets/camiseta.webp", "Camiseta oficial titular de la Seleccion Argentina 2022");
const camisetaAlternativa = new Producto(3, "Camiseta Alternativa 2022", 21220, "./assets/camisetaalternativa.jpeg", "Camiseta oficial alternativa de la Seleccion Argentina 2022");
const buzo = new Producto(4, "Buzo Oficial", 31500, "./assets/buzo.webp", "Buzo oficial de la Seleccion Argentina 2022");
const campera = new Producto(5, "Campera Oficial", 43200, "./assets/campera.jpeg", "Campera oficial de la Seleccion Argentina 2022");
const pantalonCorto = new Producto(6, "Pantalon Corto 2022", 14750, "./assets/pantaloncorto.jpeg", "Pantalon oficial titular de la Seleccion Argentina 2022");


const productos = [pelota, camisetaTitular, camisetaAlternativa, buzo, campera, pantalonCorto];

let carrito = [];

//RECUPERO EL CARRITO DEL LOCALSTORAGE
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    carritoLocal = true;
}else{
    carritoLocal = false;
}

const contenedorProductos = document.getElementById("cardProductos");

//FUNCION MOSTRAR PRODUCTOS A LA VENTA
const mostrarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col", "col-12", "col-md-4");
        card.innerHTML = `
        <div class="card m-2">
            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h4 class="card-title">${producto.nombre}</h4>
                <h5 class="card-title">$${producto.precio}</h5>
                <p class="card-text">"${producto.descripcion}"</p>
                <button type="button" class="btn botones2" id="botonCarrito${producto.id}">Agregar al Carrito</button>
            </div>
        </div>`

        contenedorProductos.appendChild(card);

        const botonCarrito = document.getElementById(`botonCarrito${producto.id}`);
        botonCarrito.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
}

mostrarProductos();

//FUNCION AGREGAR AL CARRITO
const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    mostrarCarrito();
}


const btnVerCarrito = document.getElementById("btnVerCarrito");
btnVerCarrito.addEventListener("click", () => {
    mostrarCarrito();
});


const cardCarrito = document.getElementById("cardCarrito");

const tituloCarrito = document.getElementById("tituloCarrito");

//FUNCION MOSTRAR CARRITO
const mostrarCarrito = () => {
    tituloCarrito.innerText = `CARRITO DE COMPRAS (${carrito.length})`;
    cardCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col", "col-12", "col-md-4");
        card.innerHTML = `
        <div class="card m-2">
            <img src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h4 class="card-title">${producto.nombre}</h4>
                <h5 class="card-title">$${producto.precio}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <h4 class="cantidad">${producto.cantidad} UNIDADES</h4>
                <button type="button" class="btn botones2" id="eliminar${producto.id}">Eliminar Producto</button>
            </div>
        </div>`

        cardCarrito.appendChild(card);

        const btnEliminar = document.getElementById(`eliminar${producto.id}`);
        btnEliminar.addEventListener("click", () => {
            eliminarDelCarrito();
        });

    });
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


//FUNCION ELIMINAR PRODUCTO DEL CARRITO
const eliminarDelCarrito = (id) => {
    const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
}


const btnVaciarCarrito = document.getElementById("btnVaciarCarrito")
btnVaciarCarrito.addEventListener("click", () => {
    vaciarCarrito();
});


//FUNCION VACIAR CARRITO
const vaciarCarrito = () => {
    carrito = [];
    mostrarCarrito();
}


const costoTotal = document.getElementById("costoTotal");


//FUNCION CALCULAR COSTO TOTAL
const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
    });
    costoTotal.innerHTML = `${totalCompra}`;
}

//MUESTRO EL CARRITO LUEGO DE CARGAR TODOS LOS PRODUCTOS EN CASO DE QUE HAYA CARRITO LOCAL
if(carritoLocal){
    mostrarCarrito();
}