
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './stylies/tabs.scss'
import { useNavigate } from 'react-router-dom';

export default function LabTabs({ nameOfClass, text = [], nav=[],theFunction}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%'}} >
      <Tabs value={value} onChange={handleChange} centered
              TabIndicatorProps={{
                className: 'c', 
              }}>
        {Array.isArray(text) && text.map((label, index) => (
          <Tab  className={nameOfClass} key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
}