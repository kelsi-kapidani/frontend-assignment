import { NavBar } from './Components/NavBar.tsx'
import { Outlet } from 'react-router'
import { Row } from 'antd'

function App() {

  return (
    <Row gutter={[0,40]} style={{backgroundColor:'#333333'}}>
      <NavBar></NavBar>
      <div>
      <Outlet />
      </div>
    </Row>
  )
}

export default App
