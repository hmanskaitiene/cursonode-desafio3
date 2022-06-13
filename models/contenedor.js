const fs = require('fs').promises
const db_path = './db'

class Contenedor {
    constructor(filename = 'productos.txt'){
        this.filename = `${db_path}/${filename}`;
    }

    async initFile() {
        try {
            await fs.access(this.filename);
        }
        catch(e){
            console.log(`El archivo ${this.filename} fue creado`);
            await fs.writeFile(this.filename,"[]");
        }
    }

    async save(producto) {
        try{        
            producto.id = await this.__getNextId();
            const productos = await this.getAll();
            productos.push(producto);
            await fs.writeFile(this.filename,JSON.stringify(productos));
            return producto.id;
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getAll() {
        try{
            const info = await fs.readFile(this.filename,'utf-8')
            const data = JSON.parse(info);
            return data.map(p => p);
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async getById(id){

        try{
            if (typeof id === 'undefined') {
                throw new Error(`Debe completar el id`);
            }

            const productos = await this.getAll();
            const producto = productos.find(p => p.id === id);
            
            return typeof producto === 'undefined' ? null: producto;
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }
    }
    async deleteById(id){
        try{
            if (typeof id === 'undefined') {
                throw new Error(`Debe completar el id`);
            }

            const productos = await this.getAll();
            const index = productos.findIndex(p => {return p.id === id;});

            //Por si no existe el producto
            if (index > -1){
                let productos = await this.getAll();
                productos.splice(index, 1);
                await fs.writeFile(this.filename,JSON.stringify(productos));
            }
        }
        catch(e){
            return `Hubo un error "${e.message}"`
        }

    }

    async deleteAll(){
        try{
            await fs.writeFile(this.filename,"[]");
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }

    async __getNextId(){
        try{
            const productos = await this.getAll();
            const ids = productos.map(p => (p.id) );
            
            return ids.length === 0 ? 1 : Math.max(...ids) + 1;
        }
        catch(e){
            return `Hubo un error "${e}"`
        }
    }
}

module.exports = Contenedor;