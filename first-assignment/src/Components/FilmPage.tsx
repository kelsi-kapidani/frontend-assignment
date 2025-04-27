import { useParams } from 'react-router'
import { Flex, Col , Row , Typography , Empty , Tag , Grid } from "antd"
import { findFilm } from '../films';
import { useNavigate } from 'react-router'

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

export function FilmPage () {

    const navigate = useNavigate();
    const screens = useBreakpoint();

    const { id } = useParams();
    const currentFilm= findFilm(Number(id));

    if (screens.xs) {
        return(
            <>
            {currentFilm===null ? (<Empty style={{marginTop:'50px' , marginLeft:'100px'}}/>) : (
            <Col style={{marginLeft:'5px',marginRight:'5px'}}>
            <Row justify='center'>
                <img style={{width: '300px', height: 'auto'}} src={currentFilm.poster}/>
            </Row>
            <Row>
            <Title>{currentFilm.name}</Title>
            </Row>
            <Row>
            <Flex justify='space-around'>
                 {currentFilm.genres.map((genre) => (<Tag style={{cursor:'pointer'}} onClick={()=>navigate(`/search?name=&genres=${genre}`)}>{genre}</Tag>))}
            </Flex>
            <Paragraph style={{marginTop:'20px'}}>{currentFilm.description}</Paragraph>
            </Row>
            </Col>
            )}
            </>
        )
    }
    return (
        <>
        {currentFilm===null ? (<Empty/>) : (
        <Row  gutter={16} wrap={false}>
            <Col>
            <img style={{width: '300px', height: 'auto'}} src={currentFilm.poster}/>
            </Col>
            <Col>
            <Title>{currentFilm.name}</Title>
            <Flex justify='space-around'>
                {currentFilm.genres.map((genre) => (<Tag style={{cursor:'pointer'}} onClick={()=>navigate(`/search?name=&genres=${genre}`)}>{genre}</Tag>))}
            </Flex>
            <Paragraph style={{marginTop:'20px'}}>{currentFilm.description}</Paragraph>
            </Col>
        </Row>
        )}
        </>
    )
}