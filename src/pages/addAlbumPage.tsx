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
  import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface IFormInput {
  artist_id: string;
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

  const handleChange = (event: SelectChangeEvent) => {
    console.log('artistId')
    setArtistId(event.target.value);
    console.log(artistId)
  };

  async function addAlbum(data: IFormInput){
    console.log(artistId)
    data.artist_id = artistId
    console.log(JSON.stringify(data))
    const response = await fetch('http://127.0.0.1:8000/add_album/', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      } 
    });

    console.log(response.ok)

    if (!response.ok) { /* Handle */ 
      console.log(response);
      throw new Error(`Error! status: ${response.status}`)
    }

 }

  const onSubmit = (data: IFormInput) => {
    console.log(data)
    setJson(JSON.stringify(data));
    addAlbum(data)
  };

  return (
    <Container maxWidth="xs">
      <br/>
      <br/>
      <br/>
      <Typography className={heading} variant="h3">
        Add an album
      </Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Artists</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={artistId}
              label="Artists"
              onChange={handleChange}
            >
              {artistData?.map(ad =>
                <MenuItem 
                value={ad.id}>
                  {ad.name}
                </MenuItem>
              )}
          </Select>
      </FormControl>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          {...register("name")}
          variant="outlined"
          margin="normal"
          label="Album"
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
    </Container>
  );
}

export default AddAlbumPage;


