import { Menu , Input , Row , Col , Dropdown , Checkbox , Flex , Drawer } from 'antd'
import { useNavigate } from 'react-router'
import { MenuOutlined , FilterOutlined} from '@ant-design/icons'
import { allGenres } from '../DB/films'
import { useState } from 'react'
import '../index.css'

const { Search } = Input;


export function NavBar() {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()

    const menu2 = (
        <div className='custom-checkbox-group'>
        <Checkbox.Group style={{justifyContent: 'start', color:'#ffffff'}} options={allGenres} value={selectedGenres} onChange={(checkedValues) => {setSelectedGenres(checkedValues);  console.log('Checked values:', checkedValues);}}/> 
        </div>
    )
 
    return (
        <Row justify='space-evenly' align="middle" style={{ padding: '10px 20px', width: '100%' , backgroundColor:'#F5B800'}}>
        <Col style={{fontSize: '30px' , marginLeft: '5px', cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} onClick={()=>navigate('/home')}>IMDB</Col>
        <Col flex="auto">
        <Flex align="center" justify="center" gap="small">
        <Search 
            placeholder="search the name of a film" 
            size="large" 
            onSearch={(value)=>{setSelectedGenres([]);navigate(`/search?name=${value}&genres=${selectedGenres}`)}}
            style={{ width: '250px' ,
                color: '#FFF099',    
                borderColor: '#333333'}}
            className="custom-search"
            enterButton
        />
        <Dropdown 
            overlay={menu2} 
            placement='bottomRight'
            overlayStyle={{ marginTop:'15px', width: 290,  backgroundColor:'#444444', borderRadius:'5px'}} 
            trigger={['click']}>
            {<FilterOutlined style={{fontSize:"30px" , justifyContent:"center" , color:'#333333'}}/>}
        </Dropdown>
        </Flex>
        </Col>
        <Col>
        <MenuOutlined style={{fontSize:'25px' , color:'#333333'}} onClick={()=>setOpen(true)}/>
        <Drawer width='200' style={{backgroundColor:'#333333'}} maskClosable={true}  closable={false} onClose={()=>setOpen(false)} open={open}>
        <Menu className="custom-menu" style={{backgroundColor:'#333333'}}>
            <Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setSelectedGenres([]);setOpen(false);navigate('/home')}}>Home</Menu.Item>
            <Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setSelectedGenres([]);setOpen(false);navigate('/profile')}}>My Profile</Menu.Item>
            <Menu.Item style={{color:'#FFFFFF'}} onClick={()=>{setSelectedGenres([]);navigate(`/search?name=&genres=`)}}>Library</Menu.Item>
            <Menu.Item style={{color:'#FFFFFF'}}>Contact</Menu.Item>
        </Menu>
        </Drawer>
        </Col>
        </Row>
    )
}