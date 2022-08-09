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
  import { useNavigate } from 'react-router-dom';
  
  interface IFormInput {
    artist: string;
    about: string
  }
  
  const schema = yup.object().shape({
    artist: yup.string().required().min(2).max(25),
    about: yup.string().required().min(2).max(500)
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
  
  function AddArtistPage() {
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
  
    async function signUp(data: IFormInput){
  
      const response = await fetch('http://127.0.0.1:8000/user_signup/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        } 
      });
  
      console.log(json)
  
      if (!response.ok) { /* Handle */ 
        console.log(response);
        throw new Error(`Error! status: ${response.status}`)
      }
      // If you care about a response:
    //   if (response.body !== null) {
    //   }
  
   }

    const addAblum = () => {
        navigate('/addAlbum');
    };


    const onSubmit = (data: IFormInput) => {
      console.log(data)
      setJson(JSON.stringify(data));
      signUp(data);
      navigate('/');
    };
  
    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Add a song
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("artist")}
            variant="outlined"
            margin="normal"
            label="Artist"
            helperText={errors.artist?.message}
            error={!!errors.artist?.message}
            fullWidth
            required
          />
          <TextField
            {...register("about")}
            variant="outlined"
            margin="normal"
            label="About"
            helperText={errors.about?.message}
            error={!!errors.about?.message}
            fullWidth
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Submit
          </Button>
          {json && (
            <>
              <Typography variant="body2">
                Below is the JSON that would normally get passed to the server
                when a form gets submitted
              </Typography>
              <Typography variant="body2">{json}</Typography>
            </>
          )}
        </form>

        <form onSubmit={addAblum} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Add Album
          </Button>
        </form>
      </Container>
    );
  }
  
  export default AddArtistPage;