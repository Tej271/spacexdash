import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import { TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import DurationFilter from "./DurationFilter";
import RocketFilter from "./RocketFilter";
import Modal from "./Modal.js";

import axios from "axios";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    neutral: {
      main: "#606975",
      contrastText: "#fff",
    },
    success: {
      main: "#DEF7EC",
    },
    error: {
      main: "#FDE2E1",
    },
    warning: {
      main: "#FEF3C7",
    },
  },
});

const RocketTable = () => {
  const [originalData, setOriginalData] = useState([]);
  const [rocketData, SetRocketData] = useState([]);
  const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(12);
  const [launch, setLaunch] = useState("all");
  const [duration, setDuration] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  const filterData = (duration_n, launch_n) => {
    setPage(0);

    if (launch_n) {
      if (launch_n === "all") {
        SetRocketData(originalData);
      } else {
        let data = originalData.filter((obj) => {
          if (launch_n === "upcoming") return obj.upcoming === true;
          else if (launch_n === "success") return obj.launch_success === true;
          else if (launch_n === "fail") return obj.launch_success === false;
          else return true;
        });
        SetRocketData(data);
      }
    }
    if (duration_n) {
      let data = [];

      if (launch === "all") {
      } else {
        data = originalData?.filter((obj) => {
          if (launch === "upcoming") return obj.upcoming === true;
          else if (launch === "success") return obj.launch_success === true;
          else if (launch === "fail") return obj.launch_success === false;
        });
        SetRocketData(data);
      }

      const now = new Date();
      let six_months = now.setMonth(now.getMonth() - 6);
      let twelve_months = now.setFullYear(now.getFullYear() - 2);
      let twentyfour_months = now.setFullYear(now.getFullYear() - 4);

      let new_data = data.length
        ? data.filter((obj) => {
            if (duration_n === "sixmonths")
              return new Date(obj.launch_date_utc) > six_months;
            else if (duration_n === "oneyear")
              return new Date(obj.launch_date_utc) > twelve_months;
            else if (duration_n === "twoyears")
              return new Date(obj.launch_date_utc) > twentyfour_months;
            else if (duration_n === "older")
              return new Date(obj.launch_date_utc) < twentyfour_months;
            else return true;
          })
        : originalData.filter((obj) => {
            if (duration_n === "sixmonths")
              return new Date(obj.launch_date_utc) > six_months;
            else if (duration_n === "oneyear")
              return new Date(obj.launch_date_utc) > twelve_months;
            else if (duration_n === "twoyears")
              return new Date(obj.launch_date_utc) > twentyfour_months;
            else if (duration_n === "older")
              return new Date(obj.launch_date_utc) < twentyfour_months;
            else return true;
          });
      SetRocketData(new_data);
    }
  };

  const GetData = async () => {
    var config = {
      method: "get",
      url: "https://api.spacexdata.com/v3/launches",
      headers: {},
    };

    await axios(config)
      .then(function (response) {
        SetRocketData(response.data);
        setOriginalData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.hover,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "white",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / 12) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  const rowClickHandler = (row_data) => {
    setModalData(row_data);
    setShowModal(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "60%",
          marginLeft: "20%",
          marginTop: "4%",
        }}
      >
        <DurationFilter
          duration={duration}
          setDuration={setDuration}
          filterData={filterData}
        />
        <RocketFilter
          launch={launch}
          setLaunch={setLaunch}
          filterData={filterData}
        />
      </div>
      <div style={{ width: "60%", marginLeft: "20%" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">No:</StyledTableCell>
                <StyledTableCell align="left">Launched(UTC)</StyledTableCell>
                <StyledTableCell align="left">Location</StyledTableCell>
                <StyledTableCell align="left">Mission</StyledTableCell>
                <StyledTableCell align="center">Orbit</StyledTableCell>
                <StyledTableCell align="center">Launch Status</StyledTableCell>
                <StyledTableCell align="center">Rocket</StyledTableCell>
              </TableRow>
            </TableHead>
            {rocketData.length > 0
              ? rocketData
                  ?.slice(page * 12, page * 12 + 12)
                  .map((row, index) => (
                    <TableBody key={index}>
                      <StyledTableRow onClick={() => rowClickHandler(row)}>
                        <StyledTableCell align="center">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          component="th"
                          scope="row"
                        >
                          {new Date(row.launch_date_utc)
                            .toUTCString()
                            .slice(5, 22)}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.launch_site.site_name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {row.mission_name}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.rocket?.second_stage?.payloads[0]?.orbit}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.upcoming ? (
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
                          ) : row.launch_success ? (
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
                          )}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {row.rocket.rocket_name}
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableBody>
                  ))
              : "No results found for the specified filter"}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[]}
                  colSpan={3}
                  count={rocketData.length}
                  rowsPerPage={12}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  // onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        modalData={modalData}
        setModalData={setModalData}
      />
    </ThemeProvider>
  );
};

export default RocketTable;
