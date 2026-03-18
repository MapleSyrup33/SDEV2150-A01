// react hooks
import { useState } from 'react';

// our own hooks
import { useSelectedResource } from './hooks/useSelectedResource';
import { useResources } from './hooks/useResources';


// our own components
import Header from './components/Header';
import Filters from './components/Filters';
import Results from './components/Results';
import Details from './components/Details';
import PageLayout from './components/layout/PageLayout';

function App() {

  // our fetch hook
  const { resources, isLoading, error, refetch } = useResources();

  // our state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [openNowOnly, setOpenNowOnly] = useState(false);

  // const [selectedResource, setSelectedResource] = useState(null);
  const [selectedResource, setSelectedResource] = useSelectedResource();

  const [virtualOnly, setVirtualOnly] = useState(false);

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      <aside className="md:col-span-3 lg:col-span-1">
        <Filters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategories={selectedCategories}
          onCategoryToggle={setSelectedCategories}
          openNowOnly={openNowOnly}
          onOpenNowChange={setOpenNowOnly}
          virtualOnly={virtualOnly}
          onVirtualOnlyChange={setVirtualOnly}
        />
      </aside>
      <section className="md:col-span-2 lg:col-span-1">
        {/* The best place for error/loading-dependent messages is *probably*
            inside the Results component, whose body content will be blank until
            it gets data. I don't want to spam prop nesting all day, so I'm just showing
            that behaviour here.
        */}
        {isLoading && (
          <div className="text-sm text-base-content/70">Loading resources...</div>
        )}
        {!error ? (
            <Results
              resources={resources}
              selectedResource={selectedResource}
              onSelectResource={setSelectedResource}
              searchTerm={searchTerm}
              selectedCategories={selectedCategories}
              openNowOnly={openNowOnly}
              virtualOnly={virtualOnly}
            />
          ) : (
            <div className="alert alert-error">
              <div>
                <p className="font-semibold">Could not load resources</p>
                <p className="text-sm opacity-80">{error.message}</p>
                <button className="btn btn-sm mt-2" onClick={refetch}>Try again</button>
              </div>
            </div>
          )
        }
      </section>
      <aside className="md:col-span-1 lg:col-span-1">
        {selectedResource ? (
          <Details resource={selectedResource} />
        ) : (
          <div className="text-sm text-base-content/70">
            Select a resource to view details.
          </div>
        )}
      </aside>
    </PageLayout>
  );
}

export default App;
