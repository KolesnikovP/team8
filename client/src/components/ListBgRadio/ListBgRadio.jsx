/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import { FormControl, Box } from '@mui/material';
import React from 'react';
import './style.css';

function ListBgRadio({ bg }) {
  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <Box component="label" className="radio-control">
      <FormControl component="input" type="radio" name="bgVideoId" value={bg.id} />
      <span className="radio-input">
        {bg && (
          <video playsInline autoPlay muted loop>
            <source src={bg.link} type="video/webm" />
          </video>
        )}
      </span>
    </Box>
  );
}

export default ListBgRadio;
