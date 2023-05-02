import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [apiResult, setApiResult] = useState([]);
  const [textFilter, setTextFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const [columns, setColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
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
        {
          column: filterNumber.column,
          comparison: filterNumber.comparison,
          number: filterNumber.number,
        },
      ]);
    } else if (filterNumber.comparison.includes('menor que')) {
      const filtered = apiResult
        .filter((planet) => Number(planet[filterNumber.column])
          < Number(filterNumber.number));
      setApiResult(filtered);
      setFilters([
        ...filters,
        {
          column: filterNumber.column,
          comparison: filterNumber.comparison,
          number: filterNumber.number,
        },
      ]);
    } else if (filterNumber.comparison.includes('igual a')) {
      const filtered = apiResult
        .filter((planet) => Number(planet[filterNumber.column])
          === Number(filterNumber.number));
      setApiResult(filtered);
      setFilters([
        ...filters,
        {
          column: filterNumber.column,
          comparison: filterNumber.comparison,
          number: filterNumber.number,
        },
      ]);
    }
    setColumn((prevColumns) => {
      if (prevColumns.length === 1) {
        return [''];
      }
      return prevColumns.filter((column) => column !== filterNumber.column);
    });
    setFilterNumber((prevState) => ({
      ...prevState,
      column: columns[0],
    }));
  }, [apiResult, filterNumber, filters, columns]);

  const context = useMemo(() => ({
    apiResult,
    textFilter,
    setTextFilter,
    setFilterNumber,
    filterNumber,
    handleFilter,
    columns,
  }), [apiResult, textFilter,
    setTextFilter, setFilterNumber, filterNumber, handleFilter, columns]);

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
