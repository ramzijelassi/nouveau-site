<template>
    <div class="container">
        <new-task @task-added="refresh"></new-task>
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center"
             v-for="task in tasks.data" :key="task.id">
                <a href="#">{{task.name}}</a>
             <div>
                 <button type="button" class="btn btn-secondary" data-toggle="modal" data-target="#editmoldal"
              @click="getTask(task.id)"
             >
                Editer
            </button>
             <button type="button" class="btn btn-danger" @click="deletetask(task.id)">Supprimer</button>
             </div>
            </li>
        <edit-task v-bind:taskToEdit="taskToEdit" @task-updated="refresh" data-dismiss="modal"></edit-task>
        </ul>
        <pagination :data="tasks" @pagination-change-page="getResults" class="mt-5"></pagination>

    </div>
</template>
<script>
export default {
    data(){
     return{
      tasks:{},
      taskToEdit:''
    }

    },
    created(){
     axios.get('http://localhost:8000/api/taskList')
     .then(response=>this.tasks=response.data)
     .catch(error=>console.log(error));
    },
    mounted(){

    },
    methods:{
       getResults(page = 1) {
			axios.get('http://localhost:8000/api/taskList' + page)
                .then(response=>{
                    this.tasks=response.data;
                });
        },
        getTask(id){
         axios.get('http://localhost:8000/api/tasks/edit/' + id)
         .then(response=>this.taskToEdit=response.data)
         .catch(error=>console.log(error));
        },
        deletetask(id){
         axios.delete('http://localhost:8000/api/tasks/' + id)
         .then(response=>this.tasks=response.data)
         .catch(error=>console.log(error));
        },
        refresh(tasks){
         this.tasks = tasks.data
        }
    },
}
</script>
