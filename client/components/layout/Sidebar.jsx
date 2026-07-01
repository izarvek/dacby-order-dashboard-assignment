import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0 p-5">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>

      <nav className="flex flex-col gap-3">
        <NavLink to="/" className="p-2 rounded hover:bg-slate-700">
          Dashboard
        </NavLink>
        <NavLink to="/create" className="p-2 rounded hover:bg-slate-700">
          Create Order
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
