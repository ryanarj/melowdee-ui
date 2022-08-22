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
  import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

  interface IFormInput {
    album: string;
    about: string;
    artistId: string
  }


  const schema = yup.object().shape({
    artist: yup.string().required().min(2).max(25),
    about: yup.string().required().min(2).max(500),
    artistId: yup.string().required().min(2).max(500)
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
  
  function AddAlbumPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({
      resolver: yupResolver(schema),
    });

    interface Artist {
      id: string
      name: string;
    }
    const [artistData, setData] = useState<Array<Artist>>();

    useEffect(() => {
      // POST request using fetch inside useEffect React hook
      async function getAllArtists(){
        const response = await fetch('http://127.0.0.1:8000/all_artists/')
        const data = await response.json();
        setData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     getAllArtists(); 
    }, []);

  
    const { heading, submitButton } = useStyles();

    const [artistId, setArtistId] = useState('');
  
    const [json, setJson] = useState<string>();

    const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent, ) => {
      setArtistId(event.target.value as string);
    };

    const addSong = () => {
      navigate('/addSong');
    };

    async function addAlbumReq(data: IFormInput){
  
      const response = await fetch('http://127.0.0.1:8000/add_album/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'} 
      });
  
      console.log(json)
  
      if (!response.ok) { /* Handle */ 
        console.log(response);
        throw new Error(`Error! status: ${response.status}`)
      }
  
   }

    const onSubmit = (data: IFormInput) => {
      console.log(data)
      setJson(JSON.stringify(data))
      addAlbumReq(data)
    };
  
    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Add an album
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Artists</InputLabel>
            <Select
              {...register("artistId")}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={artistId}
              label="Artists"
              onChange={handleChange}
            >
              {artistData?.map(ad =>
                <MenuItem value={ad.id}>{ad.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            {...register("album")}
            variant="outlined"
            margin="normal"
            label="Album Name"
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

        {/* <form onSubmit={addSong} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Add Song
          </Button>
        </form> */}
      </Container>
    );
  }
  
  export default AddAlbumPage;