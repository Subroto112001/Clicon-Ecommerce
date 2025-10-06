const { io } = require("socket.io-client");

const socket = io("http://localhost:4000", { transports: ["websocket"] });

socket.on("connect", () => {
    console.log("Connected to server");
});
socket.on("disconnect", () => {
    console.log("Disconnected from server");

})
socket.on("connect_error", (error) => {
    console.log("Connection error:", error);
});