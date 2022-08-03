import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
  } from "@material-ui/core";
  import { useForm } from "react-hook-form";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useState } from "react";
  
  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
    },
  }));
  
  function ProfilePage() {
    
    const { heading } = useStyles();

    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Profile Page 
        </Typography>
        <Typography variant="body2"> Hello, {localStorage.getItem("user_username") || ""}.</Typography>
        <Typography variant="body2"> You are {localStorage.getItem("user_age") || ""} years old!</Typography>
      </Container>
    );
  }
  
  export default ProfilePage;