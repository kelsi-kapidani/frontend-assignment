import '../index.css'
import { Carousel } from 'antd'
import { filmDB } from '../films.tsx'

console.log(filmDB);

export function Home () {

    return (
        <Carousel autoplay={{ dotDuration: true }} autoplaySpeed={500000}>
        {filmDB.map((film)=>(
            <div key={film.id}>
                <img 
                    src={film.poster}
                    alt={film.name}
                    style={{
                      width: '100%',
                      height: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}/>
            </div>))}
        </Carousel>
    )
}

