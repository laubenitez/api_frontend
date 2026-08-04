// ==========================================
// 1. INYECTAR OFF-CANVAS Y MODAL DE LOGIN AUTOMÁTICAMENTE
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Inyectar Modal de Login si no existe
    if (!document.getElementById('loginModal')) {
        const loginModalHTML = `
            <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow-lg" style="background-color: #ffffff; color: #2b2b2b;">
                        <div class="modal-header px-4 py-3" style="background-color: #fdf2f7; border-bottom: 1px solid rgba(224, 86, 150, 0.15);">
                            <h5 class="modal-title fw-bold" id="loginModalLabel" style="color: #e05696;">
                                <i class="bi bi-person-heart me-2"></i> Iniciar Sesión para Continuar
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <form onsubmit="event.preventDefault(); iniciarSesion();">
                                <div class="mb-3">
                                    <label for="correo" class="form-label fw-semibold text-dark">Correo electrónico</label>
                                    <input type="email" class="form-control" id="correo" placeholder="tucorreo@email.com" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label fw-semibold text-dark">Contraseña</label>
                                    <input type="password" class="form-control" id="password" placeholder="••••••••" required>
                                </div>
                                <button type="submit" class="btn btn-pink-custom w-100 py-3 text-white fw-bold shadow-sm rounded-pill mt-3">
                                    Ingresar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', loginModalHTML);
    }

    // Inyectar Offcanvas del Carrito si no existe
    if (!document.getElementById('cartOffcanvas')) {
        const offcanvasHTML = `
            <div class="offcanvas offcanvas-end border-0 shadow-lg" tabindex="-1" id="cartOffcanvas" aria-labelledby="cartOffcanvasLabel" style="background-color: #ffffff; color: #2b2b2b;">
                <div class="offcanvas-header px-4 py-3" style="background-color: #fdf2f7; border-bottom: 1px solid rgba(224, 86, 150, 0.15);">
                    <h5 class="offcanvas-title fw-bold" id="cartOffcanvasLabel" style="color: #e05696;">
                        <i class="bi bi-bag-heart-fill me-2"></i> Tu Carrito de Compras
                    </h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                
                <div class="offcanvas-body d-flex flex-column justify-content-between p-4">
                    <div id="contenidoCarrito" class="overflow-auto flex-grow-1 pe-2">
                        <!-- Se inyecta por JavaScript -->
                    </div>
                    <div class="border-top pt-3 mt-3">
                        <div id="total" class="mb-3">
                            <!-- Se inyecta por JavaScript -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', offcanvasHTML);
    }
});

// ==========================================
// 2. LÓGICA DEL CARRITO
// ==========================================

let Carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarProducto(producto) {
    let existe = Carrito.find(p => p.id == producto.id);

    if (existe) {
        if (producto.stock && existe.unidades >= producto.stock) {
            alert("Has alcanzado el límite del stock disponible.");
            return;
        }
        existe.unidades++;
    } else {
        producto.unidades = 1;
        Carrito.push(producto);
    }

    // Guarda en el almacenamiento local para que no se pierda al recargar
    localStorage.setItem("carrito", JSON.stringify(Carrito));
    
    actualizarBadge();
    mostrarCarrito();
    // (Ya no se abre el offcanvas automáticamente aquí)
}

function abrirCarrito() {
    mostrarCarrito();
    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (offcanvasEl) {
        let bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasEl);
        bsOffcanvas.show();
    }
}

