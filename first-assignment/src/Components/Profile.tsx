import { useParams } from 'react-router'
import { Col , Row , Typography , Empty , Grid , Card } from "antd"
import { useNavigate } from 'react-router'
import Meta from 'antd/es/card/Meta'
import { findProfile } from '../DB/profiles'
import { useSelector } from 'react-redux'
import { RootState } from '../main'

const { useBreakpoint } = Grid;
const { Title } = Typography;

export function Profile () {

    const navigate = useNavigate();
    const screens = useBreakpoint();

    const { id } = useParams();
    const profile = findProfile(Number(id));
   
    const profileId = useSelector((state:  RootState)  => state.profileId.value);

    if (profile===false) {
        return(
            <Empty style={{marginTop:'50px' , marginLeft:'100px'}}/>
        )
    }else if (profileId!=profile.id) {
        return(
            <Row justify='center' style={{color:'#F5B800', fontWeight:'bold'}}>
                <div>Your are not logged in to this account</div>
            </Row>
        )
    }
    if (screens.xs) {
        return(
            <>
            {
            <Col style={{marginLeft:'5px',marginRight:'5px'}}>
                <Row justify='center'>
                    <img 
                        style={{width: '300px', height: 'auto'}} 
                        src={profile.picture}/>
                </Row>
                <Row>
                    <Title style={{color:'#ffffff' , justifyContent:'center'}}>{profile.name}</Title>
                </Row>
                <Row>
                    <div style={{color:'#ffffff' , fontWeight:'bold' , fontSize:'30px' , marginBottom:'30px' , marginTop:'50px'}}>More like this</div>
                </Row>
                <Row gutter={[24,32]}>
                    {profile.library.map(film=>(
                        <Col xs={12} key={film.id}>
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
                                            borderRadius: '8px',}}/>}>
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
            </Col>}
            </>
        )
    }
    return (
        <>
            <Col>
                <Row  gutter={16} wrap={false}>
                    <Col>
                        <img 
                            style={{width: '300px', height: 'auto'}} 
                            src={profile.picture}/>
                    </Col>
                    <Col>
                        <Title style={{color:'#ffffff'}}>{profile.name}</Title>
                    </Col>
                </Row>
                <Row justify='center'>
                    <div style={{color:'#ffffff' , fontWeight:'bold' , fontSize:'30px' , marginBottom:'30px' , marginTop:'50px'}}>Your Library</div>
                </Row>
                <Row gutter={[24,32]}>
                    {profile.library.map(film=>(
                        <Col xs={6} key={film.id}>
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
            </Col>
        </>
    )
}