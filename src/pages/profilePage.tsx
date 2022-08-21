import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";
  import Grid from '@mui/material/Grid';
  import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Link from "@mui/material/Link";

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
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

  
  function ProfilePage() {
    
    const [data, setData] = useState<Array<Artist>>();

    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();


    useEffect(() => {
      fetch('http://127.0.0.1:8000/all_artists/')
        .then(response => response.json())
        .then(response => setData(response));
    }, []);

    console.log(data)

    const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
      localStorage.setItem('artist_id', id)
      navigate('/artistPage');
    };

    const onAddArtistSubmit = () => {
      navigate('/addArtist');
    };
  
    const onAddAlbumSubmit = () => {
      navigate('/addAlbum');
    };

    return (
      <Container maxWidth="xs">
        <Typography className={heading} variant="h3">
          Profile Page 
        </Typography>
        <Typography className={heading} variant="h3">
          Artists
        </Typography>
          <>
                <Grid container spacing={5}>
                  <Box component="div" width={100} height={80} sx={{
                      display: 'block',
                      p: 1,
                      m: 1,
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
                      border: '1px solid',
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                      borderRadius: 2,
                      fontSize: '0.875rem',
                      fontWeight: '700',
                    }}>
                    {data?.map(d =>

                    <Grid item xs={30}>
                      <Link onClick={(e) => handleClick(e, d.id)}>{d.name}</Link>
                    </Grid>
                    
                    )}
                  </Box>
                </Grid>
            </>

        <form onSubmit={onAddArtistSubmit} noValidate>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={submitButton}
            >
            Add artist
          </Button>
        </form>
        <form onSubmit={onAddAlbumSubmit} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Add album
          </Button>
        </form>
      </Container>
    );
  }
  
  export default ProfilePage;