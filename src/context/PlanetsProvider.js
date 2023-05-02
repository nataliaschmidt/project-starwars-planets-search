import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [apiResult, setApiResult] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const [filterNumber, setFilterNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const fetchApiPlanets = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setApiResult(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchApiPlanets();
  }, []);

  const handleFilter = useCallback(() => {
    if (filterNumber.comparison.includes('maior que')) {
      const filtered = apiResult
        .filter((planet) => Number(planet[filterNumber.column])
        > Number(filterNumber.number));
      setApiResult(filtered);
      setFilters([
        ...filters,
        { column: filterNumber.column,
          comparison: filterNumber.comparison,
          number: filterNumber.number },
      ]);
    } else if (filterNumber.comparison.includes('menor que')) {
      const filtered = apiResult
        .filter((planet) => Number(planet[filterNumber.column])
        < Number(filterNumber.number));
      setApiResult(filtered);
      setFilters([
        ...filters,
        { column: filterNumber.column,
          comparison: filterNumber.comparison,
          number: filterNumber.number },
      ]);
    } else if (filterNumber.comparison.includes('igual a')) {
      const filtered = apiResult
        .filter((planet) => Number(planet[filterNumber.column])
        === Number(filterNumber.number));
      setApiResult(filtered);
      setFilters([
        ...filters,
        { column: filterNumber.column,
          comparison: filterNumber.comparison,
          number: filterNumber.number },
      ]);
    }
  }, [apiResult, filterNumber, filters]);

  const context = useMemo(() => ({
    apiResult,
    textFilter,
    setTextFilter,
    setFilterNumber,
    filterNumber,
    handleFilter,
  }), [apiResult, textFilter,
    setTextFilter, setFilterNumber, filterNumber, handleFilter]);

  return (
    <PlanetsContext.Provider value={ context }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
