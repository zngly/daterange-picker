import React from 'react';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Container, Typography, Box, Divider, Stack, Card } from '@mui/material';
import { Link, Outlet, useOutlet } from 'react-router-dom';
import Page from './Page';

import './Root.css';
import Paper from '@mui/material/Paper';

const CustomGrid = (props: { to: string; name: string }) => {
    const sizes = {
        xs: 12,
        sm: 6,
        md: 4,
        lg: 3,
    };

    return (
        <Grid {...sizes} className='root-grid'>
            <Link className='link' to={props.to}>
                <Card className='card' sx={{ padding: 1 }}>
                    <Typography variant='body1' style={{ color: 'black' }}>
                        {props.name}
                    </Typography>
                </Card>
            </Link>
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
                <Container className='root' sx={{ padding: 1 }}>
                    <Paper elevation={1} sx={{ padding: 1, minHeight: '80vh', border: '1px solid gray' }}>
                        <Stack direction='row' justifyContent='center'>
                            <Typography variant='h3'>Scenarios</Typography>
                        </Stack>

                        <Divider sx={{ marginBottom: 2 }} />

                        <Grid container spacing={2}>
                            <CustomGrid to='scenario/base' name='Base' />
                            <CustomGrid to='scenario/specific-date-range' name='SpecificDateRange' />
                        </Grid>
                    </Paper>
                </Container>
            )}
        </Page>
    );
};

export default Root;
