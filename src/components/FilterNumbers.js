import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterNumbers() {
  const { filterNumber, setFilterNumber, handleFilter } = useContext(PlanetsContext);

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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
