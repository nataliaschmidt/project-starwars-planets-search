import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterNumbers() {
  const { filterNumber, setFilterNumber,
    handleFilter, columns } = useContext(PlanetsContext);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterNumber((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <form>
      <label>
        <select
          data-testid="column-filter"
          name="column"
          value={ filterNumber.column }
          onChange={ handleChange }
        >
          {
            columns
              .map((column) => <option key={ column } value={ column }>{column}</option>)
          }
        </select>
      </label>

      <label>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filterNumber.comparison }
          onChange={ handleChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>

      <input
        type="number"
        name="number"
        data-testid="value-filter"
        value={ filterNumber.number }
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </form>
  );
}
