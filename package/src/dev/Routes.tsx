import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';

import Root from './Root';
import Base from './scenario/Base';
import SpecificDateRange from './scenario/SpecificDateRange';

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/');
    }, []);

    return <></>;
};

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Root />} errorElement={<Error />}>
                <Route path='scenario'>
                    <Route path='base' element={<Base />} />
                    <Route path='specific-date-range' element={<SpecificDateRange />} />
                </Route>
            </Route>
        </>
    )
);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
