import { filmDB } from "./films";
import { useState } from 'react';
import { Card , Col , Row} from "antd";

const { Meta } = Card;

export function Display () {
    
    const [listOfFilms]= useState(filmDB);

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