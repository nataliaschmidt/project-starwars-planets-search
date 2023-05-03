import './App.css';
import FilterNumbers from './components/FilterNumbers';
import FilterText from './components/FilterText';
import ShowFilters from './components/ShowFilters';
import Table from './components/Table';

function App() {
  return (
    <>
      <FilterText />
      <FilterNumbers />
      <ShowFilters />
      <Table />
    </>
  );
}

export default App;
