import './App.css';
import { Routes, Route } from 'react-router-dom'
import { Home } from './Home';
import { Clientes } from './Cliente/Clientes';
import { Menu } from './Menu';
import { CadastrarCliente } from './Cliente/CadastrarCliente';
import { CartaosCliente } from './Cliente/CartaosCliente';
import { CadastrarCartao } from './Cartao/CadastrarCartao';
import { EditarCartao } from './Cartao/EditarCartao';
import { EditarCliente } from './Cliente/EditarCliente';
import { EditarCompras } from './Compra/EditarCompras';
import { CadastrarCompra } from './Compra/CadastrarCompra';
import { CadastrarEmpresa } from './Empresa/CadastrarEmpresa';
import { Empresas } from './Empresa/Empresas';
import { EditarEmpresa } from './Empresa/EditarEmpresa';
import { Cartoes } from './Cartao/Cartoes';
import { Promocoes } from './Promocao/promocoes';
import { Compras } from './Compra/Compras';
import { CompraCartao } from './Compra/CompraCartao';
import { PromocaoEmpresa } from './Promocao/PromocaoEmpresa';
import { CadastrarPromocao } from './Promocao/CadastrarPromocao';
import { EditarPromocao } from './Promocao/EditarPromoção';

function App() {
  return (
    <div className="App">
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/novo-cliente' element={<CadastrarCliente />} />
        <Route path='/listar-clientes' element={<Clientes />} />
        <Route path='/editar-cliente/:id' element={<EditarCliente />} />
        <Route path='/cartao-cliente/:id' element={<CartaosCliente />} />
        <Route path='/novo-cartao/:id' element={<CadastrarCartao />} />
        <Route path='/editar-cartao/:id' element={<EditarCartao />} />
        <Route path='/lista-cartoes' element={<Cartoes />} />
        <Route path='/nova-compra/:id' element={<CadastrarCompra />} />
        <Route path='/editar-compra/:id' element={<EditarCompras />} />
        <Route path='/nova-empresa' element={<CadastrarEmpresa />} />
        <Route path='/lista-empresas' element={<Empresas />} />
        <Route path='/editar-empresa/:id' element={<EditarEmpresa />} />
        <Route path='/lista-promocoes' element={<Promocoes />} />
        <Route path='/lista-compras' element={<Compras />} />
        <Route path='/lista-umacompra/:id' element={<CompraCartao />} />
        <Route path='/lista-umpromocao/:id' element={<PromocaoEmpresa />} />
        <Route path='/nova-Promocao/:id' element={<CadastrarPromocao />} />
        <Route path='/editar-promocao/:id' element={<EditarPromocao/>}/>
      </Routes>
    </div>
  );
}
export default App;
