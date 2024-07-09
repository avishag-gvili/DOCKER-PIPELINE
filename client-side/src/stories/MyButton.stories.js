import React from "react";

import MyButton from '../components/MyButton';


export default{
    title: 'Components/MyButton',
    component: MyButton,
    argTypes:{
        className:{ control: {type: 'select', options:['primary','secondary']}},
    }
};


// Button variations

const Template = (args) => <MyButton {...args}/>;

export const Primary = Template.bind({});
Primary.args ={
    className:"primary",
    label: "primary button",
    size: "medium"
}

export const Secondary = Template.bind({});
Secondary.args = {
    className: "secondary",
    label: "secondary button",
    size: "medium"
}

