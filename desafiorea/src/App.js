import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Home } from './Home';
import { Clientes } from './Cliente/Clientes';
import { Menu } from './Menu';
import { CadastrarCliente } from './Cliente/CadastrarCliente';
import { CartaosCliente } from './Cliente/CartaosCliente';
import { CadastrarCartao } from './Cartao/CadastrarCartao';
import { EditarCartao } from './Cartao/EditarCartao';

function App() {
  return (
    <div className="App">
      <Menu/>
      <Routes>
        <Route path ='/' element = {<Home/>}/>
        <Route path ='/listar-clientes' element = {<Clientes/>}/>  
        <Route path ='/novo-cliente' element = {<CadastrarCliente/>}/>
        <Route path='/cartao-cliente/:id' element = {<CartaosCliente/>}/>
        <Route path='/editar-cartao/:id' element = {<EditarCartao/>}/>
        <Route path='/novo-cartao/:id' element = {<CadastrarCartao/>}/>
   
      </Routes>
    </div>
  );
}
export default App;
