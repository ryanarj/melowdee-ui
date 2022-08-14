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
  import { useState, useEffect } from "react";
  import { useNavigate } from 'react-router-dom';
  
  interface IFormInput {
    album: string;
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
  
  function AddAlbumPage() {
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

    const addSong = () => {
        navigate('/addSong');
    };


    const onSubmit = (data: IFormInput) => {
      console.log(data)
      setJson(JSON.stringify(data))
      navigate('/');
    };
  
    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Add a song
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            </>
          )}
        </form>

        <form onSubmit={addSong} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Add Song
          </Button>
        </form>
      </Container>
    );
  }
  
  export default AddAlbumPage;