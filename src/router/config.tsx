
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HomePage = lazy(() => import('../pages/home/page'));
const CandidatePage = lazy(() => import('../pages/candidate/page'));
const HRPage = lazy(() => import('../pages/hr/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/candidate',
    element: <CandidatePage />
  },
  {
    path: '/hr',
    element: <HRPage />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
