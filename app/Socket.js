import {default as Constants} from "./config";

function Socket() {
    this.socket = null;
    this.getSocket = function() {
        if (!this.socket) {
            let protocol = Constants.server.protocol;
            let address = Constants.server.address;
            let port = Constants.server.port;
            this.socket = new WebSocket(`${protocol}://${address}:${port}/`);
        }
        return this.socket;
    }
}

export default Socket;