function mostrarCarrito() {
    const zona = document.getElementById("contenidoCarrito");
    const totalZona = document.getElementById("total");
    
    if (!zona) return;
    
    zona.innerHTML = "";
    let total = 0;

    if (Carrito.length === 0) {
        zona.innerHTML = `
            <div class="text-center text-muted my-auto py-5">
                <i class="bi bi-cartX display-4 text-pink-secondary"></i>
                <p class="mt-3">Tu carrito está vacío</p>
            </div>
        `;
        if (totalZona) {
            totalZona.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="fw-bold fs-5 text-dark">Total:</span>
                    <span class="fw-bold fs-4 text-pink-dark">$0</span>
                </div>
                <button class="btn btn-pink-custom w-100 py-3 text-white fw-bold shadow-sm rounded-pill" onclick="comprar()">
                    Comprar ahora
                </button>
            `;
        }
        actualizarBadge();
        return;
    }

    Carrito.forEach(producto => {
        let subtotal = Number(producto.precio) * producto.unidades;
        total += subtotal;

        zona.innerHTML += `
            <div class="d-flex align-items-center justify-content-between border-bottom py-3">
                <div class="d-flex align-items-center">
                    <img src="${producto.imagen}" alt="${producto.titulo}" class="cart-item-img me-3 shadow-sm border rounded bg-white p-1" style="width: 65px; height: 65px; object-fit: contain;">
                    <div>
                        <h6 class="mb-0 fw-semibold text-dark">${producto.titulo}</h6>
                        <small class="text-muted">$${Number(producto.precio).toLocaleString()} c/u</small>
                        <div class="input-group input-group-sm quantity-controls mt-2" style="width: 110px;">
                            <button class="btn btn-qty-minus" onclick="disminuirProducto('${producto.id}')">-</button>
                            <input type="text" class="form-control text-center bg-white border-0" value="${producto.unidades}" readonly>
                            <button class="btn btn-qty-plus" onclick="aumentarProducto('${producto.id}')">+</button>
                        </div>
                    </div>
                </div>
                <div class="text-end">
                    <span class="d-block fw-bold text-pink-dark mb-2">$${subtotal.toLocaleString()}</span>
                    <button class="btn btn-sm text-danger p-0" onclick="eliminarProducto('${producto.id}')" title="Eliminar producto">
                        <i class="bi bi-trash fs-5"></i>
                    </button>
                </div>
            </div>
        `;
    });

    if (totalZona) {
        totalZona.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="fw-bold fs-5 text-dark">Total General:</span>
                <span class="fw-bold fs-4 text-pink-dark">$${total.toLocaleString()}</span>
            </div>
            <button class="btn btn-pink-custom w-100 py-3 text-white fw-bold shadow-sm rounded-pill" onclick="comprar()">
                Comprar ahora
            </button>
        `;
    }

    actualizarBadge();
}

function aumentarProducto(id) {
    let producto = Carrito.find(p => p.id == id);
    if (producto) {
        if (producto.stock && producto.unidades >= producto.stock) {
            alert("Has alcanzado el límite del stock disponible.");
            return;
        }
        producto.unidades++;
        localStorage.setItem("carrito", JSON.stringify(Carrito));
        mostrarCarrito();
    }
}

function disminuirProducto(id) {
    let producto = Carrito.find(p => p.id == id);
    if (producto) {
        if (producto.unidades > 1) {
            producto.unidades--;
            localStorage.setItem("carrito", JSON.stringify(Carrito));
            mostrarCarrito();
        }
    }
}

function eliminarProducto(id) {
    Carrito = Carrito.filter(p => p.id != id);
    localStorage.setItem("carrito", JSON.stringify(Carrito));
    mostrarCarrito();
}

function comprar() {
    if (Carrito.length === 0) {
        alert("Tu carrito está vacío");
        return;
    }

    const offcanvasEl = document.getElementById('cartOffcanvas');
    if (offcanvasEl) {
        let bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
        if (bsOffcanvas) bsOffcanvas.hide();
    }

    const loginModalEl = document.getElementById('loginModal');
    if (loginModalEl) {
        let loginModal = new bootstrap.Modal(loginModalEl);
        loginModal.show();
    }
}

function iniciarSesion() {
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    if (correo.trim() === "" || password.trim() === "") {
        alert("Completa todos los campos");
        return;
    }

    alert("Inicio de sesión exitoso");

    const loginModalEl = document.getElementById('loginModal');
    if (loginModalEl) {
        let modalInstance = bootstrap.Modal.getInstance(loginModalEl);
        if (modalInstance) modalInstance.hide();
    }
}

function actualizarBadge() {
    let totalItems = Carrito.reduce((acc, item) => acc + item.unidades, 0);
    const badge = document.getElementById("cantidadCarrito");
    if (badge) {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'inline-block' : 'none';
    }
}

// ==========================================
// 3. EVENTOS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    actualizarBadge();
    mostrarCarrito();

    // Abrir el offcanvas solo al hacer clic en el icono de la bolsa
    document.body.addEventListener('click', (e) => {
        const trigger = e.target.closest('.bi-bag-heart-fill, .bi-cart3, [onclick*="abrirCarrito"]');
        if (trigger) {
            e.preventDefault();
            abrirCarrito();
        }
    });

    // Puente para capturar los clics del catálogo e index
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            e.preventDefault();
            const producto = {
                id: btn.getAttribute('data-id'),
                titulo: btn.getAttribute('data-nombre'),
                precio: Number(btn.getAttribute('data-precio')),
                imagen: btn.getAttribute('data-imagen'),
                stock: Number(btn.getAttribute('data-stock'))
            };
            agregarProducto(producto);
        }
    });
});