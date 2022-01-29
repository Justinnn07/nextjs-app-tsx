import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  FormLabel,
} from "@mui/material";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDataLayerValue } from "../context/DataLayer";
import Head from "next/head";
import { login } from "../actions/users";

// copy right component
const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      Copyright ©{" "}
      <Link color="inherit" href="http://www.velozity.com/">
        Velozity
      </Link>{" "}
      All rights reserved {new Date().getFullYear()}.
    </Typography>
  );
};

const Login: NextPage<AppProps> = (props: AppProps) => {
  const router = useRouter();
  const [{}, dispatch] = useDataLayerValue();

  // handle login button event
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    login(
      {
        email: data.get("email"),
        password: data.get("password"),
      },
      dispatch,
      router
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Head>
        <title>Login</title>
      </Head>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image src="/logo.png" alt="Vercel Logo" width={158} height={158} />
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Articlelerator Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormLabel>Used ID</FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Used ID"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <FormLabel>Password</FormLabel>
          <TextField
            margin="normal"
            required
            fullWidth
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login now
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;
