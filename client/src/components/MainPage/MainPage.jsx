import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    imgPath: './img/backgroundPng/cs1.png',
  },
  {
    imgPath: './img/backgroundPng/dota1.png',
  },
  {
    imgPath: './img/backgroundPng/pubg.png',
  },
];

function MainPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <AutoPlaySwipeableViews
      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
      index={activeStep}
      onChangeIndex={handleStepChange}
      enableMouseEvents
      interval={5000}
    >
      {images.map((step, index) => (
        <div key={step.label}>
          {Math.abs(activeStep - index) <= 2 ? (
            <Box
              component="img"
              sx={{
                display: 'block',
                overflow: 'hidden',
                width: '100%',
              }}
              src={step.imgPath}
            />
          ) : null}
        </div>
      ))}
    </AutoPlaySwipeableViews>
  );
}

export default MainPage;
