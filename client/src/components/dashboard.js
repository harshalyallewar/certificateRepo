import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";

function Dashboard() {
  const userTemplate = {
    eventType: "",
    eventName: "",
    organizer: "",
    duration: "",
    prize: "",
    sem: "",
    certiLink: "",
  };

  const [certificates, setcertificates] = useState([]);
  const id = JSON.parse(localStorage.getItem("user"))._id;
  console.log(id);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    let userid = user._id;
    let result = await fetch(`http://localhost:10/api/getData/${userid}`, {
      method: "GET",
    });
    result = await result.json();
    setcertificates(result.result.certificates);
    console.log("userid", result);
  };

  const handleOnChange = (e, index) => {
    let name = e.target.name;

    const updatedObject = Object.assign(certificates[index], {
      [e.target.name]: e.target.value,
    });

    certificates[index] = updatedObject;

    console.log(certificates, index);
  };

  const handleOnAdd = () => {
    setcertificates([...certificates, Object.create(userTemplate)]);
  };

  const handleUpdate = async () => {
    let result = await fetch("http://localhost:10/api/updateCertificates", {
      method: "PUT",
      body: JSON.stringify({ id, certificates }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    console.log(result);
  };

  const paperStyle = {
    marginTop: "40px",
    p: "20px",
  };
  const gridItemStyle = {
    margin: "9px",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "30px",
    color: "#434A54",
  };

  return (
    <Container maxWidth="xl">
      <Paper sx={paperStyle}>
        <Typography sx={headingStyle}>Add Certificates Details</Typography>
      </Paper>
      <Paper sx={paperStyle}>
        {certificates.map((certificate, index) => {
          return (
            <Grid
              container
              key={index}
              spacing={2}
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid style={gridItemStyle} item md={2}>
                <TextField
                  defaultValue={certificate.eventType}
                  name="eventType"
                  label="Type"
                  placeholder="type of event"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField>
              </Grid>

              <Grid sx={gridItemStyle} item md={2}>
                <TextField
                  defaultValue={certificate.eventName}
                  name="eventName"
                  label="Name"
                  placeholder="name of event"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField>
              </Grid>

              <Grid sx={gridItemStyle} item md={2}>
                <TextField
                  defaultValue={certificate.organizer}
                  name="organizer"
                  label="Organizer"
                  placeholder="enter organizers name"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField>
              </Grid>

              <Grid sx={gridItemStyle} item md={1}>
                <TextField
                  defaultValue={certificate.duration}
                  name="duration"
                  label="Duration"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField>
              </Grid>

              <Grid sx={gridItemStyle} item md={1}>
                <TextField
                  defaultValue={certificate.prize}
                  name="prize"
                  label="Prize"
                  placeholder="enter prize won"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField>
              </Grid>

              <Grid sx={gridItemStyle} item md={1}>
                <TextField
                  defaultValue={certificate.sem}
                  name="sem"
                  label="Sem"
                  placeholder="enter on which semester"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField>
              </Grid>

              <Grid sx={gridItemStyle} item md={1}>
                <TextField
                  defaultValue={certificate.certiLink}
                  name="certiLink"
                  label="Link"
                  placeholder="Link"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField>
              </Grid>
            </Grid>
          );
        })}
        <Box
          sx={{
            m: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ mx: 3 }}
            variant="contained"
            onClick={handleOnAdd}
            color="primary"
          >
            Add more
          </Button>
          <Button
            sx={{ mx: 3 }}
            variant="contained"
            onClick={handleUpdate}
            color="primary"
          >
            Update Details
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Dashboard;
