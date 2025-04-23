import { searchFilmName } from "./films"
import { useLocation } from 'react-router'
import { Card , Col , Row} from "antd"

const { Meta } = Card;

export function Display () {
    
    const url = useLocation();
    const queryParams = new URLSearchParams(url.search);
    const searchValue = queryParams.get('query'); 
    const listOfFilms = searchFilmName(searchValue);
    
    return(
        <Row gutter={[24,32]} >
        {listOfFilms.map(film=>(
        <Col>
            <Card 
                style={{width: 180 , marginLeft: '10px'}}
                cover={
                    <img src={film.poster} />
                }>
            <Meta 
                title={film.name}
                description={film.description}
            />
            </Card>
        </Col>
        ))}
        </Row>
    )
}