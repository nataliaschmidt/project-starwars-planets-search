import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const [apiResult, setApiResult] = useState([]);
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

  const context = useMemo(() => ({
    apiResult,
  }), [apiResult]);

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
