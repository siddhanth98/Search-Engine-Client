function Socket() {
    this.socket = null;
    this.getSocket = function() {
        if (!this.socket) this.socket = new WebSocket("ws://localhost:8000/");
        return this.socket;
    }
}

export default Socket;