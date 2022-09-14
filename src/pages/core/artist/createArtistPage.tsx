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
    name: string;
    about: string
  }
  
  const schema = yup.object().shape({
    name: yup.string().required().min(2).max(25),
    about: yup.string().required().min(2).max(500)
  });
  
  const useStyles = makeStyles((theme) => ({
    heading: {
      textAlign: "center",
      margin: theme.spacing(1, 0, 4),
    },
    submitButton: {
      marginTop: theme.spacing(4),
      borderRadius: 20,
    },
  }));
  
  function CreateArtistPage() {
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
  
    async function addArtist(data: IFormInput){
  
      const response = await fetch('http://127.0.0.1:8000/artists/', {
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
  
   }

    const createAblum = () => {
        navigate('/createAlbum');
    };


    const onSubmit = (data: IFormInput) => {
      console.log(data)
      setJson(JSON.stringify(data));
      addArtist(data);
    };
  
    return (
      <Container fixed>
        <Typography className={heading} variant="h3">
          Add a song
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("name")}
            variant="outlined"
            margin="normal"
            label="Artist"
            helperText={errors.name?.message}
            error={!!errors.name?.message}
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

        <form onSubmit={createAblum} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Create a Album
          </Button>
        </form>
      </Container>
    );
  }
  
  export default CreateArtistPage;