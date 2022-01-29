import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "./../components/AddArticle";
import Table from "./../components/Table";
import Header from "./../components/Header";
import { Button, Paper } from "@mui/material";
import { useDataLayerValue } from "../context/DataLayer";
import { getLoggedInUserData } from "../actions/users";
import Head from "next/head";

// home page
const Home: NextPage = () => {
  const [{ user }, dispatch] = useDataLayerValue();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // fetch user data while loading
  useEffect(() => {
    getLoggedInUserData(dispatch, router);
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Header />
      <Modal open={open} handleClose={handleClose} />
      <Paper
        sx={{
          maxWidth: "80%",
          margin: "auto",
          marginTop: user.userType === "admin" ? "3.5rem" : "1rem",
        }}
        elevation={0}
      >
        {user?.userType !== "admin" ? (
          <Button variant="contained" sx={{ m: "1rem 0" }} onClick={handleOpen}>
            Add Article
          </Button>
        ) : null}
        <Table />
      </Paper>
    </div>
  );
};

export default Home;
