import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Home } from './Home';
import { Clientes } from './Cliente/Clientes';
import { Menu } from './Menu';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes>
        <Route path ='/' element = {<Home/>}/>
        <Route path ='/lista-clientes' element = {<Clientes/>}/>        
      </Routes>
    </div>
  );
}

export default App;
