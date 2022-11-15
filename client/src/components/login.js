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

const Login = () => {
  const [password, setPass] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  let authuser = localStorage.getItem("user");

  if (authuser) {
    navigate("/");
  }

  const getdata = async (e) => {
    e.preventDefault();

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email.match(mailformat)) {
      setErrmsg("Enter valid email");
      setErr(true);
      return;
    }

    let result = await fetch("http://localhost:10/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    

    result = await result.json();
    console.log(result);

    if (result.success == true) {
      localStorage.setItem("user", await JSON.stringify(result.result));
      setErr(false);
      navigate("/");
    } else {
      setErr(true);
      setErrmsg(result.message);
    }
   };

  const handleClose = () => {
    setErr(false);
  };

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
          <Grid item xs={12} sx={{ m: 1 }}>
            <Typography
              size="h5"
              sx={{
                color: "#434A54",
                fontSize: 30,
                fontWeight: "700",
                letterSpacing: 1,
                mb: 2,
              }}
            >
              Login
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ m: 1, mb: 2 }}>
            <TextField
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              label="Enter Email"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>

          <Grid item xs={12} sx={{ m: 1, mb: 3 }}>
            <TextField
              size="small"
              onChange={(e) => setPass(e.target.value)}
              label="Enter Password"
              sx={{ width: { xs: "260px", sm: "290px", md: "330px" } }}
            />
          </Grid>

          <Grid item xs={12} sx={{ m: 1 }}>
            <Button onClick={getdata} variant="contained" size="large">
              Login
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

export default Login;
