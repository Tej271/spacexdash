import React, { useState } from "react";
import Button from "@mui/material/Button";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

function DurationFilter({ duration, setDuration, filterData }) {
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
        startIcon={<CalendarTodayIcon />}
        endIcon={<ArrowDropDownIcon />}
        disableRipple={true}
        onClick={handleClick}
      >
        {duration === "sixmonths"
          ? "Past 6 Months"
          : duration === "oneyear"
          ? "Past 2 Years"
          : duration === "twoyears"
          ? "Past 4 Years"
          : duration === "older"
          ? "Older"
          : "All Time"}
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
              setDuration("sixmonths");
              filterData("sixmonths", null);
              handleClose();
            }}
          >
            <ListItemText primary="Past 6 Months" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setDuration("oneyear");
              filterData("oneyear", null);
              handleClose();
            }}
          >
            <ListItemText primary="Past 2 Years" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setDuration("twoyears");
              filterData("twoyears", null);
              handleClose();
            }}
          >
            <ListItemText primary="Past 4 Years" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setDuration("older");
              filterData("older", null);
              handleClose();
            }}
          >
            <ListItemText primary="Older" />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
}

export default DurationFilter;
