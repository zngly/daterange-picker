import React from 'react';
import { Container } from '@mui/system';
import { DateRangePicker } from 'src/daterange-picker';

const SpecificDateRange = () => {
    return (
        <Container sx={{ padding: 2 }}>
            <DateRangePicker
                open={true}
                onChange={() => {}}
                onClose={() => {}}
                minDate={new Date('2020-01-10')}
                maxDate={new Date('2022-12-10')}
            />
        </Container>
    );
};

export default SpecificDateRange;
