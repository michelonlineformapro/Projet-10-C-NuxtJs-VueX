<template>
  <div class="mt-3">
      <div>
        <!--Creation de input form type texte pour rechercher une pizza par nom-->
        <h3 class="text-info">Rechercher une pizze</h3>
        <input
          type="text"
          placeholder="Exemple : magherita"
          class="form-control"
          v-model="rechercher"
        />
      </div>

    <!--Afficher les pizzas si la recherche match avec un nom de pizzas de la collection json-->

    <div class="container">
      <div class="row">
        <!--Ici on boucle sur la propriété calculée (filtrerPizza) computed plutot que que le tableau de pizza-->
        <div v-if="rechercherPizza" v-for="pizza in filtrerPizza" :key="pizza.id" class="col-md-4 col-sm-12 mt-3">

          <div class="card">
            <img class="card-img-top" :src="pizza.image" :alt="pizza.nom" v-bind:title="pizza.nom">
            <div class="card-body">
              <h2 class="text-white">{{ pizza.nom }}</h2>
              <ul class="list-group">
                <li class="list-group-item active">INGREDIENTS :</li>
                <li class="list-group-item">{{pizza.ingredient1}}</li>
                <li class="list-group-item">{{pizza.ingredient2}}</li>
                <li class="list-group-item">{{pizza.ingredient3}}</li>
                <li class="list-group-item">{{pizza.ingredient4}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CrudServices from "@/services/CrudServices";

export default {
  name: "RechercherPizza",
  data(){
    return{
      //v-model de input type texte init a vide
      rechercher: "",
      //TAbleau des pizzas
      pizzas: [],
      //Ne rien afficher si input text est vide
      rechercherPizza: false
    }
  },
  //Propriété calculée
  computed:{
    //A utilisé dans la boucle v-for
    filtrerPizza(){
      //Si on entre un caractère dans le champ de reccherche
      if(this.rechercher !== ""){
        //Appel de la classe CrudService et de sa methode getAll axios
        CrudServices.getAll()
          //Creation d'une promesse pour la reponse
          .then(response => {
            //On rempli le tableau de pizzas avec les données de la collection json
            this.pizzas = response.data
            //Le booléen devient vrai
            this.rechercherPizza = true
          })
          //Sinon on declenche une erreur
        .catch(erreur => {
          console.log("Pas de resultat ! " + erreur)
        });
        //Ici on retourne le tableau de pizzas qui va filter = a datas qui est une fonction
        return this.pizzas.filter(datas => {
          //Si pizzas 'datas' . nom === a la recherche dans l'input type texte = on affiche la pizza dont le nom est egale a l'entrée de l'internaute
          return datas.nom.toLowerCase().includes(this.rechercher.toLowerCase())
        })
      }
    }
  },
  //Cycle de vie = insatnce de vue + beforeCreate + created + beforeMount et enfn mounted
  //A chaque refresh de la page et lors de son initialisation la propriété calculée est utilisable
  mounted() {
    this.filtrerPizza
  }

}
</script>

<style scoped>
.card{
  height: 100%;
  background-color: #0f4a63;
  border: none;
  border-radius: 0;
  padding: 10px;
}
</style>
