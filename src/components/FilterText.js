import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function FilterText() {
  const { textFilter, setTextFilter } = useContext(PlanetsContext);
  return (
    <input
      type="text"
      name="textFilter"
      placeholder="Search Planet"
      data-testid="name-filter"
      value={ textFilter }
      onChange={ ({ target }) => setTextFilter(target.value) }
    />
  );
}
