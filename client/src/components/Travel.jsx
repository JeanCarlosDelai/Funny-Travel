
import { CgDollar } from 'react-icons/cg';
import { AiFillCaretRight } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/travel';
import { useDispatch } from 'react-redux';
import TravelInfo from './TravelInfo';
import Image from './Image';
import moment from 'moment';
import { deleteTravel, setEditTravel } from '../features/travel/travelSlice';
const Travel = ({
  id,
  travelName,
  location,
  description,
  characteristics,
  image,
  price,
  createdAt,
}) => {
  const dispatch = useDispatch();

  const date = moment(createdAt).format('MMM Do, YYYY');


  return (
    <Wrapper>
      <header>
        <div className='info'>
          <h5>{travelName}</h5>
          <p>{location}</p>
          <TravelInfo icon={<CgDollar />} text={price} />
        </div>
      </header>

      <div className='content'>
        {/* <Image /> */}
        <div className="image-container" style={{ width: '400px', height: '300px' }}>
          <img className="image" src={image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className='content-center'>
          <TravelInfo icon={<AiFillCaretRight />} text={description} />
        </div>
        <div className='content-center'>
          <TravelInfo icon={<AiFillCaretRight />} text={characteristics} />
        </div>

        <footer>
          <div className='actions'>
            <Link
              to='/add-travel'
              className='btn edit-btn'
              onClick={() =>
                dispatch(
                  setEditTravel({
                    editTravelId: id,
                    travelName,
                    location,
                    description,
                    characteristics,
                    image,
                    price,
                  })
                )
              }
            >
              Editar
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => dispatch(deleteTravel(id))}
            >
              Excluir
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Travel;
