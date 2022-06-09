#Se importa la librería Flask
from flask import Flask, request, jsonify
# from flask_cors import cross_origin
from flask_cors import CORS

diccionario_usuarios = {
    "administrador": {
        "nombreUsuario": "administrador",
        "correo": "administrador@mail.com",
        "password": "admin12345",
        "rol": "administrador"
    },
    "invitado": {
        "nombreUsuario": "administrador",
        "correo": "administrador1@mail.com",
        "password": "admin12345",
        "rol": "inivitado"
    },
}

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

diccionario_categoria = {
    "0": {
        "id": "0",
        "codigo": "CAT-001",
        "nombre": "Maquinaria pesada",
    },
    "1": {
        "id": "1",
        "codigo": "CAT-002",
        "nombre": "Hogar",
    }
}
diccionario_clientes = {}

#Variable de instancia app
app = Flask(__name__)

# COnfiguraciones
#Configuración de CORS para permitir las petición desde el frontend react
cors = CORS(app , resources={r"/*": {"origins": "http://localhost:3000" }})


#Decorador ruta raíz
@app.route('/')
#Función para acceder al backend
def principal(): 
    return '<h1>Backend Ferreteria ESPE</h1>'

# ------------- Acceso
#Ruta 
@app.route('/usuario/<id>', methods=['GET'])
def obtenerUsuarios(id):
    return {
        "nombreUsuario": diccionario_usuarios.get(id)["nombreUsuario"],
        "correo": diccionario_usuarios.get(id)["correo"],
        "rol": diccionario_usuarios.get(id)["rol"],
    }

@app.route('/login', methods=['POST'])
def loginUsuario():
    usuario = diccionario_usuarios.get(request.json['nombreUsuario'])
    if (usuario is None):
        return {
            "login": False,
            "datosUsuario": None
        }

    if (usuario['password'] == request.json['password']):
        return {
            "login": True,
            "datosUsuario": usuario
        }
    else:
        return {
            "login": False,
            "datosUsuario": None
        }

# ------------- Informe Productos
@app.route('/informe-productos', methods=['GET'])
def obtenerInformeProductos():
    listaProductos = []
    totalMonetarioProducto = 0
    for clave in diccionario_productos:
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

# ------------- Informe Productos Sin Stock
@app.route('/informe-sin-stock', methods=['GET'])
def obtenerInformeProductosSinStok():
    listaProductos = []
    for clave in diccionario_productos:
        if diccionario_productos.get(clave)['cantidad'] == 0:
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


# ------------- Productos
@app.route('/productos', methods=['GET'])
def obtenerProductos():
    listaproductos = list(diccionario_productos.values())
    return jsonify(listaproductos)

@app.route('/producto/<codigoProducto>', methods=['GET'])
def obtenerProducto(codigoProducto):
    busqueda = diccionario_productos.get(codigoProducto)
    if busqueda is None:
        return {
            "encontrado": False,
            "datosUsuario": None
        }
    else:
        return {
            "encontrado": True,
            "datosProducto": busqueda
        }

@app.route('/productos', methods=['POST'])
def agregarProductos():
    diccionario_productos[request.json['codigo']] = request.json
    return {
        'agregado': True
    }

@app.route('/productos/<codigo>', methods=['DELETE'])
def eliminarProductos(codigo):
    print(codigo)
    diccionario_productos.pop(''+codigo, None)
    return  {
            "eliminado": True
        }

@app.route('/productos', methods=['PUT'])
def actualiarProductos():
    print( request.json)
    print( request.json['codigo'])
    diccionario_productos.update({request.json['codigo']:  request.json})
    return {
        'actualizado': True
    }

@app.route('/stock', methods=['PUT'])
def actualiarStock():
    diccionario_productos.update({request.json['codigo']:  request.json})
    return diccionario_productos.get(request.json['codigo'])

# ------------- Proveedores
@app.route('/proveedores', methods=['GET'])
def obtenerProveedores():
    listaProveedores = list(diccionario_proveedores.values())
    return jsonify(listaProveedores)

@app.route('/proveedores', methods=['POST'])
def agregarProveedores():
    diccionario_proveedores[request.json['ruc']] = request.json
    return diccionario_proveedores

@app.route('/proveedores/<ruc>', methods=['DELETE'])
def eliminarProveedores(ruc):
    diccionario_proveedores.pop(ruc, None)
    return diccionario_proveedores

@app.route('/proveedores', methods=['PUT'])
def actualiarProveedores():
    diccionario_proveedores.update({request.json['ruc']:  request.json})
    return {
        'actualizado': True
    }

# ------------- Categorias
@app.route('/categorias', methods=['GET'])
def obtenerCategorias():
    listaCategorias = list(diccionario_categoria.values())
    return jsonify(listaCategorias)

@app.route('/productos-por-categoria', methods=['GET'])
def obtenerProductosPorCategoria():
    listaProductosPorCategoria = []
    for claveCategoria in diccionario_categoria:
        productosCategoria = []
        for claveProducto in diccionario_productos:
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
        if len(productosCategoria) > 0:
            listaProductosPorCategoria.append(productosCategoria)

    return jsonify(listaProductosPorCategoria)


#Main del programa
if __name__ == '__main__':
    #debug cada vez que cambiamos dentro del servidor se reinicia automaticamente
    app.run( debug = True)

