/* eslint-disable react/prop-types */
import React from 'react';
import { SpeedDialAction, SpeedDial } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

export default function DialogsButton({ handleClickOpenChat }) {
  const actions = [
    { icon: <FileCopyIcon />, name: 'Copy' },
    { icon: <SaveIcon />, name: 'Save' },
    { icon: <PrintIcon />, name: 'Print' },
    { icon: <ShareIcon />, name: 'Share' },
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<MailOutlineIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          onClick={handleClickOpenChat}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}
