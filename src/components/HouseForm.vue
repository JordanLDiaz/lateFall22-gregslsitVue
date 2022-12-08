<template>
  <form class="row" @submit.prevent="createHouse()">
    <div class="col-3">
      <label for="" class="form-label">Bedrooms</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.bedrooms">
      <small id="helpId" class="form-text text-muted"> {{ editable.bedrooms }}</small>
    </div>

    <div class="col-3">
      <label for="" class="form-label">Bathrooms</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.bathrooms">
      <small id="helpId" class="form-text text-muted"> {{ editable.bathrooms }}</small>
    </div>

    <div class="col-3">
      <label for="" class="form-label">Levels</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.levels">
      <small id="helpId" class="form-text text-muted"> {{ editable.levels }}</small>
    </div>

    <div class="col-3">
      <label for="" class="form-label">Price</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.price">
      <small id="helpId" class="form-text text-muted"> {{ editable.price }}</small>
    </div>

    <div class="col-12">
      <label for="" class="form-label">Description</label>
      <textarea type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.description"></textarea>
      <small id="helpId" class="form-text text-muted"> {{ editable.description }}</small>
    </div>

    <div class="col-6">
      <label for="" class="form-label">Year</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.year">
      <small id="helpId" class="form-text text-muted"> {{ editable.year }}</small>
    </div>

    <div class="col-6">
      <label for="" class="form-label">Image URL</label>
      <input type="url" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.imgUrl">
      <img :src="editable.imgUrl" class="img-fluid" alt="" />
    </div>

    <div class="col-6 mt-3">
      <button class="btn btn-info rounded-pill w-100" type="submit">CREATE HOUSE</button>
    </div>
    <div class="col-6 mt-3">
      <button class="btn btn-outline w-100 rounded-pill selectable text-danger" type="button"
        @click="editable = {}">Cancel</button>
    </div>

  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from "../utils/Pop.js";
import { housesService } from "../services/HousesService.js";
import { logger } from "../utils/Logger.js";

export default {
  props: { houseData: { type: Object, default: {} } },

  setup(props) {

    const editable = ref({})

    return {
      editable,

      async createHouse() {
        try {
          await housesService.createHouse(editable.value)
          editable.value = {}
          Pop.toast('created house', 'success')
        } catch (error) {
          logger.error('[CREATING A HOUSE]', error)
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>

</style>