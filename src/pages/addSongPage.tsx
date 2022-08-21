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
    songName: string;
    artist: string;
    album: string;
    verse_one: string;
    verse_two: string;
    verse_three: string;
    verse_four: string;
    chorus: string;
  }
  
  const schema = yup.object().shape({
    songName: yup.string().required().min(2).max(25),
    artist: yup.string().required().min(2).max(25),
    album: yup.string().required().min(2).max(25),
    verse_one: yup.string().required().min(2).max(350),
    verse_two: yup.string().required().min(2).max(350),
    verse_three: yup.string().required().min(2).max(350),
    verse_four: yup.string().required().min(2).max(350),
    chorus: yup.string().required().min(2).max(350),
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
  
  function AddSongPage() {
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
            {...register("songName")}
            variant="outlined"
            margin="normal"
            label="Song Name"
            helperText={errors.songName?.message}
            error={!!errors.songName?.message}
            fullWidth
            required
          />
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
            {...register("album")}
            variant="outlined"
            margin="normal"
            label="Album"
            helperText={errors.album?.message}
            error={!!errors.album?.message}
            fullWidth
            required
          />
          <TextField
            {...register("verse_one")}
            variant="outlined"
            margin="normal"
            label="Verse 1"
            size="medium"
            helperText={errors.verse_one?.message}
            error={!!errors.verse_one?.message}
            fullWidth
            required
          />
          <TextField
            {...register("verse_two")}
            variant="outlined"
            margin="normal"
            label="Verse 2"
            helperText={errors.verse_two?.message}
            error={!!errors.verse_two?.message}
            fullWidth
            required
          />
          <TextField
            {...register("chorus")}
            variant="outlined"
            margin="normal"
            label="Chorus"
            helperText={errors.chorus?.message}
            error={!!errors.chorus?.message}
            fullWidth
            required
          />
          <TextField
            {...register("verse_three")}
            variant="outlined"
            margin="normal"
            label="Verse 3"
            helperText={errors.verse_three?.message}
            error={!!errors.verse_three?.message}
            fullWidth
          />
          <TextField
            {...register("verse_four")}
            variant="outlined"
            margin="normal"
            label="Verse 4"
            helperText={errors.verse_four?.message}
            error={!!errors.verse_four?.message}
            fullWidth
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
      </Container>
    );
  }
  
  export default AddSongPage;