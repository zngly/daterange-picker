import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {
    children: React.ReactNode;
};

const Page = (props: Props) => {
    const match = useMatch('/');
    const navigate = useNavigate();

    // get the last part of the url
    const location = useLocation();
    const path = location.pathname.split('/').pop();

    return (
        <div className='app'>
            <header>
                <AppBar position='static'>
                    <Toolbar sx={{ justifyContent: 'space-between' }}>
                        {!match && (
                            <IconButton
                                size='large'
                                edge='start'
                                color='inherit'
                                aria-label='menu'
                                sx={{ mr: 2 }}
                                onClick={() => navigate('/')}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                        )}
                        <Typography variant='h5' component='div' sx={{ flexGrow: 1 }}>
                            @zngly/date-range-picker
                        </Typography>
                        <Typography variant='h6' component='div' sx={{ flexGrow: 1, textTransform: 'capitalize' }}>
                            {path}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </header>
            <main>{props.children}</main>
            <footer>{/*  */}</footer>
        </div>
    );
};

export default Page;
