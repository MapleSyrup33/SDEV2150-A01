import { NavLink } from 'react-router';

export default function Header({ tagline }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h1 className="text-xl font-semibold text-sky-600">NAIT Resource Directory</h1>
        <p className="text-sm text-gray-500">
          {tagline ? tagline : 'Find student support services, labs, and campus resources.'}
        </p>
      </div>

      {/* <nav> is a built-in HTML element signifying something meant to provide navigation links;
          it's meant to contain a series of links (whether menu, nav crumbs, etc.)

          <NavLink> is a react-router component that will register links in routing.
      */}
      <nav className="flex gap-2">

        <NavLink
          to="/"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Directory
        </NavLink>

        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `btn btn-sm cursor-pointer btn-ghost text-xs ${isActive ? 'text-sky-700' : 'hover:text-sky-700'}`
          }
        >
          Admin
        </NavLink>

      </nav>

    </div>
  );
}
