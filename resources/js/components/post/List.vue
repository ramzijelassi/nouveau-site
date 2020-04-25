<template>
    <div class="container">
         <section class="content">
            <div class="row justify-content-around" >
                <div class="col-12 ">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Post List</h3>

                            <div class="card-tools">
                                <new-post @post-added="refresh"></new-post>
                            </div>
                        </div>

                        <!-- /.card-header -->
                        <div class="card-body">
                            <table id="example2" class="table">
                                <thead class="thead-dark">
                                <tr>
                                    <th>Sl</th>
                                    <th>User</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Photo</th>
                                    <th>Action Editer</th>
                                    <th>Action Delete</th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="post in posts.data" :key="post.id">
                                 <td>{{post.id}}</td>
                                 <td>{{post.user.name}}</td>
                                 <td>{{post.category.cat_name}}</td>
                                 <td>{{post.title | sortlength(20,"---")}}</td>
                                 <td>{{post.description | sortlength(40,"....")}}</td>
                                 <td><img :src="ourImage(post.photo)" alt="" width="40" height="50"></td>

                                 <td>
                                   <button type="button" class="btn btn-secondary" data-toggle="modal"
                                   data-target="#editpost" @click="getpost(post.id)">
                                    Editer
                                  </button>
                                  <edit-post v-bind:postToEdit="postToEdit" @post-updated="refresh"></edit-post>
                                 </td>
                                 <td>
                                     <button type="button"  class="btn btn-danger" @click="deletepost(post.id)">Supprimer</button>
                                 </td>
                                 </tr>
                                </tbody>


                            </table>
                        </div>
                        <!-- /.card-body -->
                    </div>

                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </section>
    </div>
</template>
<script>
export default {
    data(){
     return{
      posts:{},
      postToEdit:''
    }

    },
    created(){
     axios.get('http://localhost:8000/api/postList')
     .then(response=>this.posts=response.data)
     .catch(error=>console.log(error));
    },
    mounted(){

    },
    methods:{
     deletepost(id){
         axios.delete('http://localhost:8000/api/delete/' + id)
         .then(response=>this.posts=response.data)
         .catch(error=>console.log(error));
        },
     getpost(id){
         axios.get('http://localhost:8000/api/posts/edit/' + id)
         .then(response=>this.postToEdit=response.data)
         .catch(error=>console.log(error));
        },
      ourImage(img)
     {
        return "uploadimage/"+img;
     },
      refresh(posts){
         this.posts = posts.data
        }
    },
}
</script>
