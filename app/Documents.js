import React from "react";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core";
import Document from "./Document";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        backgroundColor: theme.palette.background.paper
    },
    inline: {
        display: "inline"
    }
}));

function App (props) {
    const styles = useStyles();
    let documents = props.documents.map(doc => {
        return (
            <div>
                <Document document ={doc}/>
                <Divider variant={"middle"} component={"li"} />
            </div>
        );
    }).slice(0, 10);

    return (
        <List className={styles.root}>
            {documents}
        </List>
    );
}

export default App;