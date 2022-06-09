import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './paginas/Login';
import { Inicio } from './paginas/Inicio';
import { Productos } from './paginas/Productos';
import { Proveedores } from './paginas/Proveedores';
import { Clientes } from './paginas/Clientes';
import { StockProducto } from './paginas/StockProducto';
import { Categorias } from './paginas/Categorias';
import { Informes } from './paginas/Informes';
import { Catalogo } from './paginas/Catalogo';
import { Contacto } from './paginas/Contacto';

function App() {
  return (
    // Especificación de todas las rutas que tendra la aplicación
    // Y Especificación de que pagina debe mostrarse si accede una ruta 
    <Router forceRefresh={false}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/inicio' element={<Inicio />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/proveedores' element={<Proveedores />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/stock-producto' element={<StockProducto/>} />
          <Route path='/categorias' element={<Categorias/>} />
          <Route path='/informes' element={<Informes/>} />
          <Route path='/categorias' element={<Categorias/>} />
          <Route path='/catalogo' element={<Catalogo />} />
          <Route path='/contacto' element={<Contacto />} />
        </Routes>
    </Router>
  );
}

export default App;
