<template>
    <div>
     <!-- Button trigger modal -->
<button type="button" class="btn btn-primary my-3" data-toggle="modal" data-target="#exampleModal">
  Ajoouter Tache
</button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
             <form class="form-group">
                 <label for="">Nom de la tache</label>
                 <textarea name="name" id="name" cols="" v-model="name" rows="4" class="form-control" ></textarea>
             </form>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" @click="storeTask" data-dismiss="modal">Créer ma tache</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:''
        }
    },
    methods:{
        storeTask(){
         axios.post('http://localhost:8000/api/taskList',{
             name:this.name
         })
         .then(response=>this.$emit('task-added',response))
         .catch(error=>console.log(error));
        }
    }

}
</script>
