import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

function App(props) {
    let url = props.document.url, title = props.document.title, description = props.document.description;
    return (
        <ListItem alignItems={"flex-start"}>
            <ListItemText
                primary={<React.Fragment>
                    <a href={url}>{title}</a>
                </React.Fragment>}
                secondary={description}
            />
        </ListItem>
    );
}

export default App;