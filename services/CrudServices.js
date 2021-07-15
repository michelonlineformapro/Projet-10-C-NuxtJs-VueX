import http from '../http-config'

const pizzasUrl = 'pizzas';
const produitsURL = 'produits'

class CrudServices{

  //Recuperer tous
  getAll(){
    return http.get(pizzasUrl)
  }

  //Supprimer un elements
  deleteOne(id){
    return http.delete(`pizzas/${id}`)
  }

}


export  default new CrudServices()
