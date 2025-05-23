import { useParams } from 'react-router'
import { Flex, Col , Row , Typography , Empty , Tag } from "antd"
import { findFilm } from '../films';

const { Title, Paragraph } = Typography;

export function FilmPage () {

    const { id } = useParams();
    const currentFilm= findFilm(Number(id));

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
                {currentFilm.genres.map((genre) => (<Tag>{genre}</Tag>))}
            </Flex>
            <Paragraph style={{marginTop:'20px'}}>{currentFilm.description}</Paragraph>
            </Col>
        </Row>
        )}
        </>
    )
}