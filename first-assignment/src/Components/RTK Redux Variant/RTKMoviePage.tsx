import { useParams } from 'react-router'
import { Flex , Col , Row , Typography , Empty , Tag , Grid } from "antd"
import { useNavigate } from 'react-router'
import { StarFilled , BookOutlined, BookFilled, LoadingOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../main'
import { findProfile } from '../../DB/profiles'
import { useMemo, useState } from 'react'
import { useGetMovieQuery } from '../../Slices/imdbAPI'
import { RTKMovieSuggestions } from './RTKMovieSuggestion'


const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

export function RTKMoviePage () {

    const navigate = useNavigate();
    const screens = useBreakpoint();

    const profileId = useSelector((state:  RootState)  => state.profileId.value);
    const profile = findProfile(profileId);
    
    const { id } = useParams();

    const { data, error, isLoading } = useGetMovieQuery(id);

    type Film = typeof data;
    
    const currentFilm: Film= data;
    
    const [bm, setBM] = useState(false);
   
    const bookMarked = useMemo(() => {
        return profile && currentFilm && profile.library.some(film => film.id === currentFilm.id);
    }, [currentFilm, bm]);

    if (screens.xs) {
        return(
            <>
            {currentFilm===null || error ? (<Empty style={{marginTop:'50px' , marginLeft:'100px'}}/>): ( isLoading ? (<LoadingOutlined/>) :(
            <Col style={{marginLeft:'5px',marginRight:'5px'}}>
            <Row justify='center'>
                <img style={{width: '300px', height: 'auto'}} src={currentFilm.primaryImage ?? '/assets/no_image.jpeg'}/>
            </Row>
            <Row>
            <Title style={{color:'#ffffff' , justifyContent:'center'}}>{currentFilm.primaryTitle}</Title>
            </Row>
            <Row justify='space-between' style={{color:'#ffffff' , marginBottom:'25px' , fontWeight:'bold'}}>
                <Col style={{fontSize:'25px'}}>
                    {currentFilm.averageRating ? (<div> {currentFilm.averageRating/2+'/5'}<StarFilled style={{ color: '#F5B800' }}/> </div>): ('No Rating Available')}
                </Col>
                <Col>
                    {profile &&
                        (bookMarked ? 
                            (<BookFilled onClick={()=>{const index=profile.library.findIndex(film=>film.id===currentFilm.id);profile.library.splice(index,1);setBM(!bm);}} style={{ color: '#F5B800', fontSize:'25px' }}/>)   : 
                            (<BookOutlined onClick={()=>{profile.library.push(currentFilm);setBM(!bm);}} style={{ color: '#F5B800', fontSize:'25px' }}/>))}
                </Col>
            </Row>
            <Flex justify='space-around'>
                 {currentFilm.genres.map((genre: string) => 
                    (<Tag 
                        color='#F5B800' 
                        style={{cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} 
                        onClick={()=>navigate(`/search?name=&genres=${genre}`)}>
                            {genre}
                    </Tag>))}
            </Flex>
            <Row>
            <Paragraph style={{marginTop:'20px' , color:'#ffffff'}}>{currentFilm.description}</Paragraph>
            </Row>
            <RTKMovieSuggestions genres={currentFilm.genres}/>
            </Col>
            ))}
            </>
        )
    }
    return (
        <>
        {currentFilm===null || error ? (<Empty/>) : ( isLoading ? (<LoadingOutlined/>) :(
            <Col>
        <Row  gutter={16} wrap={false}>
            <Col>
            <img style={{width: '300px', height: 'auto'}} src={currentFilm.primaryImage ?? '/assets/no_image.jpeg'}/>
            </Col>
            <Col>
            <Title style={{color:'#ffffff'}}>{currentFilm.primaryTitle}</Title>
            <Row justify='space-between'>
                <Col>
                    <div style={{color:'#ffffff' , marginBottom:'40px' , fontWeight:'bold'}}>
                        {currentFilm.averageRating ? (<div> {currentFilm.averageRating/2+'/5'}<StarFilled style={{ color: '#F5B800' }}/> </div>): ('No Rating Available')}
                    </div>
                </Col>
                <Col style={{marginRight:'10px'}}>
                    {profile &&
                        (bookMarked ? 
                            (<BookFilled onClick={()=>{const index=profile.library.findIndex(film=>film.id===currentFilm.id);profile.library.splice(index,1);setBM(!bm);}} style={{ color: '#F5B800', fontSize:'25px' }}/>)   : 
                            (<BookOutlined onClick={()=>{profile.library.push(currentFilm);setBM(!bm);}} style={{ color: '#F5B800', fontSize:'25px' }}/>))}
                </Col>
            </Row>
            <Flex justify='space-around'>
                {currentFilm.genres.map((genre:  string) => 
                    (<Tag 
                        color='#F5B800' 
                        style={{cursor:'pointer' , color:'#333333' , fontWeight:'bold'}} 
                        onClick={()=>navigate(`/search?name=&genres=${genre}`)}>
                            {genre}
                    </Tag>))}
            </Flex>
            <Paragraph style={{marginTop:'20px' , color:'#ffffff'}}>{currentFilm.description}</Paragraph>
            </Col>
        </Row>
        <RTKMovieSuggestions genres={currentFilm.genres}/>
        </Col>
        ))}
        </>
    )
}