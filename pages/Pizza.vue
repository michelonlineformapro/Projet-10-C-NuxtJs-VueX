<template>
  <div>
    <!--Navbar-->
    <div class="container">
      <!--Import de la barre de recherche par nom de pizza component/RechercherPizza.vue-->
      <RechercherPizza/>
      <!---->
      <div class="row">
        <div class="col-md-8 col-sm-12">
          <div class="row">
            <!--Block de gauche choix de la pizza-->
            <h4 class="text-center text-info mt-3 bg-warning p-3">NOS PIZZAS</h4>
            <!--Boucle for collection json des pizzas + clé-->
            <div v-for="pizza in pizzas" :key="pizza.id" class="col-md-4 col-sm-12 mt-3">
              <!--Appel de fonction ajouterPizza depuis le composant enfant a l'aide de :commander-->
              <!--Afficher les produits à l'aide des props définit dans le composant enfant -->
              <!--Afficher le bouton commander si btn status (props) est == a btnCommander -->
              <PizzaComponent
                v-on:commander="ajouterPizza"
                btn-status="btnCommander"
                :nom="pizza.nom"
                :image="pizza.image"
                :ingredient1="pizza.ingredient1"
                :ingredient2="pizza.ingredient2"
                :ingredient3="pizza.ingredient3"
                :ingredient4="pizza.ingredient4"
                :ingredient5="pizza.ingredient5"
                :ingredient6="pizza.ingredient6"
              >
              </PizzaComponent>
            </div>
          </div>
        </div>

        <div class="col-md-4 col-sm-12">
          <div>
            <!--Bloc de doite pour afficher les commandes-->
            <h4 class="text-center text-info mt-3 bg-warning p-3">VOTRE COMMANDE</h4>
            <!--Bouton pour supprimer toutes la commande grace a la fonction ci-dessous (methods)-->
            <div class="text-center mt-4">
              <a @click="annulerCommande" class="btn btn-info">Annuler la commande</a>
            </div>
            <!--boucle de lecture des commandes et recupéraion de l'index sous forme de clé-->
            <div v-for="(pizza,index) in commandes" :key="index">
              <!--Si le bouleen commander pizza est true-->
              <!--Afficher les commandes avec le meme composant grace au props definies dans le composant enfant-->
              <!--Afficher le bouton supprimer si btnStatus == chaine de caractère btnSupprimer-->
              <!--Au click sur le bouton supprimer on declenche la fonction setPizza concerncer et sa supression-->
              <!--On recupère id et on supprimer index courant-->
              <PizzaComponent
                v-if="commanderPizza"
                :id="pizza.id"
                :nom="pizza.nom"
                :image="pizza.image"
                :ingredient1="pizza.ingredient1"
                :ingredient2="pizza.ingredient2"
                :ingredient3="pizza.ingredient3"
                :ingredient4="pizza.ingredient4"
                :ingredient5="pizza.ingredient5"
                :ingredient6="pizza.ingredient6"
                btn-status="btnSupprimer"
                v-on:supprimer="setPizzaConcerner(pizza, index)"
              >
              </PizzaComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Import des différents composant
import CrudServices from "@/services/CrudServices";
import PizzaComponent from "../components/PizzaComponent";
import Menu from "../components/Menu";
import Footer from "../components/Footer";

export default {
  name: "Pizza",
  components: {Footer, Menu, PizzaComponent},
  //Data binding (getter et setter)
  data() {
    return {
      //Tableau de pizza vide
      pizzas: [],
      //Bollen pour cacher les commandes
      commanderPizza: false,
      //TAbleau de commandes vide (rempli par le tableau de pizza au click sur btn ajouter)
      commandes: [],
      //La pizza ajouter dans le tableau de commandes
      pizzaCommandeCourante: null,
      //L'index du tableau de commande -1 car il commence pa commande[0, 1, 2, etc...]
      pizzaIndex: -1
    }
  },
  methods: {
    afficherPizzas() {
      //Requète HTTP methode get depuis le fichier CrudService.js classe et methode getAll (axios)
      CrudServices.getAll()
        //Creation d'une promesse
        .then(response => {
          //Le tableau de pizza vide est rempli par les valeur de la collection pizzas  db.json
          this.pizzas = response.data;
          //Debug
          console.log(response.data)
        })
        //Sinon on lance une erreur pour le debug
        .catch(error => {
          console.log("Pas de pizzas " + error)
        })
    },

    //Ajouter une pizza dans le tableau de commande
    //Reprise des paramètre a passer lors de l'appel de la fonction (dans notre composant enfant on utilise $emit + nom de la fonction + liste des props
    ajouterPizza(id,nom, image, ingredient1, ingredient2, ingredient3, ingredient4,ingredient5,ingredient6) {
      //On ajoute au tableau vide de comande les elements a l'aide de la fonction js push()
      this.commandes.push({
        id:id,
        nom: nom,
        image: image,
        ingredient1: ingredient1,
        ingredient2: ingredient2,
        ingredient3: ingredient3,
        ingredient4: ingredient4,
        ingredient5: ingredient5,
        ingredient6: ingredient6,
      });
      //Au click le booleen passe a true (v-if=commanderPizza dans le templatye)
      this.commanderPizza = true
    },

    //Recupère la pizza courante dans le tableau de commande grace a son index au click sur le bouton supprimer
    setPizzaConcerner(pizzaCourante, index){
      //Passe de null a la pizza concernée
      this.pizzaCommandeCourante = pizzaCourante;
      //Ici index de la pizza -1
      this.pizzaIndex = index
      //Debug
      console.log("indice courent :" + pizzaCourante)
      console.log("index :" + index)
      //On supprime la pizza concernée grace a son index et nombre d'element a supprimer du tableau commande = 1
      this.commandes.splice(index, 1)
    },

    //Supprime tous les elements du tableau commandes
    annulerCommande() {
      console.log("Commande annulée");
      //Index de depart du tableau = 0 et nombre d'elements a supprimer = tous soit 10 000
      this.commandes.splice(0, 10000)
    },

  },
  //Dans le cycle de vie apres insatnce de vue et beforeCreate et created on lance la fonction afficherPizza
  //A chaque refresh la liste est mise a jour
  mounted() {
    this.afficherPizzas()
    console.log(this.pizzaCommandeCourante)
    console.log("Le tablau des commandes : " + this.commandes)
  }
}
</script>

<style scoped>
.card {
  height: 100% !important;
  background-color: #b9cbce !important;
  border: none;
  border-radius: 0;
}
</style>
