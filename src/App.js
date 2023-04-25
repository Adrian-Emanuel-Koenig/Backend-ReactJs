import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Registro from "./pages/SignIn";
import Layout from "./components/Navbar";
import Profile from "./pages/Perfil";

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="/" element={<Home/>}/>
              <Route path="productos" element={<Productos/>}/>
              <Route path="login" element={<Login/>}/>
              <Route path="registro" element={<Registro/>}/>
              <Route path="perfil" element={<Profile/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Route>
          </Routes>
    </div>
  );
}

export default App;
