import { LineAxisOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import { MouseEvent, useState } from "react";
import axios from "axios";

import { setUserSession } from "../utils/Common";
import { Navigate, redirect } from "react-router-dom";

export default function LoginPage() {
  const [toRedirect, setToRedirect] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: MouseEvent) => {
    event.preventDefault();

    if (email.length && password.length) {
      const payload = {
        username: email,
        password: password,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      console.log("Here");
      axios
        .post("http://localhost:8080/api/v1/gym_bros/authenticate", payload, {
          headers: headers,
        })
        .then(function (response) {
          if (response.status === 200) {
            setUserSession(response.data.token, email);
            setToRedirect(true);
          }
        })
        .catch(() => alert("Nieprawidłowy login lub hasło"));
    }
  };

  return toRedirect ? (
    <Navigate to="/" />
  ) : (
    <main>
      <Container
        sx={{
          backgroundColor: "lightgray",
          borderRadius: "20px",
          height: "100vh",
          padding: "10px",
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{ paddingBottom: "50px", paddingTop: "50px" }}
        >
          Zaloguj się
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adres email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
            sx={{ background: "white", borderRadius: "4px" }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{ background: "white", borderRadius: "4px" }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={(e) => handleSubmit(e)}
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj się
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Nie masz konta? Zarejestruj się"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </main>
  );
}
