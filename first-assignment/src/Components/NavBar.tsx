import { Menu , Input , Row , Col , Dropdown , Checkbox , Flex , Drawer } from 'antd'
import { useNavigate } from 'react-router'
import { MenuOutlined , FilterOutlined} from '@ant-design/icons'
import { allGenres } from '../films'
import { useState } from 'react'
import '../index.css'

const { Search } = Input;


export function NavBar() {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const menu2 = (
        <Checkbox.Group style={{justifyContent: 'start'}} options={allGenres} value={selectedGenres} onChange={(checkedValues) => {setSelectedGenres(checkedValues);  console.log('Checked values:', checkedValues);}}/> 
    )
 
    return (
        <Row justify='space-evenly' align="middle" style={{ padding: '10px 20px', width: '100%' , backgroundColor:'#F5B800'}}>
        <Col style={{fontSize: '30px' , marginLeft: '5px', cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} onClick={()=>navigate('/')}>IMDB</Col>
        <Col flex="auto">
        <Flex align="center" justify="center" gap="small">
        <Search 
            placeholder="search the name of a film" 
            size="large" 
            onSearch={(value)=>navigate(`/search?name=${value}&genres=${selectedGenres}`)}
            style={{ width: '250px' ,
                color: '#FFF099',    
                borderColor: '#333333'}}
            className="custom-search"
            enterButton
        />
        <Dropdown 
            overlay={menu2} 
            placement='bottomRight'
            overlayStyle={{ marginTop:'10px', width: 280,  backgroundColor:'#f0f0f0', borderRadius:'5px'}} 
            trigger={['click']}>
            {<FilterOutlined style={{fontSize:"30px" , justifyContent:"center" , color:'#333333'}}/>}
        </Dropdown>
        </Flex>
        </Col>
        <Col>
        <MenuOutlined style={{fontSize:'25px' , color:'#333333'}} onClick={()=>setOpen(true)}/>
        <Drawer width='200' style={{backgroundColor:'#333333'}} maskClosable={true}  closable={false} onClose={()=>setOpen(false)} open={open}>
        <Menu className="custom-menu" style={{backgroundColor:'#333333'}}>
            <Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setOpen(false);navigate('/profile')}}>My Profile</Menu.Item>
            <Menu.Item style={{color:'#FFFFFF'}}>Library</Menu.Item>
            <Menu.Item style={{color:'#FFFFFF'}}>Contact</Menu.Item>
        </Menu>
        </Drawer>
        </Col>
        </Row>
    )
}