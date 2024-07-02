import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted/GetStarted";
import Home from "./pages/Home/Home";
import Settings from "./pages/Settings/Settings";
import Create from "./pages/Create/Create";
import Account from "./pages/Account/Account";
import Search from "./pages/Search/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create" element={<Create />} />
        <Route path="/user/:account" element={<Account />} />
        <Route path="/search/:search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
