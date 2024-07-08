import React from 'react';
import { Meta, Story } from '@storybook/react';
import TableComponent from '../Components/TableComponent';

const meta = {
    title: 'TableComponent',
    component: TableComponent,
    argTypes: {
        dataObject: { control: 'object' },
    },
};
export default meta;

const Template = (args) => <TableComponent {...args} />;
export const data1 = Template.bind({});
data1.args = {
    dataObject: {
        headers: ['שם', 'גיל', 'עיר'],
        rows: [
            { id: 1, cells: ['יונתן', 25, 'תל אביב'] },
            { id: 2, cells: ['מיכל', 30, 'ירושלים'] },
        ],
    }
};

export const data2 = Template.bind({});
data2.args = {
    dataObject: {
        headers: ['שם', 'מקצוע', 'גיל', 'עיר'],
        rows: [
            { id: 1, cells: ['אנגלית', 'יונתן', 25, 'תל אביב'] },
            { id: 2, cells: ['מיכל', 'חשבון', 30, 'ירושלים'] },
        ],
    }
};

