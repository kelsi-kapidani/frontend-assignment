import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { Card , Col , Row , Table , Grid, Empty } from "antd"
import { useSearchMoviesQuery } from '../../Slices/imdbAPI'
import { useSelector } from 'react-redux'
import { RootState } from '../../main'

const { Meta } = Card;
const { useBreakpoint } = Grid;

export function RTKSearchResult () {
    
    const navigate = useNavigate()
    const screens = useBreakpoint();

    const searchTitle = useSelector((state:  RootState)  => state.search.name);
    const searchGenres = useSelector((state:  RootState)  => state.search.genres);
    
    // const url = useLocation();
    // const queryParams = new URLSearchParams(url.search);
    // const searchValue = queryParams.get('name') || ""; 
    // const searchGenresString = queryParams.get('genres');
    // const searchGenresArray = searchGenresString ? searchGenresString.split(',') : [];

    const firstGenre = searchGenres[0] ? searchGenres[0].charAt(0).toUpperCase() + searchGenres[0].slice(1) : '';

    const { data, error, isLoading } = useSearchMoviesQuery({name: searchTitle, genre: firstGenre});

    
    const listOfFilms = data?.results || [];
    
    const columns = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            key: 'poster',
            render: (_: string, film: any) => (
              <img 
                src={film.primaryImage} 
                alt={film.primaryTitle} 
                style={{ width: 80, height: 'auto'}} 
              />
            ),
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, film: any) => (
              <div 
                style={{ textAlign: 'center'}} 
              >
                {film.primaryTitle}
              </div>
            ),
          },
        {
          title: 'Genres',
          dataIndex: 'genres',
          key: 'genres',
          render: (genres: string[]) => (
            <div style={{ textAlign: 'center' }}>
              {Array.isArray(genres) && genres.length > 0
                  ? genres.join(', ')
                  : 'No genres available'}
            </div>
          ),
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (description: string) => (
              <div style={{ textAlign: 'center' }}>
                {description}
              </div>
            ),
          },
        {
          title: 'Rating',
          dataIndex: 'averageRating',
          key: 'averageRating',
          render: (averageRating: number) => (
            <div style={{ textAlign: 'center' }}>
              {averageRating}
            </div>
          ),
        },
      ];

    if (screens.xs) {
        return(
        <>
        { error || isLoading ? (<Empty style={{marginTop:'50px' , marginLeft:'100px'}}/>) : (
        <Row gutter={[24,32]}>
        {listOfFilms.map(film=>(
             <Col xs={12} key={film.id}>
             <div onClick={() => navigate(`/films/${film.id}`)}>
               <Card
                 hoverable
                 style={{
                   width: '100%',
                   borderRadius: '10px',
                   height: '425px',
                   backgroundColor: '#333333',
                   border:'none'
                 }}
                 cover={<img
                    src={film.primaryImage}
                    alt={film.primaryTitle}
                    style={{
                      width: '100%',
                      height: '300px',
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
        )}
        </>
        )
    }
        return (
            <>
        { error || isLoading ? (<Empty style={{marginTop:'50px' , marginLeft:'100px'}}/>) : (
        <Table
            columns={columns}
            dataSource={listOfFilms}
            rowKey="id"
            pagination={{ pageSize: 7 }}
            className="custom-table"
            onRow={(record) => ({onClick: () => navigate(`/films/${record.id}`)})}
            style={{cursor:'pointer'}}
      />
       )}
       </>
    )
    
}