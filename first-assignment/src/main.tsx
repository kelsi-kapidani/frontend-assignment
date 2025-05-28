import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router'
import App from './App'
// import { Display } from './Components/non-API Variant/Display'
// import { FilmPage } from './Components/non-API Variant/FilmPage'
import { Home } from './Components/Home'
import { Profile } from './Components/Profile'
import { LogIn } from './Components/LogIn'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit/react'
import logInReducer from './Slices/loginSlice'
import profileIdReducer from './Slices/profileIdSlice'
import searchReducer from './Slices/searchSlice'
// import { SearchResult } from './Components/API Variant/SerachResult'
// import { MoviePage } from './Components/API Variant/MoviePage'
import { imdbAPI} from './Slices/imdbAPI'
import { RTKSearchResult } from './Components/RTK Redux Variant/RTKSearchResult'
import { RTKMoviePage } from './Components/RTK Redux Variant/RTKMoviePage'

const store = configureStore ({
  reducer: {
    logIn: logInReducer,
    profileId: profileIdReducer,
    search: searchReducer,
    [imdbAPI.reducerPath]: imdbAPI.reducer
  } ,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imdbAPI.middleware)
})

export type RootState = ReturnType<typeof store.getState>;

const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  children: [
    {
    path:'/profile/:id',
    element: <Profile />
    },
    {
      path:'/login',
      element: <LogIn />
      },
    {
    path:'/search',
    element: <RTKSearchResult />
    },
    {
    path:'/films/:id',
    element: <RTKMoviePage />
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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
