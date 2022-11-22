import {
  Container,
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Divider,
  Select,
  MenuItem,
  NativeSelect,
  FormControl,
  InputLabel,
} from "@mui/material";
import React,{ useEffect, useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function Dashboard() {
  const userTemplate = {
    eventType: "",
    eventName: "",
    organizer: "",
    duration: "",
    prize: "None",
    sem: "None",
    certiLink: "",
  };

  const [certificates, setcertificates] = useState([]);
  const [prize, setPrize] = React.useState("");
  const id = JSON.parse(localStorage.getItem("user"))._id;
  console.log("main fucntion cert", certificates);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let user = await JSON.parse(localStorage.getItem("user"));
    let userid = user._id;
    let result = await fetch(`/api/getData/${userid}`, {
      method: "GET",
    });
    result = await result.json();
    if(!result){
      console.log('no result');
      return;
    }
    setcertificates(result.result.certificates);
    console.log("userid", result);
  };

  const handleOnChange = (e, index) => {
    let name = e.target.name;
 console.log(e.target.name, e.target.value);
    const updatedObject = Object.assign(certificates[index], {
      [name]: e.target.value,
    });
    console.log(name, e.target.value, updatedObject);
    certificates[index] = updatedObject;

   
  };

  const handleOnAdd = () => {
    setcertificates([...certificates, Object.create(userTemplate)]);
  };

  const handleUpdate = async () => {
   

    let result = await fetch("/api/updateCertificates", {
      method: "PUT",
      body: JSON.stringify({ id, certificates }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    console.log(result);
  };

  const minusCertificate = (index) => {
    console.log(`deleted item at index ${index}`);
    let temp = [...certificates];
    temp.splice(index, 1);
    setcertificates(temp);
  };

  const handlePrizeChange = (e)=>{
    setPrize(e.target.value);
    console.log(e.target.value);
  }

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
              <Divider />
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
                {/* <TextField
                  defaultValue={certificate.prize}
                  name="prize"
                  label="Prize"
                  placeholder="enter prize won"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField> */}
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Prize
                  </InputLabel>
                  <NativeSelect
                    defaultValue={certificate.prize}
                    onChange={(e) => handleOnChange(e, index)}
                    name="prize"
                  >
                    <option value={"1st"}>1st</option>
                    <option value={"2nd"}>2nd</option>
                    <option value={"3rd"}>3rd</option>
                    <option value={"Participate"}>Participate</option>
                    <option value="None">None</option>
                  </NativeSelect>
                </FormControl>
              </Grid>

              <Grid sx={gridItemStyle} item md={1}>
                {/* <TextField
                  defaultValue={certificate.sem}
                  name="sem"
                  label="Sem"
                  placeholder="enter on which semester"
                  fullWidth
                  onChange={(e) => handleOnChange(e, index)}
                  size="small"
                  variant="outlined"
                ></TextField> */}
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Sem
                  </InputLabel>
                  <NativeSelect
                    defaultValue={certificate.sem}
                    onChange={(e) => handleOnChange(e, index)}
                    name="sem"
                  >
                    <option value={"1st"}>1</option>
                    <option value={"2nd"}>2</option>
                    <option value={"3rd"}>3</option>
                    <option value={"4th"}>4</option>
                    <option value={"5th"}>5</option>
                    <option value={"6th"}>6</option>
                    <option value={"7th"}>7</option>
                    <option value={"8th"}>8</option>
                    <option value="None">None</option>
                  </NativeSelect>
                </FormControl>
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

              <Grid item>
                <IconButton onClick={() => minusCertificate(index)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
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
