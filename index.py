#Se importa la librería Flask
from flask import Flask, request, jsonify
# from flask_cors import cross_origin
from flask_cors import CORS
from flask import Flask, render_template

#Diccionario con datos de prueba para usuarios
diccionario_usuarios = {
    "administrador": {
        "nombreUsuario": "administrador",
        "correo": "administrador@mail.com",
        "password": "admin12345",
        "rol": "administrador"
    }
}

#Diccionario con datos de prueba para productos
diccionario_productos = {
    "PROD-0": {
        "id": "0",
        "codigo": "PROD-0",
        "nombre": "Producto-1",
        "categoria": "Hogar",
        "proveedor": "Proveedor-1",
        "precio": 1.50,
        "cantidad": 0,
        "imagen": "https://www.bosch-professional.com/ec/es/ocsmedia/74880-54/application-image/1434x828/taladro-de-percusion-a-bateria-gsb-18-v-li-06018671e1.png",
        "descripcion": "Primer producto electronico de prueba..."
    },
    "PROD-1": {
        "id": "1",
        "codigo": "PROD-1",
        "nombre": "Producto-2",
        "categoria": "Hogar",
        "proveedor": "Proveedor-1",
        "precio": 2.00,
        "imagen": "https://www.bosch-professional.com/ec/es/ocsmedia/74880-54/application-image/1434x828/taladro-de-percusion-a-bateria-gsb-18-v-li-06018671e1.png",
        "cantidad": 10,
        "descripcion": "Segundo producto electronico de prueba..."
    },
    "PROD-2": {
        "id": "2",
        "codigo": "PROD-2",
        "nombre": "Producto-3",
        "categoria": "Maquinaria pesada",
        "proveedor": "Proveedor-1",
        "precio": 3.00,
        "imagen": "https://www.bosch-professional.com/ec/es/ocsmedia/74880-54/application-image/1434x828/taladro-de-percusion-a-bateria-gsb-18-v-li-06018671e1.png",
        "cantidad": 15,
        "descripcion": "Tercer producto electronico de prueba..."
    },
    "PROD-3": {
        "id": "3",
        "codigo": "PROD-3",
        "nombre": "Producto-4",
        "categoria": "Hogar",
        "proveedor": "Proveedor-1",
        "precio": 3.00,
        "imagen": "https://www.bosch-professional.com/ec/es/ocsmedia/74880-54/application-image/1434x828/taladro-de-percusion-a-bateria-gsb-18-v-li-06018671e1.png",
        "cantidad": 15,
        "descripcion": "Tercer producto electronico de prueba..."
    }
}

#Diccionario con datos de prueba para proveedores
diccionario_proveedores = {
    "1234567899001": {
        "id": "0",
        "ruc": "1234567899001",
        "nombre": "Proveedor-1",
        "direccion": "Direcion 1 s5 s5",
        "provincia": "Provincia-1",
        "ciudad": "Ciudad-1",
        "telefono": "1234567",
        "correo_electronico": "proveedor1@mail.com",
    },
    "2234567899001": {
        "id": "1",
        "ruc": "2234567899001",
        "nombre": "Proveedor-2",
        "direccion": "Direcion 1 s5 s5",
        "provincia": "Provincia-1",
        "ciudad": "Ciudad-1",
        "telefono": "1234567",
        "correo_electronico": "proveedor1@mail.com",
    }
}

#Diccionario con datos de prueba para categorias
diccionario_categoria = {
    "0": {
        "id": "0",
        "codigo": "CAT-1",
        "nombre": "Maquinaria pesada",
    },
    "1": {
        "id": "1",
        "codigo": "CAT-2",
        "nombre": "Hogar",
    }
}

#Diccionario sion datos para clientes
diccionario_clientes = {}

#Variable de instancia app
app = Flask(__name__)

# Configuraciones
#Configuración de CORS para permitir las petición desde el frontend react
cors = CORS(app , resources={r"/*": {"origins": "http://localhost:3000" }})

#Decorador para la ruta raíz
@app.route('/')
#Función para acceder al backend
def principal(): 
    # return '<h1>Backend Ferreteria ESPE</h1>'
    return render_template('buil/index.html')

