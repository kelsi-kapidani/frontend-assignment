import '../index.css'
import { Card, Carousel, Col, Row } from 'antd'
import { filmDB } from '../DB/films'
import Meta from 'antd/es/card/Meta'
import { useNavigate } from 'react-router';

export function Home () {

    const navigate = useNavigate();
    
    return (
        <>
            <Carousel style={{ height: '500px', overflow: 'hidden'}} autoplay >
                {filmDB.map((film)=>(
                    <div key={film.id}>
                        <img 
                            src={film.poster}
                            alt={film.name}
                            style={{
                                width: '100%',
                                height: '500px',
                                objectFit: 'cover'
                            }}/>
                    </div>))}
            </Carousel>
            <Row justify='center' style={{ color:'#ffffff' , fontWeight:'bold' , fontSize:'30px' , marginBottom:'40px' , marginTop:'50px'}}>New Season</Row>
            <Row gutter={[24,32]}>
                {filmDB.map(film=>(
                    <Col lg={4} md={6} sm={8} xs={12} key={film.id}>
                        <div onClick={() => navigate(`/films/${film.id}`)}>
                            <Card
                                hoverable
                                style={{
                                    width: '100%',
                                    borderRadius: '10px',
                                    height: '325px',
                                    backgroundColor: '#333333',
                                    border:'none'}}
                                cover={<img
                                    src={film.poster}
                                    alt={film.name}
                                    style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    borderRadius: '8px'}}/>}>
                                <Meta
                                    title={
                                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '50px' , color: '#ffffff'}}>{film.name}</div>}
                                    description={
                                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '60px' , color: '#dcdcdc'}}>{film.genres.join(', ')}</div>}/>
                                </Card>
                        </div>
                    </Col>
                ))}
            </Row>
        </>
    )
}

