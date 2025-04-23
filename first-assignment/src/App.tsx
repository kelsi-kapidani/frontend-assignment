import { NavBar } from './NavBar.tsx'
import { Outlet } from 'react-router'


function App() {

  return (
    <>
      <NavBar></NavBar>
      <div>
      <Outlet />
      </div>
    </>
  )
}

export default App
