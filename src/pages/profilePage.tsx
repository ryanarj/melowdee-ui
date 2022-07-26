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
  
  interface IFormInput {
    email: string;
    username: string;
    password: string;
    age: string;
  }
  
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required().min(2).max(25),
    password: yup.string().required().min(8).max(120),
    age: yup.string().required().min(2).max(25)
  });
  
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
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  
    const { heading, submitButton } = useStyles();
  
    const [json, setJson] = useState<string>();
  
    const onSubmit = (data: IFormInput) => {
      console.log(data)
      setJson(JSON.stringify(data));
    };
  
    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Profile Page
        </Typography>
      </Container>
    );
  }
  
  export default ProfilePage;