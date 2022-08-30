import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise((resolve:any, reject) => {
      this.http.get('https://angular-html-5f10a-default-rtdb.firebaseio.com/productos_idx.json')
          .subscribe( (resp: any) => {
            this.productos = resp;
            this.cargando = false;
            resolve();
          });
    });
  }
  

  getProducto( id: string){
    return this.http.get(`https://angular-html-5f10a-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

buscarProducto(termino: string){

    if(this.productos.length === 0){
      //cargar productos
      this.cargarProductos().then(()=>{
        //ejecutar despues de tener los productos, aca se aplica el filtro
        this.filtrarProducto(termino);
      });
    }else{
      //aplicar el filtro
      this.filtrarProducto(termino);
    }

  console.log(this.productoFiltrado);
}

private filtrarProducto( termino: string){
  this.productoFiltrado = [];
  termino = termino.toLocaleLowerCase();
  this.productos.forEach(prod => {

    const tituloLower = prod.titulo.toLocaleLowerCase();
    if( prod.categoria.indexOf(termino)>= 0 || tituloLower.indexOf(termino)>=0){
      this.productoFiltrado.push(prod);
    }
  });
}

}
