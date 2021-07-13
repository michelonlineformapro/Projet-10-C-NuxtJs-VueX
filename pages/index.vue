<template>
  <div>
    <Menu/>
    <Tutorial/>
    <Footer/>
  </div>

</template>

<script>

import Menu from "../components/Menu";
import Footer from "../components/Footer";
export default {
  name:"index",
  components: {Footer, Menu}
}
</script>
