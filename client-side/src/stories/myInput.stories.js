
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
        options: ['small', 'medium', 'large'],
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
  startIcon: <PersonIcon />,
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

// import React from 'react';
// import MyInput from '../inputs/myInput';

// export default {
//   title: 'Components/MyInput',
//   component: MyInput,
//   argTypes: {
//     label: { control: 'text' },
//     type: { control: 'select', options: ['text', 'email', 'password', 'number'] },
//     value: { control: 'text' },
//     onChange: { action: 'changed' },
//     size: { control: { type: 'select', options: ['small', 'medium', 'large'] } },
//     startIcon: { control: 'boolean' },
//     validation: { control: null }, 
//     disabled: { control: 'boolean' }, 
//   },
// };

// const Template = (args) => <MyInput {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   label: 'Enter your details',
//   type: 'text',
// };


//מה שלמעלה זה כל מיני סוגי שימוש באינפוט ומה שמיורק זה האפשרות לעשות 'סיפור' אחד ובסטוריבוק לשחק עם כל ההגדרות
//שימי לב להבדלים 

