import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import LandingPic from "../../src/images/landing_pic.svg";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import "../../src/App.css";

const theme = createTheme();

export default function LoginForm() {
  const [loginUser] = useMutation(LOGIN_USER);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const { data } = await loginUser({ variables: { ...userData } });
      Auth.login(data.login.token);
    } catch (error) {
      console.error(error);
      setErrorMessage("Please enter a valid email or password");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        className="body"
        container
        component="main"
        sx={{ height: "100vh" }}
      >
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          justify="space-between"
          marginBottom="5%"
          style={{
            backgroundImage: `url(${LandingPic})`,
            backgroundSize: "cover",
        
          }}
        > 
          
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={10}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "rgb(8, 45, 86)" }}>
              <LockOutlinedIcon
                sx={{
                  backgroundColor:"rgb(8, 45, 86)",
                }}
              />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 7 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor:"rgb(8, 45, 86)",}}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {errorMessage && (
                <div className="m-4 text-danger">
                  <h4>{errorMessage}</h4>
                </div>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
