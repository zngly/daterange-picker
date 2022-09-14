import React, { useState } from 'react';
import { DateRangePicker } from 'src/daterange-picker';
import { Container, Button } from '@mui/material';

const Base = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    return (
        <Container>
            <Button onClick={toggle} style={{ width: '100px', height: '50px' }}>
                Click Me
            </Button>
            <DateRangePicker
                open={open}
                onChange={() => {}}
                toggle={() => {
                    setOpen(!open);
                }}
                className='daterange-picker-wrapper'
            />
        </Container>
    );
};

export default Base;
