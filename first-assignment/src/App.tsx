import { NavBar } from './NavBar.tsx'
import { Outlet } from 'react-router'
import { Row } from 'antd'

function App() {

  return (
    <Row gutter={[0,40]}>
      <NavBar></NavBar>
      <div>
      <Outlet />
      </div>
    </Row>
  )
}

export default App
