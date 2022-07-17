const { messages } = require("../containers/index")

module.exports = async (io, socket) => {
    console.log("Nuevo cliente conectado");
    // Mensajes del chat
    socket.emit("messages", await messages.getAll());

    socket.on("newMessage", async newMessage => {
        newMessage.date = new Date().toLocaleString();
        await messages.save(newMessage);
        io.sockets.emit("messages", await messages.getAll());
    });
}