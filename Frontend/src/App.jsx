import './App.css'
import Navigation from "./components/Navigation";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import AddJogo from './components/AddJogo';
import Jogos from './components/Jogos';
import NoMatch from "./components/NoMatch";

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="addJogo" element={<Layout><AddJogo /></Layout>} />
        <Route path="jogos" element={<Layout><Jogos /></Layout>} />
        <Route path="*" element={<Layout><NoMatch /></Layout>} />
      </Routes>

    </>
  );
}

export default App;