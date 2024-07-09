import React from "react";
// import {action} from '@storybook/addon-actions';

import MyButton from '../components/MyButton';


export default{
    title: 'Components/MyButton',
    component: MyButton,
    argTypes:{
        label:{ control: 'text'},
        className:{ control: {type: 'select', options:['primary','secondary']}},
        size:{ control:{ type: 'select', options:['small','medium','large']}},
        
    }
};

// Button variations

const Template = (args) => <MyButton {...args}/>;

export const Primary = Template.bind({});
Primary.args ={
    className:"primary",
    label: "primary button"
}

export const Secondary = Template.bind({});
Secondary.args = {
    className: "secondary",
    label: "secondary button"
}

// export const Small = Template.bind({});
// Small.args = {
//     size:"small",
//     label:"small button",
// };

// export const Medium = Template.bind({});
// Medium.args = {
//     size:"medium",
//     label:"medium button",
// };

// export const Large = Template.bind({});
// Large.args = {
//     size:"large",
//     label:"large button",
// };
