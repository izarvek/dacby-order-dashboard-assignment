import Sidebar from "./Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 w-full p-6 bg-slate-100 min-h-screen">
        {children}
      </div>

    </div>
  );
};

export default AppLayout;