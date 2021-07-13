import http from '../http-config'

const pizzasUrl = 'pizzas';

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
