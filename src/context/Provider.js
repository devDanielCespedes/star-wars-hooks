import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import fetchResult from '../services/fetchStarWarsApi';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  // const [sortObj, setSortObj] = useState({})
  const [filters, setFilter] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
    order: { column: 'name', sort: 'ASC' },
  });

  useEffect(() => {
    async function fetchPlanetsApi() {
      const fetchPlanets = await fetchResult();
      setPlanets(fetchPlanets);
    }
    fetchPlanetsApi();
  }, []);

  const context = {
    data: planets,
    setPlanets,
    filters,
    setFilter,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: propTypes.arrayOf(propTypes.object).isRequired,
};
