<template>
    <div>
       <!-- Modal -->
        <div class="modal fade" id="editmoldal" tabindex="-1" role="dialog" aria-labelledby="editmoldal" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
             <form class="form-group">
                 <label for="">Editer de la tache</label>
                 <textarea name="name" id="name" cols="" v-model="taskToEdit.name" rows="4"
                 class="form-control" ></textarea>
             </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Close</button>
                <button type="button" class="btn btn-success" @click="update" data-dismiss="modal">Editer ma tache</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
  props:['taskToEdit'],
  methods:{
      update(){
          axios.patch('http://localhost:8000/api/taskList/update/' +this.taskToEdit.id,{
              name:this.taskToEdit.name
          })
          .then(response=>this.$emit('task-updated',response))
          .catch(error=>console.log(error));

      }
  }
}
</script>
