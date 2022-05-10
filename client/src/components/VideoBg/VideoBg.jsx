/* eslint-disable react/prop-types */
import React from 'react';

function VideoBg({ bg }) {
  return (
    <div className="profile_animated_background" style={{ height: '100%' }}>
      <video
        style={{
          zIndex: '-1',
          position: 'absolute',
          minWidth: '100%',
          minHeight: '100%',
          width: '1vw',
          height: 'auto',
          overflow: 'hidden',
        }}
        playsInline
        autoPlay
        muted
        loop
      >
        <source src={bg} type="video/webm" />
      </video>
    </div>
  );
}

export default VideoBg;
