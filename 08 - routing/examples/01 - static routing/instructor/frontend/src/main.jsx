// react / debug functionality
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// react-router components
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router';

// our components
import App from './App.jsx';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';

// styles
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>
        {/* note the nesting: */}
        <Route path="/" element={<App />}>
          <Route index element={<ResourceDirectoryPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Routes>

    </BrowserRouter>

  </StrictMode>,
);
