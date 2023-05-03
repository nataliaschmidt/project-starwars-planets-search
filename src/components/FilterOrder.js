import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterOrder() {
  const { apiResult, setApiResult } = useContext(PlanetsContext);
  const [filterOrder, setFilterOrder] = useState({
    order: {
      column: 'population',
      sort: '',
    },
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFilterOrder((prevState) => ({
      ...prevState,
      order: {
        ...prevState.order,
        [name]: value,
      },
    }));
  };

  const columnsSort = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const handleOrderPlanets = () => {
    const { order: { column, sort } } = filterOrder;
    console.log(apiResult);
    if (sort.includes('ASC')) {
      const unknown = apiResult.filter((planets) => planets[column] === 'unknown');
      const notUnknown = apiResult?.filter((planets) => planets[column] !== 'unknown');
      const asc = notUnknown.sort((a, b) => Number(a[column]) - Number(b[column]));
      setApiResult([...asc, ...unknown]);
    }
    if (sort.includes('DESC')) {
      const unknown = apiResult.filter((planets) => planets[column] === 'unknown');
      const notUnknown = apiResult?.filter((planets) => planets[column] !== 'unknown');
      const desc = notUnknown.sort((a, b) => Number(b[column]) - Number(a[column]));
      setApiResult([...desc, ...unknown]);
    }
  };

  return (
    <form>
      <label>
        Ordenar:
        <select
          data-testid="column-sort"
          name="column"
          value={ filterOrder.order.column }
          onChange={ handleChange }
        >
          {
            columnsSort
              .map((column) => <option key={ column } value={ column }>{column}</option>)
          }
        </select>

        <label htmlFor="asc">
          Ascedente
          <input
            type="radio"
            id="asc"
            data-testid="column-sort-input-asc"
            name="sort"
            value="ASC"
            checked={ filterOrder.order.sort === 'ASC' }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="desc">
          Descedente
          <input
            type="radio"
            id="desc"
            data-testid="column-sort-input-desc"
            name="sort"
            value="DESC"
            checked={ filterOrder.order.sort === 'DESC' }
            onChange={ handleChange }
          />
        </label>
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handleOrderPlanets }
      >
        Ordenar
      </button>
    </form>
  );
}
