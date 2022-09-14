import React, { useState } from 'react';
import { DateRangePicker } from 'src/daterange-picker';
import Page from '../Page';

type Props = {};

const Base = (props: Props) => {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    return (
        <div className='App'>
            <button onClick={toggle} style={{ width: '100px', height: '50px' }}>
                Click Me
            </button>
            <DateRangePicker
                open={open}
                onChange={() => {}}
                toggle={() => {
                    setOpen(!open);
                }}
                className='daterange-picker-wrapper'
            />
        </div>
    );
};

export default Base;
