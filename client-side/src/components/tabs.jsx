
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './stylies/tabs.scss'


export default function LabTabs({ nameOfClass = "every-tabs", text = [], nav=[]}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const handleTabClick = (index) => {
    if (nav && nav[index]) {
      navigate(nav[index]);
    }
    debugger
  };

  return (
    <div className='div'>
    <Box sx={{ width: '100%'}} >
      <Tabs value={value} onChange={handleChange} centered
              TabIndicatorProps={{
                className: 'tabs', 
              }}>
        {Array.isArray(text) && text.map((label, index) => (
          <Tab  className={nameOfClass} key={index} label={label} onClick={() => handleTabClick(index)}/>
        ))}
      </Tabs>
    </Box>
    </div>
  );
}

LabTabs.propTypes = {
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  nameOfClass: PropTypes.string,
  nav:PropTypes.arrayOf(PropTypes.string).isRequired
};

LabTabs.defaultProps = {
  nameOfClass: "every-tabs"
};