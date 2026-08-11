import { NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'bg-slate-950 text-white'
      : 'text-slate-600 hover:bg-white hover:text-slate-950',
  ].join(' ');

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-stone-50/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="text-base font-semibold tracking-normal text-slate-950">
          Mini Task Tracker
        </NavLink>

        <div className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Tasks
          </NavLink>
          <NavLink to="/tasks/new" className={linkClass}>
            Create
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
