<template>
  <form @submit.prevent="createJob()" class="row justify-content-end">
    <div class="col-6 mb-3">
      <label class="form-label">Company</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.company">
      <small id="helpId" class="form-text text-muted">{{ editable.company }}</small>
    </div>

    <div class="col-6 mb-3">
      <label class="form-label">Job Title</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.jobTitle">
      <small id="helpId" class="form-text text-muted">{{ editable.jobTitle }}</small>
    </div>

    <div class="col-6 mb-3">
      <label class="form-label">Rate</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.rate">
      <small id="helpId" class="form-text text-muted">{{ editable.rate }}</small>
    </div>

    <div class="col-6 mb-3">
      <label class="form-label">Hours</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
        v-model="editable.hours">
      <small id="helpId" class="form-text text-muted">{{ editable.hours }}</small>
    </div>

    <div class="col-12 mb-3">
      <label class="form-label">Description</label>
      <textarea class="form-control" name="" id="" aria-describedby="helpId" rows="3"
        v-model="editable.description"></textarea>
    </div>

    <div class="col-6">
      <button type="submit" class="btn btn-info w-100 rounded-pill">Create</button>
      <!-- <button v-else class="btn btn-success w-100 rounded-pill">Save</button> -->
    </div>

    <div class="col-6">
      <button class="btn btn-outline w-100 rounded-pill selectable text-danger">Cancel</button>
    </div>

  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { jobsService } from "../services/JobsService.js";

export default {
  props: { jobData: { type: Object, default: {} } },


  setup(props, { emit }) {
    const editable = ref({})

    onMounted(() => {
      editable.value = props.jobData
    })


    async function createJob() {
      try {
        const jobData = editable.value
        await jobsService.createJob(jobData)
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }
    return {
      editable,

      async handleSubmit() {
        await createJob()

      }
    }
  }
};
</script>


<style lang="scss" scoped></style>