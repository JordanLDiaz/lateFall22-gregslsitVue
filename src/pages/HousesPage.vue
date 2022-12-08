<template>
  <div class="container-fluid">
    <h1 class="text-center text-primary">Houses</h1>
    <div class="row justify-content-center">
      <div class="col-8 bg-white p-3 elevation-1 rounded" id="house-form">
        <HouseForm />
      </div>
    </div>

    <div class="row">
      <div v-for="h in houses" :key="h.id" class="col-md-4 p-4">
        <HouseCard :house="h" />
      </div>
    </div>
  </div>


</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { housesService } from '../services/HousesService.js'
import HouseForm from "../components/HouseForm.vue";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
export default {
  setup() {
    async function getHouses() {
      try {
        await housesService.getHouses();
      }
      catch (error) {
        logger.log(error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getHouses();
    });
    return {
      houses: computed(() => AppState.houses)
    };
  },
  // NOTE Wait, why is this here? What does it do? 
  components: { HouseForm }
};
</script>


<style lang="scss" scoped>

</style>
