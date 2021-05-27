import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Filters = () => {
  const [column, setColumn] = useState({});
  const [comparison, setComparison] = useState({});
  const [value, setValue] = useState({});
  const [directionToSort, setSort] = useState({});
  const [sortColumn, setSortColumn] = useState({});

  const {
    setFilter,
    filters: {
      filterByNumericValues,
      filterByName,
    },
    data,
    // setSortObj,
  } = useContext(StarWarsContext);

  let columnOptions = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  let portionScaleForNumbers = ['maior que', 'menor que', 'igual a'];

  const handleTypingNameInput = ({ target }) => {
    const objToSave = {
      filterByName: { name: target.value },
      filterByNumericValues: [...filterByNumericValues],
    };
    setFilter(objToSave);
  };

  const handleClick = () => {
    const objToSave = {
      filterByName,
      filterByNumericValues: [
        ...filterByNumericValues,
        {
          column,
          comparison,
          value,
        },
      ],
    };
    columnOptions = [
      columnOptions
        .filter((option) => option !== column),
    ];
    portionScaleForNumbers = [
      portionScaleForNumbers
        .filter((option) => option !== comparison),
    ];
    setFilter(objToSave);
  };

  const removeFilter = (index) => {
    const objToSave = {
      filterByName,
      filterByNumericValues: [
        ...filterByNumericValues
          .filter((filter) => filter !== filterByNumericValues[index]),
      ],
    };
    setFilter(objToSave);
  };

  const handleSortPlanets = () => {
    const objToSaveSort = {
      filterByName,
      filterByNumericValues,
      order: {
        column: sortColumn,
        sort: directionToSort,
      },
    };
    setFilter(objToSaveSort);
  };
  // CONSEGUI COM A AJUDA DO GRANDE RAFAEL GUIMARÃES !!!! MUITO OBRIGADO, RAFA!!!!

  return (
    <div>
      <input
        name="name"
        data-testid="name-filter"
        onChange={ handleTypingNameInput }
        type="text"
      />
      <select
        name="column"
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
      >
        {columnOptions
          .filter((option) => !filterByNumericValues
            .map((filter) => filter.column).includes(option))
          .map((option) => (
            <option
              key={ option }
              value={ option }
            >
              {option}
            </option>
          ))}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        {portionScaleForNumbers
          .map((option) => <option key={ option } value={ option }>{option}</option>)}
      </select>
      <input
        type="number"
        name="value"
        id=""
        data-testid="value-filter"
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ handleClick }
      >
        Adicionar filtro
      </button>
      <select
        data-testid="column-sort"
        name="sort-column"
        onChange={ (e) => setSortColumn(e.target.value) }
      >
        {data.results
          ? Object.keys(data.results[0])
            .filter((columnOption) => columnOption !== 'residents')
            .map((columnOption) => (
              <option
                key={ columnOption }
              >
                {columnOption}
              </option>
            ))
          : 'loading'}
      </select>
      <span>Crescente</span>
      <input
        testid="column-sort-input-asc"
        name="select-sort"
        type="radio"
        value="ASC"
        onClick={ (e) => setSort(e.target.value) }
      />
      <span>Decrescente</span>
      <input
        data-testid="column-sort-input-desc"
        name="select-sort"
        type="radio"
        value="DESC"
        onClick={ (e) => setSort(e.target.value) }
      />
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ handleSortPlanets }
      >
        Ordenar
      </button>
      {filterByNumericValues.map((filter, index) => (
        <div data-testid="filter" key={ filter.column }>
          <span>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.value}
          </span>
          <button
            type="button"
            onClick={ () => removeFilter(index) }
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
};

export default Filters;
