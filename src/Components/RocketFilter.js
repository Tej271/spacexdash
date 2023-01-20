import React, { useState } from "react";
import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function RocketFilter({ launch, setLaunch, filterData }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <Button
        aria-describedby={id}
        color="neutral"
        variant="text"
        style={{ fontWeight: "bold" }}
        startIcon={<FilterAltOutlinedIcon />}
        endIcon={<ArrowDropDownIcon />}
        disableRipple={true}
        onClick={handleClick}
      >
        {launch === "upcoming"
          ? "Upcoming Launches"
          : launch === "success"
          ? "Successful Launches"
          : launch === "fail"
          ? "Failed Launches"
          : "All Launches"}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List dense={true}>
          <ListItemButton
            onClick={() => {
              setLaunch("all");
              filterData(null, "all");
              handleClose();
            }}
          >
            <ListItemText primary="All Launches" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setLaunch("upcoming");
              filterData(null, "upcoming");
              handleClose();
            }}
          >
            <ListItemText primary="Upcoming Launches" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setLaunch("success");
              filterData(null, "success");
              handleClose();
            }}
          >
            <ListItemText primary="Successful Launches" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setLaunch("fail");
              filterData(null, "fail");
              handleClose();
            }}
          >
            <ListItemText primary="Failed Launches" />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
}

export default RocketFilter;
