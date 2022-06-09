import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Importación del paquete de Bootstrap en el proyecto
import 'bootstrap/dist/css/bootstrap.min.css';

// Configuración por defecto que se genera al crear el proyecto y se encarga de 
// renderizar las paginas y componentes de la aplicación 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
