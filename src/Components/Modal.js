import React, { useState } from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function Modal({ showModal, setShowModal, modalData, setModalData }) {
  const handleClickOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  const Mission_status = modalData?.upcoming ? (
    <Chip
      label={
        <span
          style={{
            color: "#A43334",
            fontWeight: "bold",
          }}
        >
          Upcoming
        </span>
      }
      color="warning"
    />
  ) : modalData?.launch_success ? (
    <Chip
      label={
        <span
          style={{
            color: "#196551",
            fontWeight: "bold",
          }}
        >
          Success
        </span>
      }
      color="success"
    />
  ) : (
    <Chip
      label={
        <span
          style={{
            color: "#9E5424",
            fontWeight: "bold",
          }}
        >
          Failed
        </span>
      }
      color="error"
    />
  );

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={showModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {modalData?.mission_name} | {Mission_status}
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography gutterBottom style={{ margin: "2%" }}>
            Details: {modalData?.details}
          </Typography>
          <table style={{ width: "100%" }}>
            <tr>
              <td>Flight Number</td>
              <td>{modalData?.flight_number}</td>
            </tr>
            <Divider />
            <tr>
              <td>Mission Name</td>
              <td>{modalData?.mission_name}</td>
            </tr>
            <Divider />
            <tr>
              <td>Rocket Type</td>
              <td>{modalData?.rocket.rocket_type}</td>
            </tr>
            <Divider />
            <tr>
              <td>Rocket Name</td>
              <td>{modalData?.rocket.rocket_name}</td>
            </tr>
            <Divider />
            <tr>
              <td>Manufacturer</td>
              <td>{modalData?.rocket.second_stage.payloads[0].manufacturer}</td>
            </tr>
            <Divider />
            <tr>
              <td>Nationality</td>
              <td>{modalData?.rocket.second_stage.payloads[0].nationality}</td>
            </tr>
            <Divider />
            <tr>
              <td>Launch Date</td>
              <td>
                {new Date(modalData?.launch_date_utc)
                  .toUTCString()
                  .slice(5, 22)}
              </td>
            </tr>
            <Divider />
            <tr>
              <td>Payload Type</td>
              <td>{modalData?.rocket.second_stage.payloads[0].payload_type}</td>
            </tr>
            <Divider />
            <tr>
              <td>Orbit</td>
              <td>{modalData?.rocket?.second_stage?.payloads[0]?.orbit} </td>
            </tr>
            <Divider />
            <tr>
              <td>Launch Site</td>
              <td>{modalData?.launch_site.site_name} </td>
            </tr>
            <Divider />
          </table>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default Modal;
