var Productos = [];
//clase producto
class Producto {
  constructor(id, nombre, precio, imgUrl, contador) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.imgUrl = imgUrl;
    this.contador = 1;
  }
}

//Carrito
var Carrito = [];

function cargarProductos() {
  //anadir productos al arreglo de productos
  Productos.push(
    new Producto(1, "MERIDA REACTO 6000 2023", 2694, "./asset/img/540.webp")
  );
  Productos.push(
    new Producto(2, "MERIDA SCULTURA TEAM-E", 7194, "./asset/img/540_1.webp")
  );
  Productos.push(
    new Producto(3, "MERIDA E-ONE FORTY 500 ", 4074, "./asset/img/540_2.webp")
  );
  Productos.push(
    new Producto(4, "SCOTT FOIL RC 30 2022", 4004, "./asset/img/540_3.webp")
  );

  //div cargar productos
  const cargarProd = document.getElementById("cargarProductos");
  //contador para ver si son multiplos de 3 ya  que comienza en 0
  let count = 0;
  //crear fila
  let row = document.createElement("div");
  //asignar clase a la fila
  row.className = "row";
  //recorrere arreglo
  Productos.forEach((producto) => {
    // Crear el elemento del producto
    const col = document.createElement("div");
    col.className = "col-lg-3 col-md-4 col-sm-6 mb-4";

    col.innerHTML = `
      <div class="card">
        <img src="${producto.imgUrl}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text precio">$${producto.precio}</p>
           <button class="btn btn-primary" type="button" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>
      </div>
    `;

    // Añadir la columna a la fila
    row.appendChild(col);
    count++;
  });

  // Añadir la última fila si existe
  if (count > 0) {
    cargarProd.appendChild(row);
  }
}
cargarProductos();
function cargarCarrito() {
  var total = 0;
  var cargarCarrito = document.getElementById("cargarCarrito");
  cargarCarrito.innerHTML = ""; // Limpiar el contenido antes de recargarlo
  if (Carrito.length > 0) {
    Carrito.forEach((item) => {
      total += item.precio * item.contador;
      cargarCarrito.innerHTML += `
            <li class="fs-6">${item.nombre} - Cantidad: ${item.contador}</li>
`;
    });
    cargarCarrito.innerHTML += `
    <li class="fs-4">Total a pagar $${total} USD</li>
   <li> 
   <a class="btn btn-success" id="ProcesarPago">Finalizar Pago</a>
   </li>`;
    var ProcesarPago = document.getElementById("ProcesarPago");
    ProcesarPago.addEventListener("click", (e) => {
      e.preventDefault();
      Swal.fire({
        title: "Procesando",
        text: "Estamos procesando tu pago. Por favor, revisa tu correo electrónico para la notificación de confirmación. ",
        icon: "success",
        confirmButtonText: "Ok",
      });
    });
  } else {
    cargarCarrito.innerHTML = "<li>No hay productos en el carrito</li>";
  }
}
cargarCarrito();
function agregarAlCarrito(id) {
  // Encuentra el producto por ID
  const producto = Productos.find((p) => p.id === id);
  const indice = Productos.findIndex((p) => p.id === producto.id);
  if (indice > -1) {
    // Si el producto ya existe en el carrito, aumenta la cantidad
    const item = Carrito.find((i) => i.id === id);
    if (item) {
      item.contador += 1;
      cargarCarrito(producto);
    } else {
      // Si no existe, agrega el producto al carrito
      Carrito.push(producto);
      cargarCarrito(producto);
    }
  }
}
