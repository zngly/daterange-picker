import React from 'react';
import { Container } from '@mui/system';
import { DateRangePicker } from 'src/daterange-picker';
import { Button, Popper, Grow, Paper } from '@mui/material';

const PopperDemo = () => {
    const [open, setOpen] = React.useState(false);

    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        console.log(open);
        if (!open) setOpen(true);
        else setOpen(false);
    };

    return (
        <Container sx={{ padding: 2 }}>
            <Button ref={anchorRef} onClick={handleToggle}>
                Open DateRange Picker
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement='bottom'
                transition
                disablePortal={false}
            >
                {({ TransitionProps }) => {
                    return (
                        <Grow {...TransitionProps}>
                            <Paper>
                                <DateRangePicker
                                    open={open}
                                    onClose={() => setOpen(false)}
                                    minDate={new window.Date('2022-01-01')}
                                    maxDate={new window.Date()}
                                />
                            </Paper>
                        </Grow>
                    );
                }}
            </Popper>
        </Container>
    );
};

export default PopperDemo;
