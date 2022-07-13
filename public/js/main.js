let admin = true;
const formContainer = document.querySelector(".form-container");

// Obtiene los datos del usuario logueado
const getUserData = async () => {
    let res = await fetch("/userdata")
    let json = await res.json()
    return json
}

// Imprime los datos del usuario
const printUserData = async () => {
    let json = await getUserData()
    let data = await getTemplate("../templates/navbar.ejs")
    let template = ejs.compile(data)
    let userData = template({user: json})
    document.querySelector(".user-data").innerHTML = userData
}

// Si tiene permisos de administrador se muestra el formulario en pantalla
const getAdminContent = async () => {
    if (admin) {
        let data = await getTemplate("../templates/form.ejs")
        let template = ejs.compile(data)
        let form = template({})
        formContainer.innerHTML = form
    }
}

// Obtiene los productos e imprime las cards
const getProducts = async () => {
    try {
        let res = await fetch("/api/productos")
        let json = await res.json()
    
        let data = await getTemplate("../templates/products.ejs")
        let template = ejs.compile(data)
        let cards = template({products: json, admin: admin})
        document.querySelector(".cards-container").innerHTML = cards
    } catch (error) {
        document.querySelector(".cards-container").innerHTML = `<p>Error al cargar los productos</p>`
    }
}

// Obtiene el contenido de la plantilla
async function getTemplate(url) {
    try {
        const res = await fetch(url);
        return await res.text();
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    printUserData();
    getProducts();
    getAdminContent();
})

/*  Agrega productos si el input id no contiene valor, 
    en caso contrario actualiza el producto con ese id */
formContainer.addEventListener("submit", async (e) => {
    e.preventDefault()
    
    if (!e.target.id.value) {
        try {
            await fetch("/api/productos", {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    title: e.target.title.value,
                    description: e.target.description.value,
                    image: e.target.image.value,
                    code: e.target.code.value,
                    price: e.target.price.value,
                    stock: e.target.stock.value
                })
            })
            location.reload();
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            await fetch(`/api/productos/${e.target.id.value}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({
                    title: e.target.title.value,
                    description: e.target.description.value,
                    image: e.target.image.value,
                    code: e.target.code.value,
                    price: e.target.price.value,
                    stock: e.target.stock.value
                })
            })
            location.reload();
        } catch (err) {
            console.log(err);
        }
    }
})

/*  Si el botón que origina el evento es el de actualizar 
    muestra los valores del objeto seleccionado en el formulario,
    si lo origina botón eliminar, elimina el objeto por su id  */
document.addEventListener("click", async e => {
    if (e.target.matches(".edit")) {
        let form = document.querySelector(".form")
        form.id.value = e.target.dataset.id
        form.title.value = e.target.dataset.title
        form.description.value = e.target.dataset.description
        form.code.value = e.target.dataset.code
        form.image.value = e.target.dataset.image
        form.price.value = e.target.dataset.price
        form.stock.value = e.target.dataset.stock
    } 

    if (e.target.matches(".delete")) {
        let isDelete = confirm(`¿Está seguro de eliminar el producto ${e.target.dataset.id}?`)

        if (isDelete) {
            try {
                await fetch(`/api/productos/${e.target.dataset.id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json; charset=utf-8"
                    }
                })
                location.reload();
            } catch (err) {
                console.log(err);
            }
        }
    }
})

document.addEventListener("click", async (e) => {
    if (e.target.matches(".add-product")) {
        try {
            let userData = await getUserData()
            let cartId = await userData.cartId
            await fetch(`/api/carrito/${cartId}/productos`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=utf-8"
                },
                body: JSON.stringify({product: e.target.dataset.id})
            })
        } catch (err) {
            console.log(err);
        }  
    }
})

// Websockets
const socket = io.connect();
const author = document.getElementById("user-email");
const text = document.getElementById("new-message");
const chatMessages = document.getElementById("chat-messages");
const formChat = document.getElementById("form-message");

formChat.addEventListener("submit", e => {
    e.preventDefault();
    const newMessage = {author: author.value, text: text.value}
    socket.emit("newMessage", newMessage);
})    

// Recibe e imprime todos los mensajes actualizados
socket.on("messages", messages => {
    chatMessages.innerHTML = "";
    for (let el of messages) {
        chatMessages.innerHTML += `<p>
            <span class="post-author">${el.author}</span> 
            <span class="post-date">[${el.date}]:</span>  
            <span class="post-text">${el.text}</span>
        </p>`;
    }
})