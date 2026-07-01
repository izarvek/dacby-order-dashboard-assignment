import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import CreateOrder from "../pages/CreateOrder";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateOrder />} />
      </Routes>
    </div>
  );
};

export default App;
