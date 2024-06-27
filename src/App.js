import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted/GetStarted";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import Create from "./pages/Create/Create";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create" element={<Create />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
