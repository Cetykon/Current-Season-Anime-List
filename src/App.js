import React, { useEffect, useState } from "react";
import {
  DataGrid
} from "@mui/x-data-grid";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import './App.css';
import LogoImage from './images/supercoil-svgrepo-com.svg';

function App() {

  const [anime, setAnime] = useState([]);
  
  useEffect(() => {
    // Hook executes once after first render
    fetchAnime();
  }, []);

  
  const fetchAnime = () => {
    fetch("https://api.jikan.moe/v4/seasons/now?sfw")
      .then((response) => response.json())
      .then((data) => {setAnime(data.data);}) // each anime is contain in the data field
      .catch((err) => console.error(err));
  };

  // Defining the MUI table
  const columns = [
    { 
      field: "image", headerName: "Image", width: 150, renderCell: (params) => 
      (<img src={params.row.images.jpg.image_url} alt="Anime" style={{ width: 80}} />)
    },
    { field: "title", headerName: "Title", width: 300 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "source", headerName: "Source", width: 150 },
    //This field is nested so we need to access it with a valueGetter call back function
    { field: "aired_string", headerName: "Airing Date", width: 250, valueGetter: (params) => params.row.aired.string }, 
    { field: "score", headerName: "Score", width: 75 },
    {
      field: 'customSynapsis',
      headerName: 'Synapsis',
      width: 100,
      renderCell: () => (
        <div>
          <p>(Click)</p>
        </div>
      ),
    },
  ];

  const handleRowClick = (params) => {
    // Customize the alert message based on the clicked row data
    alert(`Synapsis:  ${params.row.synopsis}`); //String interpolation ${} allows you to embed expressions or variables within a string
  };

  return (
    <div className="App" >
      <AppBar position="static" style={{ backgroundColor: '#0b1436' }}>
        <Toolbar style={{ justifyContent: 'center' }}>
          <IconButton edge="start" aria-label="logo">
            <img src={LogoImage} alt="Logo" style={{ width: 40, height: 40 }} />
          </IconButton>
          <Typography variant="h5" >This Season Anime List</Typography>
        </Toolbar>
      </AppBar>

      <div className = "Container" >
        <div className = "dataGridContainer" style={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={anime}
            columns={columns}
            disableSelectionOnClick={true}
            getRowId={(row) => row.mal_id} // mal_id is a unique identifier for each anime
            rowHeight={120} //Changing the default row hight
            onRowClick={handleRowClick} // Call handleRowClick function on row click
          />
        </div>
      </div>
      
      <AppBar position="static" style={{ backgroundColor: '#0b1436' }}>
        <Toolbar>
          <Typography variant="h5" ></Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
