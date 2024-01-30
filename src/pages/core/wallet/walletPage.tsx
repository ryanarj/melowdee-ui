import {
    makeStyles,
    Container,
    Typography,
    Button,
  } from "@material-ui/core";
  import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from "react";

import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';

  
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
    name: string
    about: string;
  }

  export interface Wallet {
    balance: BigInteger;
    about: string;
  }

  function WalletPage() {
    
    const [artistData, setArtistData] = useState<Artist>();

    const [walletData, setWalletData] = useState<Wallet>();

    const { heading, submitButton} = useStyles();

    const navigate = useNavigate();

    
    useEffect(() => {
      // GET request using fetch inside useEffect React hook
      async function grabArtistData(){
        const artist_id = localStorage.getItem('artist_id')
        console.log('grabArtistData')
        console.log(artist_id)
        const response = await fetch('http://127.0.0.1:8000/artists?artist_id=' + artist_id)
        const data = await response.json();
        setArtistData(data)
      
      // empty dependency array means this effect will only run once (like componentDidMount in classes)
     }
     grabArtistData(); 
    }, []);

    useEffect(() => {
        // GET request using fetch inside useEffect React hook
        async function getWalletAccountBalance(){
          const artistId = localStorage.getItem('artist_id')
          console.log(artistId)
          const response = await fetch('http://127.0.0.1:8000/wallet?artist_id=' + artistId)
          const data = await response.json();
          setWalletData(data)
        
        // empty dependency array means this effect will only run once (like componentDidMount in classes)
       }
       getWalletAccountBalance(); 
      }, []);
    
    console.log(artistData)

    const onAddAlbumSubmit = () => {
      navigate('/addAlbum');
    };

    return (
      <Container fixed>
        <br />
        <br />
        <br />
        <Typography className={heading} variant="h3">
            {artistData?.name} About
        </Typography>
        <>
            <Typography variant="h5">{artistData?.about}</Typography>
        </>

        <Typography className={heading} variant="h3">
          Artist Wallet
        </Typography>
              <>
              
                <Grid container spacing={5}>
                    
                  <Box component="div" width={1500}  sx={{
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
                    <>
                        <Typography variant="h5">{walletData?.balance}</Typography>
                    </>
                  </Box>
                </Grid>
            </>
        <form onSubmit={onAddAlbumSubmit} noValidate>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={submitButton}
          >
            Cash out
          </Button>
        </form>
      </Container>
    );
  }
  
  export default WalletPage;