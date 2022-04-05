import React, { Component, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useNavigationState} from './../contexts/navigation'



 function ZoomButton(){

    const {scaleFactor,setScaleFactor} = useNavigationState();


   const handleZoomIn = (e) => { 
    console.log("zoom in", scaleFactor);
    setScaleFactor(scaleFactor+0.1);
  };

   const handleZoomOut = (e) => {
    console.log("zoom out", scaleFactor);
    setScaleFactor(scaleFactor - 0.1)
  }
    return (
      <Grid container>
        <Grid item>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
          >
            <Button
              variant="contained"
              color="secondary"
              style={{
                minWidth: '40px',
                minHeight: '40px',
                lineHeight: '30px',
                fontSize: '20px',
                marginBottom: '2px',
              }}
              id= "in"
              onClick={handleZoomIn}
            >
              <b>+</b>
            </Button>

            <Button
              variant="contained"
              color="secondary"
              style={{
                minWidth: '40px',
                minHeight: '40px',
                lineHeight: '30px',
                fontSize: '20px',
                marginTop: '2px',
              }}
              id="out"
              onClick={handleZoomOut}
            >
              <b>-</b>
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    );
   
}

export default ZoomButton;
