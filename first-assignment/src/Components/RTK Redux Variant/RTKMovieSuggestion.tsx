import { Card, Col, Row} from "antd";
import { useSearchMoviesQuery } from "../../Slices/imdbAPI";
import Meta from "antd/es/card/Meta";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";


export function RTKMovieSuggestions ({ genres }: { genres: string[] }) {

    const navigate = useNavigate();
    
    
    const genre=genres?.[0]
    const { data , isLoading } = useSearchMoviesQuery({name: '', genre: genre})
    type Film = typeof data.results;
    const similarFilms: Film[] = data?.results ?? [];
    
    
    return (
        <>
        {isLoading ? (<LoadingOutlined/>) :(
        <>
        <Row><div style={{color:'#ffffff' , fontWeight:'bold' , fontSize:'30px' , marginBottom:'30px' , marginTop:'50px'}}>More like this</div></Row>
        <Row gutter={[24,32]}>
        {similarFilms.map((film: Film)=>(
             <Col lg={6} md={8} xs={12} key={film.id}>
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
                    src={film.primaryImage ?? '/assets/no_image.jpeg'}
                    alt={film.primaryTitle}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}/>
                 }>
                <Meta
                    title={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '50px' , color: '#ffffff'}}>{film.primaryTitle}</div>}
                    description={<div style={{ whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' , height: '60px' , color: '#dcdcdc'}}>{film.genres.join(', ')}</div>}
                />
               </Card>
             </div>
           </Col>
        ))}
        </Row>
        </>
        )}
        </>
    )
}

