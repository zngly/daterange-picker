import { Container } from '@mui/system';
import React from 'react';
import { DateRangePicker } from 'src/daterange-picker';

const SpecificDateRange = () => {
    return (
        <Container sx={{ padding: 2 }}>
            <DateRangePicker
                open={true}
                onChange={() => {}}
                toggle={() => {}}
                minDate={new Date('2020-01-01')}
                maxDate={new Date('2022-12-31')}
            />
        </Container>
    );
};

export default SpecificDateRange;
