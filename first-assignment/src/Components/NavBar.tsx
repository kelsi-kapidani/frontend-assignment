import { Menu , Input , Row , Col , Dropdown , Checkbox , Flex , Drawer , Grid } from 'antd'
import { useNavigate } from 'react-router'
import { MenuOutlined , FilterOutlined , SearchOutlined } from '@ant-design/icons'
import { allGenres } from '../DB/films'
import { useState } from 'react'
import '../index.css'
import { useSelector } from 'react-redux'
import { RootState } from '../main'
import { useDispatch } from "react-redux";
import { setSearch } from "../Slices/searchSlice";

const { Search } = Input;
const { useBreakpoint } = Grid;

export function NavBar() {

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchText, setSearchText] = useState<string>('');
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const screens = useBreakpoint();
    
    // const loginStatus = useSelector((state:  RootState) => state.logIn.value);
    const profileId = useSelector((state:  RootState)  => state.profileId.value);
    

    const menu = (
        <div className='custom-checkbox-group'>
            <Checkbox.Group 
                style={{justifyContent: 'start', color:'#ffffff'}} 
                options={allGenres} 
                value={selectedGenres} 
                onChange={(checkedValues) => {setSelectedGenres(checkedValues);}}/> 
        </div>
    )
    const menuxs = (
        <div className='custom-checkbox-group2'>
            <Checkbox.Group 
                style={{justifyContent: 'space-around', color:'#ffffff', paddingTop:'10px',  paddingBottom:'10px'}} 
                options={allGenres} 
                value={selectedGenres} 
                onChange={(checkedValues) => {setSelectedGenres(checkedValues);}}/> 
        </div>
    )
    const search = (
        <Row justify='space-evenly' align="middle" style={{width:'100%',  marginTop:'5px',  marginBottom:'5px'}}>
            <Col>
                <Input
                    placeholder="search the name of a film" 
                    size="large" 
                    style={{ width: '250px', color: '#F5B800', borderColor: '#333333', backgroundColor: '#333333', fontSize:'22px' }}
                    className="custom-input"
                    value={searchText}
                    onChange={(e)=>{setSearchText(e.target.value)}}
                    onPressEnter={()=>{setOpen2(false);dispatch(setSearch({name: searchText, genres: selectedGenres}));setSelectedGenres([]);setSearchText('');navigate(`/search?name=${searchText}&genres=${selectedGenres}`)}}/>
            </Col>
            <Col>
                <Dropdown 
                    overlay={menuxs} 
                    placement='bottom'
                    overlayStyle={{ marginTop:'15px', width: '100%',  backgroundColor:'#444444' , zIndex: '100'}} 
                    trigger={['click']}>
                    {<FilterOutlined style={{fontSize:"40px" , justifyContent:"center" , color:'#F5B800'}}/>}
                </Dropdown>
            </Col>
        </Row>
    )

    if (screens.xs) {
        return (
        <Row 
            justify='space-evenly' 
            align="middle" 
            style={{ padding: '10px 20px', width: '100%' , backgroundColor:'#F5B800'}}>
            <Col 
                style={{fontSize: '40px' , marginLeft: '5px', cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} 
                onClick={()=>navigate('/home')}>IMDB</Col>
            <Col flex="auto">
                <Row justify='end' align="middle">
                    <Dropdown 
                        overlay={search} 
                        placement='bottom'
                        overlayStyle={{ width: '100%',  backgroundColor:'#444444'}} 
                        trigger={['click']}
                        open={open2}
                        onOpenChange={setOpen2}
                        className='custom-dropdown'>
                        {<SearchOutlined style={{fontSize:"40px" , justifyContent:"center" , color:'#333333', marginRight:'20px'}}/>}
                    </Dropdown>
                    <MenuOutlined style={{fontSize:'35px' , color:'#333333'}} onClick={()=>setOpen(true)}/>
                    <Drawer width='200' style={{backgroundColor:'#333333'}} maskClosable={true}  closable={false} onClose={()=>setOpen(false)} open={open}>
                        <Menu className="custom-menu" style={{backgroundColor:'#333333'}}>
                            <Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setSelectedGenres([]);setOpen(false);navigate('/home')}}>Home</Menu.Item>
                            {(profileId>-1)&&<Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setSelectedGenres([]);setOpen(false);navigate(`/profile/${profileId}`)}}>My Profile</Menu.Item>}
                            <Menu.Item style={{color:'#FFFFFF'}} onClick={()=>{dispatch(setSearch({name: '', genres: []}));setSelectedGenres([]);setOpen(false);navigate(`/search?name=&genres=`)}}>Library</Menu.Item>
                            {(profileId===-1)&&<Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setSelectedGenres([]);setOpen(false);navigate('/login')}}>Log In</Menu.Item>}
                            <Menu.Item style={{color:'#FFFFFF'}}>Contact</Menu.Item>
                        </Menu>
                    </Drawer>
                </Row>
            </Col>
        </Row>
        )
    }
    return (
        <Row 
            justify='space-evenly' 
            align="middle" 
            style={{ padding: '10px 20px', width: '100%' , backgroundColor:'#F5B800'}}>
            <Col 
                style={{fontSize: '30px' , marginLeft: '5px', cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} 
                onClick={()=>navigate('/home')}>IMDB</Col>
            <Col flex="auto">
                <Flex align="center" justify="center" gap="small">
                    <Search 
                        placeholder="search the name of a film" 
                        size="large" 
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onSearch={(value)=>{dispatch(setSearch({name: searchText, genres: selectedGenres}));setSelectedGenres([]);setSearchText('');navigate(`/search?name=${value}&genres=${selectedGenres}`)}}
                        style={{ width: '250px' ,
                            color: '#FFF099',    
                            borderColor: '#333333'}}
                            className="custom-search"
                            enterButton/>
                    <Dropdown 
                        overlay={menu} 
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
                        {(profileId>-1)&&<Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setSelectedGenres([]);setOpen(false);navigate(`/profile/${profileId}`)}}>My Profile</Menu.Item>}
                        <Menu.Item style={{color:'#FFFFFF'}} onClick={()=>{setSelectedGenres([]);setOpen(false);navigate(`/search?name=&genres=`)}}>Library</Menu.Item>
                        <Menu.Item style={{color:'#FFFFFF'}}>Contact</Menu.Item>
                        {(profileId===-1)&&<Menu.Item style={{color:'#FFFFFF'}} onClick={()=> {setSelectedGenres([]);setOpen(false);navigate('/login')}}>Log In</Menu.Item>}
                    </Menu>
                </Drawer>
            </Col>
        </Row>
    )
}