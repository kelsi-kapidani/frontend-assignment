import { useParams } from 'react-router'
import { Flex , Col , Row , Typography , Empty , Tag , Grid , Card } from "antd"
import { Film , searchFilm } from '../../DB/films'
import { useNavigate } from 'react-router'
import { StarOutlined } from '@ant-design/icons'
import Meta from 'antd/es/card/Meta'
import { getMovie } from '../../DB/imdb'
import { useCallback, useEffect, useState } from 'react'

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

export function MoviePage () {

    const navigate = useNavigate();
    const screens = useBreakpoint();
    const { id } = useParams();
    const [currentFilm, setCurrentFilm] = useState<Film>();
    const similiarFilms: Film[] = [];

    const fetchMovie = useCallback(async () => {
            if (id) {
                const movie = await getMovie(id);
                if (movie) {
                    setCurrentFilm(movie); 
                    if (currentFilm!=null) {
                        for (const genre of currentFilm.genres) {
                            searchFilm('',[genre]).forEach(item => {
                                if (!similiarFilms.some(f => f.id === item.id)) {
                                    similiarFilms.push(item);
                                }
                            })
                        }
                    }
                }
            }
        }, [id]);
    
        useEffect(() => {
            fetchMovie(); 
        }, [fetchMovie]);
    
    if (screens.xs) {
        return(
            <>
            {currentFilm===null || currentFilm===undefined ? (<Empty style={{marginTop:'50px' , marginLeft:'100px'}}/>) : (
            <Col style={{marginLeft:'5px',marginRight:'5px'}}>
            <Row justify='center'>
                <img style={{width: '300px', height: 'auto'}} src={currentFilm.poster}/>
            </Row>
            <Row>
            <Title style={{color:'#ffffff' , justifyContent:'center'}}>{currentFilm.name}</Title>
            </Row>
            <Row style={{color:'#ffffff' , marginBottom:'15px' , fontWeight:'bold'}}>
                {currentFilm.rating+'/5'}
                <StarOutlined style={{ color: '#F5B800' }}/>
            </Row>
            <Flex justify='space-around'>
                 {currentFilm.genres.map((genre) => (<Tag color='#F5B800' style={{cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} onClick={()=>navigate(`/search?name=&genres=${genre}`)}>{genre}</Tag>))}
            </Flex>
            <Row>
            <Paragraph style={{marginTop:'20px' , color:'#ffffff'}}>{currentFilm.description}</Paragraph>
            </Row>
            <Row><div style={{color:'#ffffff' , fontWeight:'bold' , fontSize:'30px' , marginBottom:'30px' , marginTop:'50px'}}>More like this</div></Row>
        <Row gutter={[24,32]}>
        {similiarFilms.map(film=>(
             <Col xs={12} key={film.id}>
             <div onClick={() => navigate(`/films/${film.id}`)}>
               <Card
                 hoverable
                 style={{
                   width: '100%',
                   borderRadius: '10px',
                   height: '325px',
                   backgroundColor: '#333333',
                   border:'none'
                 }}
                 cover={<img
                    src={film.poster}
                    alt={film.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}/>
                 }>
                <Meta
                    title={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '50px' , color: '#ffffff'}}>{film.name}</div>}
                    description={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '60px' , color: '#dcdcdc'}}>{film.genres.join(', ')}</div>}
                />
               </Card>
             </div>
           </Col>
        ))}
        </Row>
            </Col>
            )}
            </>
        )
    }
    return (
        <>
        {currentFilm===null || currentFilm===undefined ? (<Empty/>) : (
            <Col>
        <Row  gutter={16} wrap={false}>
            <Col>
            <img style={{width: '300px', height: 'auto'}} src={currentFilm.poster}/>
            </Col>
            <Col>
            <Title style={{color:'#ffffff'}}>{currentFilm.name}</Title>
            <div style={{color:'#ffffff' , marginBottom:'15px' , fontWeight:'bold'}}>
                {currentFilm.rating+'/5'}
            <StarOutlined style={{ color: '#F5B800' }}/>
            </div>
            <Flex justify='space-around'>
                {currentFilm.genres.map((genre) => (<Tag color='#F5B800' style={{cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} onClick={()=>navigate(`/search?name=&genres=${genre}`)}>{genre}</Tag>))}
            </Flex>
            <Paragraph style={{marginTop:'20px' , color:'#ffffff'}}>{currentFilm.description}</Paragraph>
            </Col>
        </Row>
        <Row><div style={{color:'#ffffff' , fontWeight:'bold' , fontSize:'30px' , marginBottom:'30px' , marginTop:'50px'}}>More like this</div></Row>
        <Row gutter={[24,32]}>
        {similiarFilms.map(film=>(
             <Col xs={6} key={film.id}>
             <div onClick={() => navigate(`/films/${film.id}`)}>
               <Card
                 hoverable
                 style={{
                   width: '100%',
                   borderRadius: '10px',
                   height: '325px',
                   backgroundColor: '#333333',
                   border:'none'
                 }}
                 cover={<img
                    src={film.poster}
                    alt={film.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}/>
                 }>
                <Meta
                    title={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '50px' , color: '#ffffff'}}>{film.name}</div>}
                    description={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '60px' , color: '#dcdcdc'}}>{film.genres.join(', ')}</div>}
                />
               </Card>
             </div>
           </Col>
        ))}
        </Row>
        </Col>
        )}
        </>
    )
}