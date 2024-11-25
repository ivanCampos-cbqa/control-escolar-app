import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import './index.css'
import { appRouters } from '@data/routes'
import { useUsersStore } from '@store/useUsersStore'

useUsersStore.getState();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={appRouters}/>
  </StrictMode>,
);
