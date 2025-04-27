import { searchFilm , Film } from "../films"
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'
import { Card , Col , Row , Table , Grid } from "antd"

const { Meta } = Card;
const { useBreakpoint } = Grid;

export function Display () {
    
    const navigate = useNavigate()
    const screens = useBreakpoint();

    const url = useLocation();
    const queryParams = new URLSearchParams(url.search);
    const searchValue = queryParams.get('name'); 
    const searchGenresString = queryParams.get('genres');
    const searchGenresArray = searchGenresString ? searchGenresString.split(',') : [];
    const listOfFilms = searchFilm(searchValue, searchGenresArray);
    
    const columns = [
        {
            title: 'Poster',
            dataIndex: 'poster',
            key: 'poster',
            render: (_: string, film: Film) => (
              <img 
                src={film.poster} 
                alt={film.name} 
                style={{ width: 80, height: 'auto', cursor: 'pointer' }} 
                onClick={() => navigate(`/films/${film.id}`)}
              />
            ),
          },
          {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_: string, film: Film) => (
              <div 
                style={{ textAlign: 'center', cursor: 'pointer' }} 
                onClick={() => navigate(`/films/${film.id}`)}
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
              {genres.join(', ')}
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
          dataIndex: 'rating',
          key: 'rating',
          render: (rating: number) => (
            <div style={{ textAlign: 'center' }}>
              {rating}
            </div>
          ),
        },
      ];

    if (screens.xs) {
        return(
        <Row gutter={[24,32]}>
        {listOfFilms.map(film=>(
        <Col
        xs={24} 
        sm={12} 
        md={8}  
        lg={6}>
        <div onClick={() => navigate(`/films/${film.id}`)}>
            <Card 
                hoverable
                style={{width: 180 , marginLeft: '40px'}}
                cover={
                    <img src={film.poster} />
                }>
            <Meta 
                title={<div style={{ textAlign: 'center'}}>{film.name}</div>}
                description=""
            />
            </Card>
        </div>
        </Col>
        ))}
        </Row>
        )
    }
        return (
        <Table
        columns={columns}
        dataSource={listOfFilms}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />
    )
    
}