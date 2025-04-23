import { Input , Row , Col,  Menu , Dropdown} from 'antd';
//import type { GetProps } from 'antd';
import { useNavigate } from 'react-router'
import { MenuOutlined } from '@ant-design/icons'



const { Search } = Input;
///type SearchProps = GetProps<typeof Input.Search>;

/// get info of search bar to use later
///const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

export function NavBar() {

    const navigate = useNavigate()

    const menu= (
        <Menu>
            <Menu.Item key="1" onClick={()=> navigate('/profile')}>My Profile</Menu.Item>
        </Menu> 
    )

    return (
        <Row gutter={[240,0]}>
        <Col style={{fontSize: '30px' , marginLeft: '5px'}}>IMDB</Col>
        <Col>
        <Search 
            placeholder="search the name of a film" 
            size="large" 
            onSearch={()=> navigate('/search')}
        />
        </Col>
        <Col>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
        <MenuOutlined style={{ fontSize: '30px', marginTop: '5px'}} />
        </Dropdown>
        </Col>
        </Row>
    )
}