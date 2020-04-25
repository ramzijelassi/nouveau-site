<template>
    <div>
       <!-- Modal -->
        <div class="modal fade" id="editpost" tabindex="-1" role="dialog" aria-labelledby="editpost"
         aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
             <div class="form-group">
                 <label for="postId">Editer Post </label>
              <input type="text" class="form-control" id="postId" placeholder="Add New Post"
                v-model="postToEdit.title" name="title">
             </div>
             <div class="form-group">
             <label for="descriptionId">Update Description</label>
             <textarea  class="form-control"
             v-model="postToEdit.description" name="description">
             </textarea>
             </div>
             <div class="form-group" >
                <label>Select</label>
                <select class="form-control" v-model="postToEdit.cat_id">
                 <option disabled value="">Select One</option>
                 <option :value="category.id" v-for="category in categories">{{category.cat_name}}</option>
                </select>
            </div>
             <div class="form-group" >
              <input @change = "changePhoto($event)" name="photo" type="file" >
              <img :src="updateImage()" alt="" width="80" height="80">
            </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary">Close</button>
                <button type="button" class="btn btn-success" @click="updatepost" data-dismiss="modal">Editer ma tache</button>
            </div>
            </div>
        </div>
        </div>
    </div>
</template>
<script>
export default {
  props:['postToEdit'],
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

      updatepost(){
         axios.patch('http://localhost:8000/api/postList/update/' +this.postToEdit.id,{
              title:this.postToEdit.title,
              description:this.postToEdit.description,
              cat_id:this.postToEdit.cat_id,
              photo:this.form.photo,
              user_id:this.postToEdit.user_id,
          })
          .then(response=>this.$emit('post-updated',response))
          .catch(error=>console.log(error));
      },
       updateImage(){
        let img = this.form.photo;
         if(img.length>100){
            return  this.form.photo
         }else{
           return `uploadimage/${this.postToEdit.photo}`
         }
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

        }
  }
}
</script>
