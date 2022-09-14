import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Root from './Root';
import Base from './scenario/Base';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<Root />}>
                <Route path='base' element={<Base />} />
            </Route>
        </>
    )
);

const AppRoutes = () => <RouterProvider router={router} />;

export default AppRoutes;
