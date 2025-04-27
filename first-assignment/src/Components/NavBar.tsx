import { Input , Row , Col,  Menu , Dropdown , Checkbox , Flex } from 'antd'
import { useNavigate } from 'react-router'
import { MenuOutlined , FilterOutlined} from '@ant-design/icons'
import { allGenres } from '../films'
import { useState } from 'react'

const { Search } = Input;

export function NavBar() {

    const [selectedGenres, setSelectedGenres] = useState([]);

    const navigate = useNavigate()

    const menu1 = (
        <Menu>
            <Menu.Item key="1" onClick={()=> navigate('/profile')}>My Profile</Menu.Item>
        </Menu> 
    )

    const menu2 = (
        <Checkbox.Group style={{justifyContent: 'start'}} options={allGenres} value={selectedGenres} onChange={(checkedValues) => {setSelectedGenres(checkedValues);  console.log('Checked values:', checkedValues);}}/> 
    )
 
    return (
        <Row justify='space-evenly' align="middle" style={{ padding: '10px 20px', width: '100%' }}>
        <Col style={{fontSize: '30px' , marginLeft: '5px', cursor:'pointer'}} onClick={()=>navigate('/')}>IMDB</Col>
        <Col flex="auto">
        <Flex align="center" justify="center" gap="small">
        <Search 
            placeholder="search the name of a film" 
            size="large" 
            onSearch={(value)=>navigate(`/search?name=${value}&genres=${selectedGenres}`)}
            style={{ width: '250px' }}
        />
        <Dropdown 
            overlay={menu2} 
            placement='bottomRight'
            overlayStyle={{ marginTop:'10px', width: 280,  backgroundColor:'#f0f0f0', borderRadius:'5px'}} 
            trigger={['click']}>
            {<FilterOutlined style={{fontSize:"30px" , justifyContent:"center"}}/>}
        </Dropdown>
        </Flex>
        </Col>
        <Col>
        <Dropdown overlay={menu1} trigger={['click']} placement="bottomLeft">
        <MenuOutlined style={{ fontSize: '30px', marginTop: '5px'}} />
        </Dropdown>
        </Col>
        </Row>
    )
}