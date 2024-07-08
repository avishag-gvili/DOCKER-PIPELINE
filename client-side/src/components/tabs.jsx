// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// export default function LabTabs({nameOfClass, text}) {
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
//                 <p>{text}</p>

//       <Tabs value={value} onChange={handleChange} centered>
//         <Tab label="Item One" />
//         <Tab label="Item Two" />
//         <Tab label="Item Three" />
//       </Tabs>
//     </Box>
//   );
// }

import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './stylies/tabs.scss'
export default function LabTabs({ nameOfClass, text = [] }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}} >
      <Tabs value={value} onChange={handleChange} centered>
        {Array.isArray(text) && text.map((label, index) => (
          <Tab  className={nameOfClass} key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
}