<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/categories/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
                <th>Category Name</th>
            </thead>
            <tbody>
                <template v-if="!categories.length">
                    <tr>
                        <td colspan="4" class="text-center">No Customers Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="category in categories" :key="category.id">
                        <td>{{ category.cat_name }}</td>
                        <td>
                            <router-link :to="`/categories/${category.id}`">View</router-link>
                            <router-link :to="`/categories/edit-category/${category.id}`"> Edit</router-link>
                            <a href="" @click.prevent = "deletecategory(category.id)" >Delete</a>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'list',
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
             deletecategory(id){
               axios.get('/api/category/'+id)
                   .then(()=>{
                      this.$store.dispatch('getCategories');
                   })
                   .catch(()=>{
                   })
            },
        }
    }
</script>

<style scoped>
.btn-wrapper {
    text-align: right;
    margin-bottom: 20px;
}
</style>
