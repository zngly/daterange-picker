import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Root from './Root';
import Base from './scenario/Base';
import Popper from './scenario/Popper';
import SpecificDateRange from './scenario/SpecificDateRange';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Root />}>
                <Route path='scenario'>
                    <Route path='base' element={<Base />} />
                    <Route path='specific-date-range' element={<SpecificDateRange />} />
                    <Route path='popper' element={<Popper />} />
                </Route>
            </Route>
        </>
    )
);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
