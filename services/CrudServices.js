import http from '../http-config'

const pizzasUrl = 'pizzas';
const produitsURL = 'produits';
const ingredientsURL = 'ingredients';

class CrudServices{

  //Recuperer tous
  getAll(){
    return http.get(pizzasUrl)
  }

  //Afficher tous les ingredients
  getAllIngredients(){
    return http.get(ingredientsURL)
  }

  //Supprimer un elements
  deleteOne(id){
    return http.delete(`pizzas/${id}`)
  }

}


export  default new CrudServices()
