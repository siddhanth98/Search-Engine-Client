import React from "react";
import Socket from "./Socket";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import Documents from "./Documents";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            socket: null,
            query: "",
            k: 0,
            docs: [],
            hover: false
        }
        this.registerSocket = this.registerSocket.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.getDocumentCount = this.getDocumentCount.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleHover = this.toggleHover.bind(this);
    }

    componentDidMount() {
        this.registerSocket();
    }

    registerSocket() {
        let conn = new Socket().getSocket();
        console.log(conn);
        console.log("registering socket listeners");
        conn.onmessage = (message) => {
            let m = JSON.parse(message.data)["documents"];
            console.log("server response:");
            console.log(m);

            if (m) {
                this.setState((state, props) => {
                    let documents = [];
                    m.forEach(doc => documents.push(doc));
                    return {docs: documents};
                });
            }
        };

        conn.onopen = () => {
            console.log("connection opened with server");
        }
        this.setState((state, props) => {
            return {socket: conn};
        });
    }

    handleInput(e) {
        this.setState((state, props) => {
            return {query: e.target.value};
        });
    }

    getDocumentCount(e) {
        if (e.target.value.length > 0) {
            this.setState((state, props) => {
                return {k: parseInt(e.target.value)}
            });
        }
        else this.setState((state, props) => {
            return {k: 0}
        });
    }

    toggleHover(e) {
        this.setState((state, props) => {
            return {hover: !state.hover};
        });
    }

    handleClick(e) {
        if (this.state.socket) {
            console.log(`sending query ${this.state.query}`);
            let conn = this.state.socket;
            let message = {query: this.state.query, k: this.state.k};
            conn.send(JSON.stringify(message));
        }
        else console.log("socket connection is not open");
    }

    render() {
        let generalStyle = {marginLeft: "20px", marginTop: "10px"}
        let iconStyle = this.state.hover === true ? {cursor: "pointer", backgroundColor: "#DFDFDF", ...generalStyle} : {backgroundColor: "#FFF", ...generalStyle};
        let counterStyle = {width: 60, height: 20, marginRight: "30px"};

        return (
            <center>
                <h1>University of Illinois, Chicago</h1>
                <form>
                    <div>
                        <TextField id={"standard-basic"}
                                   label={"Search"}
                                   onInput={this.handleInput}
                                   margin={"none"}
                                   size={"medium"}
                                   style={{width: "370px"}}
                    />
                        <SearchIcon style = {iconStyle}
                                    onMouseEnter = {this.toggleHover}
                                    onMouseLeave = {this.toggleHover}
                                    onClick = {this.handleClick}
                                    fontSize={"large"}
                        />
                    </div>
                    <br />
                    <input type={"number"}
                           style={counterStyle}
                           onInput={this.getDocumentCount}
                    />
                </form>
                <Documents documents={this.state.docs}/>
            </center>
        );
    }
}

export default App;