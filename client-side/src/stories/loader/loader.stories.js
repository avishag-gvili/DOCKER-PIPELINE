
import React from 'react';
import GenericInput from '../inputs/genericInput';
import PersonIcon from '@mui/icons-material/Person';
import Loader from './loader';

export default {
  title: 'GenericLoad',
  component: Loader,
  }


const Template = (args) => <Loader {...args} />;


export const Primary = Template.bind({});
Primary.args ={
    className:"primary",
}

export const Secondary = Template.bind({});
Secondary.args = {
    className: "secondary",
}
