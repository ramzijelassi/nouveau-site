<template>
    <div>
     <!-- Button trigger modal -->
<button type="button" class="btn btn-primary my-3" data-toggle="modal" data-target="#exampleModal">
  Ajoouter Post
</button>
        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Modal Post</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
              <label for="postId">Add New Post </label>
              <input type="text" class="form-control" id="postId" placeholder="Add New Post"
                v-model="form.title" name="title" :class="{ 'is-invalid': form.errors.has('title') }">
               <has-error :form="form" field="title"></has-error>
            </div>
            <div class="form-group">
              <label for="descriptionId">Add New Description</label>
              <textarea  class="form-control" v-model="form.description"></textarea>
              <has-error :form="form" field="description"></has-error>
            </div>
            <div class="form-group" >
              <label>Select</label>
              <select class="form-control"
                :class="{ 'is-invalid': form.errors.has('cat_id') }"
                v-model="form.cat_id">
              <option disabled value="">Select One</option>
              <option :value="category.id" v-for="category in categories">option
              {{category.cat_name}}</option>
              </select>
             <has-error :form="form" field="cat_id"></has-error>
            </div>
            <div class="form-group" >
             <input @change = "changePhoto($event)" name="photo" type="file" :class="{ 'is-invalid': form.errors.has('photo') }">
             <img :src="form.photo" alt="" width="80" height="80">
             <has-error :form="form" field="photo"></has-error>
            </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success"  @click="storePost" data-dismiss="modal">Créer ma Post</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
   name: "New",
        data(){
        return{
         form: new Form({
            title:'',
            description:'',
            cat_id:'',
            photo:'',
            })
         }
        },
        mounted() {
         if (this.categories.length) {
            return;
          }

            this.$store.dispatch('getCategories');
        },
        computed: {
         categories() {
                return this.$store.getters.categories;
          },
         currentUser() {
                return this.$store.getters.currentUser;
          }
        },
    methods:{
        storePost(){
        axios.post('http://localhost:8000/api/savepost',{
             title:this.form.title,
             description:this.form.description,
             cat_id:this.form.cat_id,
              photo:this.form.photo
         })
         .then(response=>this.$emit('post-added',response))
         .catch(error=>console.log(error));
        },
        changePhoto(event){
                let file = event.target.files[0];
                 if(file.size>1048576){
                     swal({
                         type: 'error',
                         title: 'Oops...',
                         text: 'Something went wrong!',
                         footer: '<a href>Why do I have this issue?</a>'
                     })
                 }else{
                     let reader = new FileReader();
                     reader.onload = event => {
                         this.form.photo = event.target.result
                         console.log(event.target.result)
                     };
                     reader.readAsDataURL(file);
                 }
            },
    }

}
</script>