# ------------- API para el acceso del usuario
#Ruta para obtener los datos de un usuario segun su ID
@app.route('/usuario/<id>', methods=['GET'])
def obtenerUsuarios(id):
    return {
        "nombreUsuario": diccionario_usuarios.get(id)["nombreUsuario"],
        "correo": diccionario_usuarios.get(id)["correo"],
        "rol": diccionario_usuarios.get(id)["rol"],
    }

#Ruta para comprobar si los datos de Login (nombreusuario y contraseña) estan registrados en el sistema
@app.route('/login', methods=['POST'])
def loginUsuario():
    # Se buscan los datos del usuario corespondientes al nombre de usaurio del login
    usuario = diccionario_usuarios.get(request.json['nombreUsuario'])
    if (usuario is None):
        #Si no existe ningun usuario que corresponda al nombre de usuario que se ingreso en el login
        #Se devuelve una respuesta que indica que el usuario no esta logueado
        return {
            "login": False,
            "datosUsuario": None
        }

    if (usuario['password'] == request.json['password']):
        #Si existe el usuario y la contraseña es igual a la que se ingreso en el login
        #Se devuelve una respuesta que indica que el usuario ha sido logueado
        return {
            "login": True,
            "datosUsuario": usuario
        }
    else:
        #Si no la contraseña del usuario no es igual a la que se ingreso en el login
        #Se devuelve una respuesta que indica que el usuario no ha sido logueado
        return {
            "login": False,
            "datosUsuario": None
        }

# ------------- API para el Informe de Productos
#Ruta para obtener los datos del informe de productos
@app.route('/informe-productos', methods=['GET'])
def obtenerInformeProductos():
    listaProductos = [] #inicialización de la lista de productos
    totalMonetarioProducto = 0 #inicialización del total monetario del inventario
    for clave in diccionario_productos: #Bucle for para recorrer los productos registrados en el sistema y generar el informe de productos
        totalMonetarioProducto = diccionario_productos.get(clave)['precio'] * diccionario_productos.get(clave)['cantidad']
        listaProductos.append(
            {
                "id": diccionario_productos.get(clave)['id'],
                "codigo": diccionario_productos.get(clave)['codigo'],
                "nombre": diccionario_productos.get(clave)['nombre'],
                "precio": diccionario_productos.get(clave)['precio'],
                "cantidad": diccionario_productos.get(clave)['cantidad'],
                "total": totalMonetarioProducto,
            }
            
        )
    return jsonify(listaProductos)

# ------------- API para el Informe de Productos Sin Stock
#Ruta para obtener los datos de informe de prodcutos sin stock
@app.route('/informe-sin-stock', methods=['GET'])
def obtenerInformeProductosSinStok():
    listaProductos = []  #inicialización de la lista de productos
    for clave in diccionario_productos: #Bucle for para recorrer los productos registrados en el sistema y encontrar los productos sin STOCK 
        if diccionario_productos.get(clave)['cantidad'] == 0: #Comprobar si el stock del producto es igual a cero
            listaProductos.append(
                {
                    "id": diccionario_productos.get(clave)['id'],
                    "codigo": diccionario_productos.get(clave)['codigo'],
                    "nombre": diccionario_productos.get(clave)['nombre'],
                    "categoria": diccionario_productos.get(clave)['categoria'],
                    "proveedor": diccionario_productos.get(clave)['proveedor'],
                    "precio": diccionario_productos.get(clave)['precio'],
                    "cantidad": diccionario_productos.get(clave)['cantidad'],
                    "descripcion": diccionario_productos.get(clave)['descripcion']
                }
                
            )
    return jsonify(listaProductos)


# ------------- API para Productos
#Ruta para obtener los datos de todos los productos
@app.route('/productos', methods=['GET'])
def obtenerProductos():
    #Se convierte el diccionario de prodcutos en una lista y se envia al frontend 
    listaproductos = list(diccionario_productos.values())
    return jsonify(listaproductos)

#Ruta para obtener los datos de un producto mediante su codigo
@app.route('/producto/<codigoProducto>', methods=['GET'])
def obtenerProducto(codigoProducto):
    resultadoBusqueda = diccionario_productos.get(codigoProducto)
    if resultadoBusqueda is None:
        return {
            "encontrado": False,
            "datosUsuario": None
        }
    else:
        return {
            "encontrado": True,
            "datosProducto": resultadoBusqueda
        }

