import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router'
import App from './App'
import { Display } from './Components/Display'
import { FilmPage } from './Components/FilmPage'
import { Home } from './Components/Home'


const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  children: [
    {
    path:'/profile',
    },
    {
    path:'/search',
    element: <Display />
    },
    {
    path:'/films/:id',
    element: <FilmPage />
    },
    {
    path:'/home',
    element: <Home />
    }
  ]
}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
