<template>
    <div class="container">
        <div class="row">
          <!--Bloc de droite choix des ingredients-->
          <div class="col-md-8 col-sm-12">
            <h3 class="text-white bg-warning p-3 mt-3">CHOIX DES INGREDIENTS :</h3>
            <div class="row">
              <!--Boucle sur le tableau ingredient de la collection ingredients json-->
              <div class="col-md-4 col-sm-12" v-for="(ingredient, index) in ingredients" :key="index">
                <div class="card">
                  <img :src="ingredient.image" :alt="ingredient.nom" :title="ingredient.nom"/>
                  <div class="card-body">{{ ingredient.nom }}</div>
                  <!--Au click on lance la fonction ajouter-->
                  <a @click="ajouterIngredients(ingredient, index, ingredient.nom, ingredient.image)" class="btn btn-danger">AJOUTER</a>
                </div>
              </div>
            </div>
          </div>

          <!--Bloc de gauche afficher les ingredients selectionner-->
          <div class="col-md-4 col-sm-12">
            <h3 class="text-white bg-warning p-3 mt-3">INGREDIENTS :</h3>
            <!--Liste de ingredient + btn supprimer-->
            <ul class="list-group" v-for="(listeIngredient, index) in listeIngredients" :key="index">
              <li class="list-group-item">
                {{listeIngredient.nom}}
                <div class="text-center">
                  <!--Au click sur le bouton on retire l'eingredient de la listeIngredient et on ajoute au tableau ingredients-->
                  <button @click="supprimerIngredient(listeIngredient, index)" class="btn btn-info">SUPPRIMER</button>
                </div>

              </li>
            </ul>
          </div>
        </div>

      <!--Resultat de rechetche en fonction des ingredients ajoutés-->
        <div class="container-fluid">
          <h3 class="text-center text-white bg-warning p-3 mt-3"><b>NOUS VOUS PROPOSONS :</b></h3>
          <div>
            <!--Première boucle sur le tableau de pizza rempli pat la propriété calculée trouverPizza-->
            <div v-for="pizza in pizzas">
              <!--Seconde boucle sur le tableau de la liste ingredient ajoutés -->
              <div v-for="listeIngredient in listeIngredients">
                <!--Les conditions si l'ingredient de 1 a 6 correspond a un ingredient du tableau des ingredients ajouté = alors on affiche les resultats-->
                <div
                  v-if="listeIngredient.nom === pizza.ingredient1 ||
                      listeIngredient.nom === pizza.ingredient2 ||
                      listeIngredient.nom === pizza.ingredient3 ||
                      listeIngredient.nom === pizza.ingredient4 ||
                      listeIngredient.nom === pizza.ingredient5 ||
                      listeIngredient.nom === pizza.ingredient6
              ">
                  <table class="table table-striped">
                    <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Image</th>
                      <th>Ingrédient 1</th>
                      <th>Ingrédient 2</th>
                      <th>Ingrédient 3</th>
                      <th>Ingrédient 4</th>
                      <th>Ingrédient 5</th>
                      <th>Ingrédient 6</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{{pizza.nom}}</td>
                      <td>
                        <img :src="pizza.image" :alt="pizza.nom" :title="pizza.nom" width="100%" />
                      </td>
                      <td>{{pizza.ingredient1}}</td>
                      <td>{{pizza.ingredient2}}</td>
                      <td>{{pizza.ingredient3}}</td>
                      <td>{{pizza.ingredient4}}</td>
                      <td>{{pizza.ingredient5}}</td>
                      <td>{{pizza.ingredient6}}</td>
                      <td>
                        <nuxt-link to="/Pizza" class="btn btn-info">COMMANDER</nuxt-link>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <!--Sinon on affiche aucun resultat (ce block est caché grace a du CSS)-->
                <div v-else>
                  <div class="no-result alert alert-danger">PAS DE RESULTAT(S)</div>
                </div>
              </div>
            </div>
          </div>
        </div>


    </div>
</template>

<script>
//Import de la classe CrudServices.js et appel des methodes
import CrudServices from "@/services/CrudServices";

export default {
  name: "Creer-pizza",
  data(){
    return{
      //Tableau vide des ingredients
      ingredients:[],
      //Tableau vide des ingredients selectionner
      listeIngredients:[],
      //Ingredient courant
      ingredientCourant: "",
      //Index dans le tableau -1 car les tableau comment a [0,1,2,3,etc...]
      ingredientIndex: -1,
      //Tableau vide des pizzas pour afficher les resultats
      pizzas:[],
    }
  },
  methods:{
    //Appel de la classe + methode get requète http sur la collection ingredients
    afficherIngredients(){
      CrudServices.getAllIngredients()
        //Promesse
      .then(response => {
        //On rempli le tableau avec les valeur de la collection json
        this.ingredients = response.data
      })
        //Sinon une erreur
      .catch(erreur => {
        console.log("Pas d'ingredient !" + erreur)
      })
    },

    //On passe en paramètres l'ingredient concerner, son index dans le tableau, son nom et son image
    ajouterIngredients(ingredient, index, nom, image){
      this.ingredientCourant = ingredient;
      this.ingredientIndex = index;
      //Supprime l'ingredient du bloc de doite
      this.ingredients.splice(index,1);
      //Ajoute ingredient dans le block de gauche
      this.listeIngredients.push({
        nom: nom,
        image:image
      })
    },

    supprimerIngredient(ingredientCourant, index){
      //Inverse
      this.listeIngredients.splice(index, 1);
      this.ingredients.push({
        nom: ingredientCourant.nom,
        image: ingredientCourant.image
      })
    }
  },

  //prpopiétées calculée
  computed:{
    trouverPizza(){
      //Liste de toutes les pizzas de la collection js pour remplir le tableau de pizzas
      //Appel de la classe + methode getAll axios requète http

      CrudServices.getAll()
        //On fait une promesse
      .then(response => {
        //On remplis le tableau
        this.pizzas = response.data
      })
        //Sinon on declenche une erreur
      .catch(erreur =>  {
        console.log(erreur)
      })
  //Filtre des données
      //Le tableau de pizza rempli est filtert et stocké dans une variables datas
      //Si pizza.ingredient1 est dans le tableau de liste des ingredient alors ca match et on peu affichée le tri des resultats
      return this.pizzas.filter(datas => {
        return datas.ingredient1.includes(this.listeIngredients.nom) &&
          datas.ingredient2.includes(this.listeIngredients.nom) &&
          datas.ingredient3.includes(this.listeIngredients.nom) &&
          datas.ingredient4.includes(this.listeIngredients.nom) &&
          datas.ingredient5.includes(this.listeIngredients.nom) &&
          datas.ingredient6.includes(this.listeIngredients.nom)
      })
    }
  },

  //Cycle de vie de Vuejs = instance de Vue + beforeCreate + created + beforeMonted et enfin mounted()
  //C'est a dire que lorque que la page est affichée on appel la propriété calculée qui GET toutes les pizzas et applique les filtre de manière asyncrone
  mounted() {
    this.trouverPizza
    this.afficherIngredients()
    console.log(this.listeIngredients)
    console.log(this.pizzas)

  }
}
</script>

<style scoped>
th{
  color: orangered;
  font-size: 14px;
  text-align: center;
}
td{
  color: #3c995c;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}
.no-result{
  display: none;
}
</style>
