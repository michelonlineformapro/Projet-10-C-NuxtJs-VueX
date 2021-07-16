<template>
  <div>
    <b-navbar id="menu" toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        <nuxt-logo></nuxt-logo>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse class="nav-item" id="nav-collapse" is-nav>

          <b-navbar-nav>
            <li>
              <nuxt-link class="nav-link" to="/">ACCUEIL</nuxt-link>
            </li>
            <li>
              <nuxt-link class="nav-link" to="/pizza">PIZZAS</nuxt-link>
            </li>

            <li>
              <nuxt-link class="nav-link" to="/Creer-pizza">COMPOSER VOTRE PIZZA</nuxt-link>
            </li>

          </b-navbar-nav>


        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/connexion">CONNEXION</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link" to="/inscription">INSCRIPTION</nuxt-link>
            </li>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Menu"
}
</script>

<style scoped>
#menu{
  border-bottom: darkorange solid 5px;
}
a{
  text-decoration: none;
  font-size: 25px;
  font-weight: bold;
}
.nuxt-logo {
  height: 20px;
}
</style>
