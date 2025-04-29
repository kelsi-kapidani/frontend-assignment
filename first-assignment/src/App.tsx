import { NavBar } from './Components/NavBar.tsx'
import { Outlet } from 'react-router'
import { Row , Card } from 'antd'

function App() {

  return (
    <Row gutter={[0,40]} style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#333333'}}>
      <NavBar></NavBar>
      <div style={{ flex: 1 }}>
      <Outlet />
      </div>
      <Card
          bordered={false}
          style={{ background: '#333', color: '#F5B800', textAlign: 'center' , justifyContent: 'center' }}>
          Kelsi Kapidani ©2025
    </Card>
    </Row>
  )
}

export default App
