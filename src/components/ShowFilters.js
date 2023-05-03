import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function ShowFilters() {
  const { filters, handleDeleteFilter } = useContext(PlanetsContext);
  return (
    <>
      <h3>Filtros:</h3>
      {
        filters?.length > 0 && (
          filters.map((filter) => (
            <li key={ filter.column } data-testid="filter">
              {`${filter.column} ${filter.comparison} ${filter.number}`}
              <button
                type="button"
                onClick={ () => handleDeleteFilter(filter.column) }
              >
                Delete

              </button>
            </li>
          ))
        )
      }
    </>
  );
}
