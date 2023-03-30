<template>
  <div class="container-fluid">
    <h1 class="text-center text-primary">Jobs</h1>
    <div class="row justify-content-center">
      <div class="col-8 bg-white elevation-5 rounded p-3">
        <JobForm />
      </div>
    </div>

    <div class="row">
      <div v-for="j in jobs" class="col-md-4">
        <JobCard :job="j" />
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { jobsService } from '../services/JobsService.js'
export default {
  setup() {
    async function getJobs() {
      try {
        await jobsService.getJobs()
      } catch (error) {
        logger.error(error)
        Pop.error(error.message)
      }
    }

    onMounted(() => {
      getJobs()
    })

    return {
      jobs: computed(() => AppState.jobs)
    }
  }
};
</script>


<style lang="scss" scoped></style>
