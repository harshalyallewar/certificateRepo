import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Button,
  Typography,
  TextField,
  Container,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const Signup = () => {

  const userTemplate = {
    eventType: "",
    eventName: "",
    organizer: "",
    duration: "",
    prize: "",
    sem: "a",
    certiLink: "",
  };
  
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setrollNo] = useState("");
  const [regNo, setregNo] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [section, setSection] = useState("");
  const [certiLink, setcertiLink] = useState("");
  const [certificates, setcertificates] = useState([userTemplate]);
  const [err, setErr] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  const navigate = useNavigate();

  const showdata = async (e) => {

      e.preventDefault();

      if (
        !name ||
        !email ||
        !password ||
        !rollNo ||
        !regNo ||
       
        !certificates ||
        !phoneNo
      ) {
        setErrmsg("Enter all details");
        setErr(true);
        return;
      }

      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (!email.match(mailformat)) {
        setErrmsg("Enter valid email");
        setErr(true);

        return;
      }

      let result = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          password,
          rollNo,
          regNo,
          section,
          certificates,
          phoneNo,
        }),
        headers: { "Content-Type": "application/json" },
      });

      let final = await result.json();
      
      console.log(JSON.stringify({ name, email, password, rollNo, regNo, section, certificates }));
      
      if (final.success == true) {
        console.log("this is true if else condition");
        localStorage.setItem("user", JSON.stringify(final.result));
        navigate("/");
      } else {
        console.log("this is false if else condition");
        setErr(true);
        setErrmsg(final.message);
      }
     }

    const handleClose = ()=>{
      setErr(false);
    }

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "82vh",
        alignItems: "center",
      }}
    >
      <Paper
        component="form"
        elevation={7}
        sx={{
          maxWidth: "350px",
          maxHeight: "500px",
          p: 4,
          pt: 2,
          borderRadius: 4,
        }}
      >
        <Grid container sx={{ mt: 2, mb: 2 }}>
          <Grid item xs={12} sx={{ m:1 }}>
            <Typography
              variant="h5"
              sx={{color: "#434A54", fontSize: 30, fontWeight: "700", letterSpacing: 1, mb: 3 }}
            >
              Register
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              label="Enter Name"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              label="Enter Password"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setPass(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              type="email"
              label="Enter Email"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              type="number"
              
              label="Roll no"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setrollNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              type="number"
              
              label="Reg no"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setregNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sx={{ m: 1 }}>
            <TextField
              size="small"
              required
              type="number"
              
              label="Phone no"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
              onChange={(e) => setphoneNo(e.target.value)}
            />
          </Grid>
        
          <Grid item xs={12} sx={{ m: 1 , mt:2}}>
            <Button onClick={showdata} variant="contained" size="large">
              Register
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={err}
        onClose={handleClose}
      >
        <Alert severity="error">{errmsg}</Alert>
      </Snackbar>

    </Container>
  );
};

export default Signup;
