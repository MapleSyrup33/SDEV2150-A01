import { useState } from 'react';

import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <aside className="md:col-span-3 lg:col-span-1">
        {/* For now, we pass EACH of: a) state variable, b) its setter, as props. */}
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoryToggle={setSelectedCategories}
          openNowOnly={openNowOnly}
          onOpenNowChange={setOpenNowOnly}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        {/* Results needs to know about the filter values, but doesn't need access to their setters,
            because it's just going to be *reading* them to determine what to show.
        */}
        <Results
          selectedResource={selectedResource}
          onSelectResource={setSelectedResource}
          searchTerm={searchTerm}
          selectedCategories={selectedCategories}
          openNowOnly={openNowOnly}
        />
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details resource={selectedResource}/>
        ) : (
          <div className="text-sm text-base-content/70">
            Please select a resource to view its details.
          </div>
        )
        }
      </aside>
    </PageLayout>
    // <PageLayout
    //   header={<Header tagline="Find the right resources, right away" />}
    //   left={<Filters />}
    //   middle={<Results />}
    //   right={<Details />}
    // />

  );
}

export default App;
