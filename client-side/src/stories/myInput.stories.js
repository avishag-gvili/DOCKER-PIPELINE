
import React from 'react';
import MyInput from '../inputs/myInput';
import PersonIcon from '@mui/icons-material/Person';


export default {
  title: 'Components/StyledInput',
  component: MyInput,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium'],
      },
    },
  },
};

const Template = (args) => <MyInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Enter your details',
  type: 'text',
};

export const InputWithPlaceholder = Template.bind({});
InputWithPlaceholder.args = { 
  type: 'text',
  placeholder: 'This is Placeholder',
};

export const InputWithError = Template.bind({});
InputWithError.args = {
  label: 'Enter your details',
  type: 'text',
  helperText: 'Error message',
  error: true,
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  
  type: 'email',
  placeholder: 'example@example.com',
  
};

export const InputWithIcon = Template.bind({});
InputWithIcon.args = {
  label: 'input with icon',  
  icon:PersonIcon,
};

export const NumberInput = Template.bind({});
NumberInput.args = {
  label: 'Choose number',
  type: 'number',
  size: 'small',
 
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  label: 'Disabled Input',
  type: 'text',
  disabled: true,
};

export const TimeInput = Template.bind({});
TimeInput.args = {
  
  type: 'time', 
 size:'medium'
  
};

export const PasswordInput = Template.bind({});
PasswordInput.args = {
  label: 'Enter password',
  type: 'password',
  
};

