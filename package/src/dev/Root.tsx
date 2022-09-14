import React from 'react';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Container, Typography, Box, Divider, Stack } from '@mui/material';
import { Link, Outlet, useOutlet } from 'react-router-dom';
import Page from './Page';

const CustomGrid = (props: { children: React.ReactNode }) => {
    const sizes = {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
    };

    return (
        <Grid {...sizes}>
            <Box>{props?.children}</Box>
        </Grid>
    );
};

const Root = () => {
    const outlet = useOutlet();

    return (
        <Page>
            {outlet ? (
                <Outlet />
            ) : (
                <Container className='Root' sx={{ padding: 1 }}>
                    <Stack direction='row' justifyContent='center'>
                        <Typography variant='h3'>Scenarios</Typography>
                    </Stack>

                    <Divider />

                    <Grid container spacing={2}>
                        <CustomGrid>
                            <Link to='base'>Base</Link>
                        </CustomGrid>
                    </Grid>
                </Container>
            )}
        </Page>
    );
};

export default Root;
