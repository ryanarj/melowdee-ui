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
    album_id: string;
    name: string;
    verse_one: string;
    verse_two: string;
    verse_three: string;
    verse_four: string;
    chorus: string;
  }
  
  const schema = yup.object().shape({
    name: yup.string().required().min(2).max(25),
    verse_one: yup.string().required(),
    verse_two: yup.string().required(),
    verse_three: yup.string(),
    verseFour: yup.string(),
    chorus: yup.string().required().min(2),
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
  
  function CreateSongPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  
    const { heading, submitButton } = useStyles();
  
    const [json, setJson] = useState<string>();
  
    async function addSong(data: IFormInput){
      console.log(localStorage.getItem('album_id'))
      data.album_id = localStorage.getItem('album_id') || ""
      console.log(JSON.stringify(data))
  
      const response = await fetch('http://127.0.0.1:8000/songs/', {
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
      addSong(data);
      //navigate('/albumPage');
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
            label="Song Name"
            helperText={errors.name?.message}
            error={!!errors.name?.message}
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
  
  export default CreateSongPage;