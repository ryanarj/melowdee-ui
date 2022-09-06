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
  import Select, { SelectChangeEvent } from '@mui/material/Select';
  import "../App.css";
  
  interface IFormInput {
    title: string;
    description: string;
    artist_id: string;
  }
  
  const schema = yup.object().shape({
    title: yup.string().required().min(2).max(25),
    description: yup.string().required().min(2)
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
  
  export interface Artist {
    id: string
    name: string;
  }

  function AddArticlePage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<IFormInput>({
      resolver: yupResolver(schema),
    });
  
    const { heading, submitButton } = useStyles();
  
    const [json, setJson] = useState<string>();

    const [artistId, setArtistId] = useState('');
    
    interface Artist {
        id: string
        name: string;
      }
    const [artistData, setArtistData] = useState<Array<Artist>>();

    useEffect(() => {
        // POST request using fetch inside useEffect React hook
        async function getAllArtists(){
          const response = await fetch('http://127.0.0.1:8000/all_artists/')
          const data = await response.json();
          setArtistData(data)
        
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
       }
       getAllArtists(); 
      }, []);
  
    async function addArticle(data: IFormInput){
        console.log(artistId)
        data.artist_id = artistId
        console.log(JSON.stringify(data))
      const response = await fetch('http://127.0.0.1:8000/add_article/', {
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
   const handleChange = (event: SelectChangeEvent) => {
    console.log('artistId')
    setArtistId(event.target.value);
    console.log(artistId)
  };
    const onSubmit = (data: IFormInput) => {
      console.log(data)
      setJson(JSON.stringify(data));
      addArticle(data);
    };
  
    return (
      <Container >
        <Typography className={heading} variant="h3">
          Add an article
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register("title")}
            variant="outlined"
            margin="normal"
            label="title"
            helperText={errors.title?.message}
            error={!!errors.title?.message}
            fullWidth
            required
          />
        <textarea 
            {...register("description")}
            className="articlefield"
         />
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
  
  export default AddArticlePage;