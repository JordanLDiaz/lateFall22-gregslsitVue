<template>
  <div class="card text-center elevation-2 selectable" @click="goTo">
    <img class="img-fluid rounded square-bottom" :src="house.imgUrl" alt="house">
    <h5>{{ house.bedrooms }} beds| {{ house.bathrooms }} baths| {{ house.levels }} levels</h5>
    <h5> $ {{ house.price }}</h5>
    <p> {{ house.description }} </p>
    <div>
      <!-- <div v-if="house.creator" class="creator text-center p-1">
        <img :src="house.creator.picture" alt="">
        <span> {{ house.creator.name }}</span>
      </div> -->
      <button v-if="(house.creatorId == account.id)" @click="removeHouse(house.id)"
        class="btn btn-danger delete-btn rounded-pill w-25 m-2"><i class="mdi mdi-delete-forever"></i></button>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { housesService } from "../services/HousesService.js";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { useRouter } from "vue-router";

export default {
  props: { house: { type: Object, required: true } },

  setup(props) {
    const router = useRouter()
    // const editable = reactive({})
    return {
      // NOTE must add this after creating the delete button because??
      account: computed(() => AppState.account),

      async removeHouse() {
        try {
          // NOTE can pass id of house to be removed from the template OR pull it from props.
          if (await Pop.confirm) {
            await housesService.removeHouse(props.house.id)
          }
        } catch (error) {
          Pop.error(error)
          logger.error(error)
        }
      },

      goTo() {
        logger.log('pushing')
        router.push({ name: 'HouseDetails', params: { id: props.house.id } })
      }
    }
  }
};
</script>


<style lang="scss" scoped>
// NOTE nested classes for styling allow us to target specific nested elements better. Below has the image that's linked to the creator attribute that's within the card attribute
.card {
  &:hover .delete-btn {
    opacity: 1;
  }

  .creator {
    img {
      height: 30px;
      border-radius: 50em;
      margin-right: .25em;

    }
  }
}
</style>