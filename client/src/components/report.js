import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
} from "@mui/material";
import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function Report() {
  const [userdetails, setuserdetails] = useState("");
  const [certificates, setcertificates] = useState([]);
  const [name, setName] = useState("pdf_report");
  const current = new Date();

  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let userid = user._id;
    let result = await fetch(`http://localhost:10/api/getData/${userid}`, {
      method: "GET",
    });
    result = await result.json();
    setcertificates(result.result.certificates);
    setuserdetails(result.result);
    setName(userdetails.name);
    console.log("userid", result);
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: userdetails.name,
  });

  const pageStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    width: "21cm",
    minHeight: "29.7cm",
    padding: "30px",
    margin: "auto",
    border: "1px #D3D3D3 solid",
    borderRadius: "5px",
    background: "white",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  };

  const typoStyle = {
    fontSize: "49px",
    letterSpacing: "7px",
    fontWeight: "100",
    mb: 1,
    color: "#2b2b2b",
  };

  const subheadingStyle = {
    color: "#434A54",
    letterSpacing: 1,
    mb: 1,
  };

  const ColoredLine = ({ color }) => (
    <hr
      style={{
        color: color,

        height: 0.5,
        width: "100%",
        mb: 3,
      }}
    />
  );

  const thcellStyle = {
    letterSpacing: "1px",
    fontWeight: "bold",
  };

  const tbcellStyle = {
    color: "#434A54",
  };

  const btnStyle = { margin: "auto", textTransform: "none" };

  return (
    <Container sx={{ py: 2 }} maxWidth="xl">
      <Box sx={{ display: "flex", my: 3 }}>
        <Button onClick={handlePrint} sx={btnStyle} variant="contained">
          Download or Print
        </Button>
        <Button sx={btnStyle} variant="contained" onClick={() => navigate("/")}>
          Edit the Report
        </Button>
      </Box>
      <div
        className="afour"
        style={pageStyle}
        ref={componentRef}
        name="pdf_report"
      >
        <Typography variant="h1" sx={typoStyle}>
          {userdetails.name}
        </Typography>
        <Typography sx={subheadingStyle}>
          {userdetails.email} &nbsp;|&nbsp; {userdetails.phoneNo}
        </Typography>
        <Typography sx={subheadingStyle}>
          Roll No: {userdetails.rollNo} &nbsp;| &nbsp;Reg No:{" "}
          {userdetails.regNo}
        </Typography>
        <Typography
          sx={{
            color: "#707070",
            fontSize: "14px",
          }}
        >
          Date: {current.getDate()}/{current.getMonth()}/{current.getFullYear()}{" "}
          | Time: {current.toLocaleTimeString()}
        </Typography>
        <ColoredLine color="black" />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ height: "80px" }}>
                <TableCell sx={thcellStyle}>Event Name</TableCell>
                <TableCell sx={thcellStyle}>Event Type</TableCell>
                <TableCell sx={thcellStyle}>Organizer</TableCell>
                <TableCell sx={thcellStyle}>Duration</TableCell>
                <TableCell sx={thcellStyle}>Prize</TableCell>
                <TableCell sx={thcellStyle}>Sem</TableCell>
                <TableCell sx={thcellStyle}>View</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {certificates.map((certificate, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell sx={tbcellStyle}>
                      {certificate.eventType}
                    </TableCell>
                    <TableCell sx={tbcellStyle}>
                      {certificate.eventName}
                    </TableCell>
                    <TableCell sx={tbcellStyle}>
                      {certificate.organizer}
                    </TableCell>
                    <TableCell sx={tbcellStyle}>
                      {certificate.duration}
                    </TableCell>
                    <TableCell sx={tbcellStyle}>{certificate.prize}</TableCell>
                    <TableCell sx={tbcellStyle}>{certificate.sem}</TableCell>
                    <TableCell sx={tbcellStyle}>
                      <Link target="" href={certificate.certiLink}>
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Container>
  );
}
