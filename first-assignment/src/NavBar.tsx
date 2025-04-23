import { Input, Flex, Menu } from 'antd';
import type { GetProps } from 'antd';
import {useNavigate} from 'react-router'

const { Search } = Input;
type SearchProps = GetProps<typeof Input.Search>;

/// get info of search bar to use later
const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

export function NavBar() {

    const navigate = useNavigate()

    return (
        <Flex justify='space-around' align="center">
        <div>IMDB</div>
        <Search 
            placeholder="search the name of a film" 
            size="large" 
            onSearch={onSearch}
        />
        <Menu>
            <Menu.Item key="1" onClick={()=> navigate('/profile')}>My Profile</Menu.Item>
        </Menu>
        </Flex>
    )
}