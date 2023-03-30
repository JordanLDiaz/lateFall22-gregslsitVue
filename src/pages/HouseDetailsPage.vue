<template>
  <div v-if="house" class="container">
    <div v-if="(editMode == false)" class="row justify-content-center">
      <div class="col-12 text-center">
        <h3>{{ house.bedrooms }} beds | {{ house.bathrooms }} baths | {{ house.levels }} levels</h3>
        <h4>$ {{ house.price }} | Built in: {{ house.year }}</h4>
      </div>
      <div class="col-6">
        <img class="img-fluid" :src="house.imgUrl" alt="">
      </div>
      <div class="col-6 d-flex flex-column justify-content-between">
        <p class="">{{ house.description }}</p>
      </div>
      <button @click="(editMode = true)" class="btn btn-info w-50 my-2">Edit<i class="mdi mdi-pencil"></i></button>
    </div>
    <div v-else class="row">
      <HouseForm :houseData="house" @houseEdited="(editMode = false)" />
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { housesService } from "../services/HousesService.js";
import { useRoute } from "vue-router";
// NOTE almost missed the above useRoute import! make sure this links!!

export default {

  setup() {
    const route = useRoute()
    const editMode = ref(false)

    async function getHouseById() {
      try {
        await housesService.getHousesById(route.params.id)
      } catch (error) {
        Pop.error(error)
        logger.log(error)
      }
    }

    onMounted(() => {
      getHouseById()
    })

    return {
      editMode,
      house: computed(() => AppState.activeHouse),

      async editHouse() {
        editMode.value = false
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>