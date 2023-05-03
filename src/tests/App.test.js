import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';

describe('Testa a aplicação', () => {
  beforeEach(() => {
      global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
  });

  test('Verifica se os elementos estão presentes na tela', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();
  
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();
      expect(screen.getByRole('cell', { name: /arid/i })).toBeInTheDocument();
    })
  });

  test('Verifica a funcionalidade dos filtros', async() => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const textInputPlanet = screen.getByTestId('name-filter')
    userEvent.type(textInputPlanet, 'A');
    await waitFor(() => {
      expect(screen.getByRole('cell', { name: /alderaan/i })).toBeInTheDocument();
    })
    userEvent.clear(textInputPlanet);
    expect(screen.getByRole('cell', { name: /tatooine/i })).toBeInTheDocument();


    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectValue = screen.getByTestId('value-filter');
    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.clear(selectValue)
    userEvent.type(selectValue, '8000');
    const btnFilter = screen.getByTestId('button-filter');
    userEvent.click(btnFilter);
    const planets = screen.getAllByTestId('planet-name');
    expect(planets.length).toEqual(8);
    const listFilters = screen.getAllByTestId('filter');
    expect(listFilters.length).toEqual(1)
    
    const sortColumn = screen.getByTestId('column-sort');
    const sortAsc = screen.getByTestId('column-sort-input-asc');
    const btnSort = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(sortColumn, 'diameter');
    userEvent.click(sortAsc);
    userEvent.click(btnSort);
  })
})
