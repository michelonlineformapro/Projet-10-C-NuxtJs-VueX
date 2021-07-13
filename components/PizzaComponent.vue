<template>
  <!--Bloc modele de carte a afficher dans Pizza.vue en important le composant <PizzaComponent>-->
  <div class="card">
    <!--Pour afficher les valeur on appel directement les props qui sont bindé-->
    <img class="card-img-top" style="padding: 20px" :src="image" alt="Card image cap">
    <div class="card-body">
      <h2 class="card-title text-white text-center"><b>{{nom}}</b></h2>
      <ul class="list-group">
        <li class="list-group-item active">INGREDIENTS :</li>
        <li class="list-group-item">{{ingredient1}}</li>
        <li class="list-group-item">{{ingredient2}}</li>
        <li class="list-group-item">{{ingredient3}}</li>
        <li class="list-group-item">{{ingredient4}}</li>
      </ul>
      <hr>
      <!--$emit permet de declencher une fonction depuis le composant enfant qui est definie dans le composant parent-->
      <!--Ceci permet de rendre les composant utilisable dans n'importe quel autre composant sans avoir a reecrire la logique metier-->
      <!--Dans un 1er temps l'event (addEventListener) s'appel commander puis on passe les props-->
      <!--Idem pour le 2nd bouton event = supprimer-->
      <!--Dans le composant parent il ne reste plus qu'a appeler les fonction avec v-on-->
      <!--v-on:commander="ajouterPizza" et v-on:supprimer="setPizzaConcerner(pizza, index)"-->
      <a v-if="btnStatus === 'btnCommander'" @click="$emit('commander',id, nom, image, ingredient1, ingredient2, ingredient3, ingredient4)" class="btn btn-info">COMMANDER</a>
      <a v-if="btnStatus === 'btnSupprimer'" @click="$emit('supprimer',id, nom, image, ingredient1, ingredient2, ingredient3, ingredient4)" class="btn btn-danger">SUPPRIMER</a>
      <hr>
    </div>
  </div>
</template>

<script>
//Import du composant parent
import Pizza from "../pages/Pizza";
export default {
  name: "PizzaComponent",
  components: {Pizza},
  //Définition des propriétés a utiliser pour afficher les valeurs dans le comosant parent
  props: ['id','nom', 'image', 'ingredient1', 'ingredient2', 'ingredient3', 'ingredient4', 'btnStatus'],
}
</script>

<style scoped>

</style>