#Ruta para registrar un producto en el sistema
@app.route('/productos', methods=['POST'])
def agregarProductos():
    diccionario_productos[request.json['codigo']] = request.json
    return {
        'agregado': True
    }

#Ruta para eliminar un producto del sistema mediante su codigo
@app.route('/productos/<codigo>', methods=['DELETE'])
def eliminarProductos(codigo):
    diccionario_productos.pop(''+codigo, None)
    return  {
            "eliminado": True
    }

#Ruta para actualizar un producto del sistema mediante su codigo
@app.route('/productos', methods=['PUT'])
def actualiarProductos():
    diccionario_productos.update({request.json['codigo']:  request.json})
    return {
        'actualizado': True
    }

#Ruta para actualizar el stock de un producto
@app.route('/stock', methods=['PUT'])
def actualiarStock():
    diccionario_productos.update({request.json['codigo']:  request.json})
    return diccionario_productos.get(request.json['codigo'])

# ------------- API para Proveedores
#Ruta para obtener la lista de todos los proveedores
@app.route('/proveedores', methods=['GET'])
def obtenerProveedores():
    #Conversión del diccionario de datos en una lista
    listaProveedores = list(diccionario_proveedores.values())
    return jsonify(listaProveedores)

#Ruta para agregar un proveedor al sistema
@app.route('/proveedores', methods=['POST'])
def agregarProveedores():
    diccionario_proveedores[request.json['ruc']] = request.json
    return diccionario_proveedores

#Ruta para eliminar un proveedor mediante el RUC del proveedor
@app.route('/proveedores/<ruc>', methods=['DELETE'])
def eliminarProveedores(ruc):
    diccionario_proveedores.pop(ruc, None)
    return diccionario_proveedores

#Ruta para actualizar los datos de un proveedor
@app.route('/proveedores', methods=['PUT'])
def actualiarProveedores():
    diccionario_proveedores.update({request.json['ruc']:  request.json})
    return {
        'actualizado': True
    }

# ------------- API para Categorias
#Ruta para obtener la lista de todas las categorias registradas en el sistema
@app.route('/categorias', methods=['GET'])
def obtenerCategorias():
    #Conversión del diccionario de datos en lista
    listaCategorias = list(diccionario_categoria.values())
    return jsonify(listaCategorias)

#Ruta para obtener obtener la lista de productos agrupados segun su categoria
@app.route('/productos-por-categoria', methods=['GET'])
def obtenerProductosPorCategoria():
    ListaProductosPorCategoria = [] #Inicialización de la lista de productos agrupados
    for claveCategoria in diccionario_categoria: #Primer bucle para recorrer cada categoria registrada en el sistema
        productosCategoria = [] #Inicialización de la lista de productos perteneciente a una categoria en especifico
        for claveProducto in diccionario_productos: #Segundo bucle para filtrar los productos segun suc categoria
            # Condicional apra comprobar si la categoria del producto corresponde con la catregoria actual
            if diccionario_productos.get(claveProducto)['categoria'] == diccionario_categoria.get(claveCategoria)['nombre']:
                productosCategoria.append(
                    {
                        "id": diccionario_productos.get(claveProducto)['id'],
                        "codigo": diccionario_productos.get(claveProducto)['codigo'],
                        "nombre": diccionario_productos.get(claveProducto)['nombre'],
                        "categoria": diccionario_productos.get(claveProducto)['categoria'],
                        "proveedor": diccionario_productos.get(claveProducto)['proveedor'],
                        "precio": diccionario_productos.get(claveProducto)['precio'],
                        "imagen": diccionario_productos.get(claveProducto)['imagen'],
                        "descripcion": diccionario_productos.get(claveProducto)['descripcion']
                    }
                    
                )
        # Validación para comprobar si hay elementos en la lista de productos filtrados por categoria
        if len(productosCategoria) > 0:
            ListaProductosPorCategoria.append(productosCategoria)

    return jsonify(ListaProductosPorCategoria)

#Ruta para registrar una categoria al sistema
@app.route('/categorias', methods=['POST'])
def agregarCategorias():
    diccionario_categoria[request.json['id']] = request.json
    return diccionario_categoria

#Main del programa
if __name__ == '__main__':
    #debug cada vez que cambiamos dentro del servidor se reinicia automaticamente
    app.run( debug = True)

