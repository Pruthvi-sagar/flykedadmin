import Box from "@material-ui/core/Box";
import React from "react";

export default function Loader() {
    return (
        <Box
            style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
            }}
        >
            Loading...
        </Box>
    );
}
