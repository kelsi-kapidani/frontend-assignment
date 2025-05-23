import { Film } from "../../DB/films"
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { Card , Col , Row , Table , Grid } from "antd"
import { searchMovie } from "../../DB/imdb";
import { useCallback, useEffect, useState } from 'react';

const { Meta } = Card;
const { useBreakpoint } = Grid;

export function SearchResult () {
    
    const navigate = useNavigate()
    const screens = useBreakpoint();

    const [listOfFilms, setListOfFilms] = useState<Film[]>([]);

    const url = useLocation();
    const queryParams = new URLSearchParams(url.search);
    const mname = queryParams.get('name');
    const mgenres = queryParams.get('genres');
    const mgenresarray = mgenres ? mgenres.split(',') : [];

    const fetchMovies = useCallback(async () => {
        if (mname) {
            const movies = await searchMovie(mname, mgenresarray);
            if (movies) {
                setListOfFilms(movies); 
            }
        }
    }, [mname]);

    useEffect(() => {
        fetchMovies(); 
    }, [fetchMovies]);
      

    const columns = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            key: 'poster',
            render: (_: string, film: Film) => (
              <img 
                src={film.poster ?? '/assets/no_image.jpeg'} 
                alt={film.name} 
                style={{ width: 80, height: 'auto'}} 
              />
            ),
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, film: Film) => (
              <div 
                style={{ textAlign: 'center'}} 
              >
                {film.name}
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
            render: (description: string) => {
              const text = description ?? 'No description available';
              const truncated = text.length > 150 ? text.slice(0, 147) + '...' : text;
                return (<div style={{ textAlign: 'center' }}>{truncated}</div>);
            },
          },
        {
          title: 'Rating',
          dataIndex: 'averageRating',
          key: 'averageRating',
          render: (averageRating: number) => (
            <div style={{ textAlign: 'center' }}>
              {averageRating ? (averageRating/2) : ('No rating available')}
            </div>
          ),
        },
      ];
    if (screens.xs) {
        return(
            <Row gutter={[24,32]}>
            {listOfFilms.map(film=>(
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
        )
    }
        return (
            <>
              <Table
                    columns={columns}
                    dataSource={listOfFilms}
                    rowKey="id"
                    pagination={{ pageSize: 7 }}
                    className="custom-table"
                    onRow={(record) => ({onClick: () => navigate(`/films/${record.id}`)})}
                    style={{cursor:'pointer'}}
                />
            
              </>
        ) 
}