// react router components
import { Outlet } from 'react-router';

// our components
import Header from './components/Header';

import PageLayout from './components/layout/PageLayout';

function App() {

  return (
    <PageLayout header={<Header tagline="Find the right resources, right away" />}>
      {/* almost like {children} but for routing: */}
      <Outlet />
    </PageLayout>
  );
}

export default App;
