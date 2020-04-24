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
                            <table id="example2" class="table table-bordered table-hover">
                                <thead>
                                <tr>

                                    <th>Sl</th>
                                    <th>User</th>
                                    <th>Category</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Photo</th>


                                </tr>
                                </thead>
                                <tbody>

                                <tr v-for="post in posts.data" :key="post.id">
                                 <td>{{post.id}}</td>
                                 <td>{{post.user.name}}</td>
                                 <td>{{post.category.cat_name}}</td>
                                 <td>{{post.title }}</td>
                                 <td>{{post.description }}</td>
                                 <td><img :src="ourImage(post.photo)" alt="" width="40" height="50"></td>
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
     refresh(posts){
      this.posts = posts.data
     },
      ourImage(img)
     {
        return "uploadimage/"+img;
     },
    },
}
</script>
