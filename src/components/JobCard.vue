<template>
  <div class="card my-2 text-center selectable elevation-5">
    <img class="img-fluid rounded square-bottom"
      src="https://images.unsplash.com/photo-1529717730488-7a2492983b2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80">
    <h3> {{ job.company }} | {{ job.jobTitle }}</h3>
    <h5>{{ job.hours }} | {{ job.rate }}</h5>

    <div>
      <button class="btn btn-danger delete-btn rounded-pill w-25 m-2"><i class="mdi mdi-delete-forever"></i></button>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
  props: { job: { type: Object, required: true } },

  setup(props) {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>