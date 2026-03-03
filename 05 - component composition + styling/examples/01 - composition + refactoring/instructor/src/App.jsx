import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';
import './App.css';

function App() {
  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <Filters />
      <Results />
      <Details />
    </PageLayout>

    // Readme implementation below. We could make ours this rigid,
    // or, as seen above, just leverage normal flexbox behaviour and the 'children' prop!

    /*
    <PageLayout
      header={<Header tagline="Find the right resources, right away" />}
      left={<Filters />}
      middle={<Results />}
      right={<Details />}
    />
    */

  );
}

export default App;
