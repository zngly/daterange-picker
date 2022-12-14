import React, { useState } from 'react';
import { DateRangePicker } from 'src/daterange-picker';
import { Container, Button } from '@mui/material';

const Base = () => {
    const [open, setOpen] = useState(false);

    return (
        <Container>
            <Button onClick={() => setOpen(!open)} style={{ width: '100px', height: '50px' }}>
                Click Me
            </Button>
            <DateRangePicker className='daterange-picker-wrapper' open={open} onClose={() => setOpen(false)} />
        </Container>
    );
};

export default Base;
