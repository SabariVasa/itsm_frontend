import React from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchModalButton(props) {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 395,
        marginLeft: 11,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search configuration item"
        inputProps={{ "aria-label": "Select configuration item" }}
        onChange={(e) => {
          props.setSelectedItem(e.target.value);
        }}
        value={props.selectedItem}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon
          onClick={() => {
            props.setHandleOpen(true);
          }}
        />
      </IconButton>
    </Paper>
  );
}
