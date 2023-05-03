import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import mockData from './helpers/mockData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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

  test('Verifica a funcionalidade dos filtros', async () => {
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
    act(() => {
      userEvent.click(btnFilter);
    })
    expect(selectColumn).not.toHaveValue('diameter')
    const planets = screen.getAllByTestId('planet-name');
    expect(planets.length).toEqual(8);
    const listFilters = screen.getAllByTestId('filter');
    expect(listFilters.length).toEqual(1)

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'maior que');
    userEvent.clear(selectValue)
    userEvent.type(selectValue, '25');
    act(() => {
      userEvent.click(btnFilter);
    })
    const planets1 = screen.getAllByTestId('planet-name');
    expect(planets1.length).toEqual(2);
    const listFilters1 = screen.getAllByTestId('filter');
    expect(listFilters1.length).toEqual(2)

    const btnDeleteFilter = screen.getAllByRole('button', { name: /delete/i })
    act(() => {
      userEvent.click(btnDeleteFilter[1])
    })
    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2.length).toEqual(8);
    const listFilters2 = screen.getAllByTestId('filter');
    expect(listFilters2.length).toEqual(1)

    const btnDeleteAllFilters = screen.getByTestId('button-remove-filters')
    act(() => {
      userEvent.click(btnDeleteAllFilters)
    })
    const planets3 = screen.getAllByTestId('planet-name');
    expect(planets3.length).toEqual(10);

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.clear(selectValue)
    userEvent.type(selectValue, '10000');
    act(() => {
      userEvent.click(btnFilter);
    })
    const planets4 = screen.getAllByTestId('planet-name');
    expect(planets4.length).toEqual(3);

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.clear(selectValue)
    userEvent.type(selectValue, '18');
    act(() => {
      userEvent.click(btnFilter);
    })
    const planets5 = screen.getAllByTestId('planet-name');
    expect(planets5.length).toEqual(1);

    const btnDeleteFilter1 = screen.getAllByRole('button', { name: /delete/i })
    act(() => {
      userEvent.click(btnDeleteFilter1[1])
    })
    const planets6 = screen.getAllByTestId('planet-name');
    expect(planets6.length).toEqual(3);


    const sortColumn = screen.getByTestId('column-sort');
    const sortAsc = screen.getByTestId('column-sort-input-asc');
    const btnSort = screen.getByTestId('column-sort-button');
    userEvent.selectOptions(sortColumn, 'diameter');
    userEvent.click(sortAsc);
    act(() => {
      userEvent.click(btnSort);
    })
    const sortDesc = screen.getByTestId('column-sort-input-desc');
    userEvent.selectOptions(sortColumn, 'population');
    userEvent.click(sortDesc);
    act(() => {
      userEvent.click(btnSort);
    })
  })

  test('Testa se ao adicionar todas opções de columns o select fica vazio', async () => {
    render(
      <PlanetsProvider>
        <App />
      </PlanetsProvider>
    );
    const selectColumn = screen.getByTestId('column-filter');
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByTestId('button-filter');

    await waitFor(() => {
      const planets = screen.getAllByTestId('planet-name');
      expect(planets.length).toEqual(10);
    })

    userEvent.selectOptions(selectColumn, 'diameter');
    userEvent.selectOptions(selectComparison, 'menor que');
    userEvent.clear(selectValue)
    userEvent.type(selectValue, '10000');
    act(() => {
      userEvent.click(btnFilter);
    })
    const planets1 = screen.getAllByTestId('planet-name');
    expect(planets1.length).toEqual(3);

    userEvent.selectOptions(selectColumn, 'rotation_period');
    userEvent.selectOptions(selectComparison, 'igual a');
    userEvent.clear(selectValue)
    userEvent.type(selectValue, '18');
    act(() => {
      userEvent.click(btnFilter);
    })
    const planets2 = screen.getAllByTestId('planet-name');
    expect(planets2.length).toEqual(1);

    const btnDeleteFilter1 = screen.getAllByRole('button', { name: /delete/i })
    act(() => {
      userEvent.click(btnDeleteFilter1[0])
    })
    const planets3 = screen.getAllByTestId('planet-name');
    expect(planets3.length).toEqual(1);
  })
})
