import { useEffect } from 'react';
import TravelAll from './TravelAll';
import Wrapper from '../assets/wrappers/travelsContainer';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import { getAllTravelsAll } from '../features/allTravels/allTravelsSlice';
import PageBtnContainer from './PageBtnContainer';
const TravelsContainerAll = () => {
  const {
    travels,
    isLoading,
    page,
    totalTravels,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,
  } = useSelector((store) => store.allTravels);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTravelsAll());
  }, [page, search, searchStatus, searchType, sort]);

  if (isLoading) {
    return <Loading />;
  }

  if (travels.length === 0) {
    return (
      <Wrapper>
        <h2>Sem Viagens para mostrar...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalTravels} Viagen{travels.length > 1 && 's'} encontradas
      </h5>
      <div className='jobs'>
        {travels.map((travel) => {
          return <TravelAll key={travel.id} {...travel} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default TravelsContainerAll;
