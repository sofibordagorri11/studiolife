document.addEventListener("DOMContentLoaded", () => {
  const botonesCategoria = document.querySelectorAll("[data-categoria]");
  const selectServicio = document.getElementById("servicio");
  const resultadoPrecio = document.getElementById("resultado-precio");
  const botonAgregar = document.getElementById("agregar-carrito");
  const carritoContenedor = document.getElementById("carrito");

  if (
    !botonesCategoria.length ||
    !selectServicio ||
    !resultadoPrecio ||
    !botonAgregar ||
    !carritoContenedor
  ) {
    console.warn("No se encontró completa la sección de presupuesto en el HTML.");
    return;
  }

  const servicios = {
    manicuria: {
      "manicura-rusa": {
        nombre: "Manicura Rusa",
        precio: 350
      },
      "soft-gel": {
        nombre: "Soft Gel",
        precio: 1000
      },
      "base-rubber-kapping": {
        nombre: "Base rubber / Kapping",
        precio: 700
      },
      "esmaltado-semipermanente": {
        nombre: "Esmaltado semipermanente",
        precio: 550
      },
      "estetica-de-pies": {
        nombre: "Estética de pies",
        precio: 550
      },
      "pedicura": {
        nombre: "Pedicura",
        precio: 890
      }
    },

    barberia: {
      "corte": {
        nombre: "Corte",
        precio: 400
      },
      "barba": {
        nombre: "Barba",
        precio: 200
      },
      "cejas": {
        nombre: "Cejas",
        precio: 150
      },
      "combo": {
        nombre: "Combo",
        precio: 490
      }
    },

    peluqueria: {
      "brushing": {
        nombre: "Brushing",
        precio: null
      },
      "corte": {
        nombre: "Corte",
        precio: null
      },
      "lavado-brushing": {
        nombre: "Lavado + Brushing",
        precio: null
      },
      "lavado-mascara-brushing": {
        nombre: "Lavado + Máscara + Brushing",
        precio: null
      },
      "tinta-completa": {
        nombre: "Tinta completa",
        precio: null
      },
      "tinta-raices": {
        nombre: "Tinta raíces",
        precio: null
      },
      "cortina-color": {
        nombre: "Cortina de color",
        precio: null
      },
      "tinta-fantasia": {
        nombre: "Tinta fantasía",
        precio: null
      },
      "aplicacion-tintas": {
        nombre: "Aplicación de tintas",
        precio: null
      },
      "balayage": {
        nombre: "Balayage",
        precio: null
      },
      "mechas-papel": {
        nombre: "Mechas con papel",
        precio: null
      },
      "mechas-gorra": {
        nombre: "Mechas con gorra",
        precio: null
      },
      "botox-capilar": {
        nombre: "Botox capilar",
        precio: null
      },
      "celulas-madres": {
        nombre: "Células madres",
        precio: null
      },
      "hidratacion-cadeviu": {
        nombre: "Hidratación 4 pasos Cadeviu",
        precio: null
      },
      "progresivo-brasil-cacau": {
        nombre: "Progresivo Brasil Cacau",
        precio: null
      }
    }
  };

  let categoriaActual = "manicuria";
  let carrito = [];

  function limpiarBotonesActivos() {
    botonesCategoria.forEach((boton) => {
      boton.classList.remove("activo");
    });
  }

  function cargarServicios(categoria) {
    categoriaActual = categoria;
    selectServicio.innerHTML = '<option value="">Seleccioná un servicio</option>';
    resultadoPrecio.textContent = "";

    const categoriaServicios = servicios[categoria];

    for (const key in categoriaServicios) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = categoriaServicios[key].nombre;
      selectServicio.appendChild(option);
    }
  }

  function mostrarResultado() {
    const valorSeleccionado = selectServicio.value;

    if (!valorSeleccionado) {
      resultadoPrecio.textContent = "";
      return;
    }

    const servicio = servicios[categoriaActual][valorSeleccionado];

    if (!servicio) {
      resultadoPrecio.textContent = "";
      return;
    }

    if (categoriaActual === "peluqueria") {
      resultadoPrecio.textContent =
        `${servicio.nombre}: precio a consultar según largo, volumen, cantidad y técnica.`;
    } else {
      resultadoPrecio.textContent = `${servicio.nombre}: $${servicio.precio}`;
    }
  }

  function mostrarCarrito() {
    if (carrito.length === 0) {
      carritoContenedor.innerHTML = '<p class="mb-0">Tu selección aparecerá acá 👇</p>';
      return;
    }

    let total = 0;
    carritoContenedor.innerHTML = "<h4 class='mb-3'>Tu carrito</h4>";

    carrito.forEach((item, index) => {
      const precioTexto =
        item.precio === null
          ? "Precio a consultar"
          : `$${item.precio}`;

      if (item.precio !== null) {
        total += item.precio;
      }

      carritoContenedor.innerHTML += `
        <div class="d-flex justify-content-between align-items-center border-bottom py-2 gap-2">
          <span>${item.nombre} - ${precioTexto}</span>
          <button type="button" class="btn btn-sm btn-outline-danger" onclick="eliminarServicio(${index})">
            ✕
          </button>
        </div>
      `;
    });

    carritoContenedor.innerHTML += `
      <div class="mt-3">
        <h5 class="mb-0">Total estimado: $${total}</h5>
      </div>
    `;
  }

  botonesCategoria.forEach((boton) => {
    boton.addEventListener("click", () => {
      const categoria = boton.dataset.categoria;

      if (!servicios[categoria]) return;

      limpiarBotonesActivos();
      boton.classList.add("activo");
      cargarServicios(categoria);
    });
  });

  selectServicio.addEventListener("change", mostrarResultado);

  botonAgregar.addEventListener("click", () => {
    const valorSeleccionado = selectServicio.value;

    if (!valorSeleccionado) {
      alert("Seleccioná un servicio primero.");
      return;
    }

    const servicio = servicios[categoriaActual][valorSeleccionado];

    if (!servicio) return;

    carrito.push({
      nombre: servicio.nombre,
      precio: servicio.precio
    });

    mostrarCarrito();
  });

  window.eliminarServicio = function (index) {
    carrito.splice(index, 1);
    mostrarCarrito();
  };

  const primerBoton = document.querySelector('[data-categoria="manicuria"]');
  if (primerBoton) {
    primerBoton.classList.add("activo");
  }

  cargarServicios("manicuria");
  mostrarCarrito();
});
