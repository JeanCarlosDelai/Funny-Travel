import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  handleChange,
  clearFilters,
} from "../features/allTravels/allTravelsSlice";

const SearchContainer = () => {
  const { isLoading, search, sort, sortOptions } = useSelector(
    (store) => store.allTravels
  );

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if (isLoading) return;
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className="form">
        <h4>Formulário de Pesquisa</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            labelText="Nome da Viagem"
            value={search}
            handleChange={handleSearch}
          />
          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            labelText="Organizar"
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Limpar Filtros
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;
