<template>
  <form class="row" @submit.prevent="handleSubmit()">
    <div class="col-3 mb-3">
      <label for="" class="form-label">Bedrooms</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.bedrooms">
      <small id="helpId" class="form-text text-muted"> {{ editable.bedrooms }}</small>
    </div>

    <div class="col-3 mb-3">
      <label for="" class="form-label">Bathrooms</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.bathrooms">
      <small id="helpId" class="form-text text-muted"> {{ editable.bathrooms }}</small>
    </div>

    <div class="col-3 mb-3">
      <label for="" class="form-label">Levels</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.levels">
      <small id="helpId" class="form-text text-muted"> {{ editable.levels }}</small>
    </div>

    <div class="col-3 mb-3">
      <label for="" class="form-label">Price</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.price">
      <small id="helpId" class="form-text text-muted"> {{ editable.price }}</small>
    </div>


    <div class="col-6 mb-3">
      <label for="" class="form-label">Year</label>
      <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.year">
      <small id="helpId" class="form-text text-muted"> {{ editable.year }}</small>
    </div>

    <div class="col-6 mb-3">
      <label for="" class="form-label">Image URL</label>
      <input type="url" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.imgUrl">
      <img :src="editable.imgUrl" class="img-fluid" alt="" />
    </div>

    <div class="col-12 mb-3">
      <label for="" class="form-label">Description</label>
      <textarea type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.description"></textarea>
      <small id="helpId" class="form-text text-muted"> {{ editable.description }}</small>
    </div>

    <div class="col-6 mb-2">
      <button v-if="!houseData.id" class="btn btn-info rounded-pill w-100" type="submit">CREATE HOUSE</button>
      <button v-else class="btn btn-success w-100 rounded-pill">Save</button>
    </div>
    <div class="col-6 mb-2">
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

  setup(props, { emit }) {
    const editable = ref({})

    async function createHouse() {
      try {
        await housesService.createHouse(editable.value)
        editable.value = {}
        Pop.toast('created house', 'success')
      } catch (error) {
        logger.error('[CREATING A HOUSE]', error)
        Pop.error(error)
      }
    }

    async function editHouse() {
      try {
        await housesService.editHouse(editable.value)
        Pop.toast('House edited', 'success')
        emit('HouseEdited')
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      editable.value = props.houseData
    })

    return {
      editable,
      async handleSubmit() {
        if (props.houseData.id) {
          await editHouse()
        } else {
          await createHouse()
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>