<template>
  <form class="row justify-content-end">
    <div class="col-6 mb-3">
      <label class="form-label">Company</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
      <small id="helpId" class="form-text text-muted">Company</small>
    </div>
    <div class="col-6 mb-3">
      <label class="form-label">Job Title</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
      <small id="helpId" class="form-text text-muted">Job Title</small>
    </div>
    <div class="col-6 mb-3">
      <label class="form-label">Rate</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
      <small id="helpId" class="form-text text-muted">Rate</small>
    </div>
    <div class="col-6 mb-3">
      <label class="form-label">Hours</label>
      <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="">
      <small id="helpId" class="form-text text-muted">Hours</small>
    </div>
    <div class="col-12 mb-3">
      <label class="form-label">Description</label>
      <textarea class="form-control" name="" id="" aria-describedby="helpId" rows="3"></textarea>
      <small id="helpId" class="form-text text-muted"></small>
    </div>

    <div class="col-6">
      <button class="btn btn-info w-100 rounded-pill">Create</button>
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

export default {
  props: { jobData: { type: Object, required: true } },


  setup(props) {
    const editable = ref({})

    onMounted(() => {
      editable.value = props.jobData
    })
    return {
      editable,
      async handleSubmit() {
        if (props.jobData.id) {
          await editCar()
        } else {
          await createCar()
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped></style>