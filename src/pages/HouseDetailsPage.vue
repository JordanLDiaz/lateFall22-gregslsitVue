<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
        <img class="img-fluid" :src="house.imgUrl" alt="">
      </div>
      <div class="col-6">
        <p class=""> House Description: {{ house.description }}</p>
      </div>
      <div class="col-12">
        <h3>{{ house.bedrooms }} beds | {{ house.bathrooms }} baths | {{ house.levels }} levels</h3>
        <h4>$ {{ house.price }} | Built in: {{ house.year }}</h4>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { housesService } from "../services/HousesService.js";
import { useRoute } from "vue-router";
// NOTE almost missed the above useRoute import! make sure this links!!

export default {

  setup() {
    const route = useRoute()

    async function getHouseById() {
      try {
        await housesService.getHouseById(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }

    onMounted(() => {
      getHouseById()
    })

    return {
      house: computed(() => AppState.activeHouse),
    }
  }
};
</script>


<style lang="scss" scoped>

</style>