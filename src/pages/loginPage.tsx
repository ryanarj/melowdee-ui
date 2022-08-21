import {
    makeStyles,
    Container,
    Typography,
    TextField,
    Button,
    Link
  } from "@material-ui/core";
  import { useForm } from "react-hook-form";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useState } from "react";
  import { useNavigate } from 'react-router-dom';
  import {createTheme } from '@mui/material';


  interface IFormInput {
    email: string;
    password: string;
  }
  

  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required().min(8).max(120),
  });
  
  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "left",
      margin: theme.spacing(1, 3, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
      borderRadius: 20,
    }
  }));
  
  function LoginPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  
    const { heading, submitButton } = useStyles();
  
    const [json, setJson] = useState<string>();

    const navigate = useNavigate();
  
    async function login(data: IFormInput){
  
      const response = await fetch('http://127.0.0.1:8000/user_sign_in/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} 
      });
  
      console.log(json)
  
      if (!response.ok) { /* Handle */ 
        console.log(response);
        throw new Error(`Error! status: ${response.status}`)
      }
      // If you care about a response:
      if (response.body !== null) {
        
        response.json().then(body => localStorage.setItem('user_username', body.username))
        response.json().then(body => localStorage.setItem('user_age', body.age))
        
      }
  
   }
  
    const onSubmit = (data: IFormInput) => {
      console.log(data)
      setJson(JSON.stringify(data));
      login(data);
      navigate('/profilePage');
    };
  
    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Login Page
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("email")}
            variant="outlined"
            margin="normal"
            label="Email"
            helperText={errors.email?.message}
            error={!!errors.email?.message}
            fullWidth
            required
          />
          <TextField
            {...register("password")}
            variant="outlined"
            margin="normal"
            label="Password"
            helperText={errors.password?.message}
            error={!!errors.password?.message}
            type="password"
            fullWidth
            required
          />

          <Link 
            href="/signUp"
            variant="body2"
            underline="hover"
          >
            Sign Up
          </Link>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Sign In
          </Button>
          {json && (
            <>
              <Typography variant="body1">
                Below is the JSON that would normally get passed to the server
                when a form gets submitted
              </Typography>
              <Typography variant="body2">{json}</Typography>
            </>
          )}
        </form>
      </Container>
    );
  }
  
  export default LoginPage;