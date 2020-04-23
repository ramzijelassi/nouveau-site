<template>
    <div class="category-new">
        <form @submit.prevent="updateCategory">
            <table class="table">
                <tr>
                    <th>Name</th>
                    <td>
                        <input type="text" name="cat_name" class="form-control"
                         v-model="category.cat_name" placeholder="Category Name"/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <router-link to="/categories" class="btn">Cancel</router-link>
                    </td>
                    <td class="text-right">
                        <input type="submit" value="Update" class="btn btn-primary">
                    </td>
                </tr>
            </table>
        </form>
        <div class="errors" v-if="errors">
            <ul>
                <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                    <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import validate from 'validate.js';
    export default {
        name: 'new',
        data() {
            return {
                category: {
                    cat_name: '',
                },
                errors: null
            };
        },
       computed: {
            categories() {
                return this.$store.getters.categories;
            },
            currentUser() {
                return this.$store.getters.currentUser;
            }
        },

        mounted(){
            axios.get(`/api/editcategory/${this.$route.params.id}`)
                .then((response)=>{
                    this.category = response.data.category
                })
        },

        methods: {
            updateCategory() {
               this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.category, constraints);
                if(errors) {
                    this.errors = errors;
                    return;
                }
                axios.post(`/api/update-category/${this.$route.params.id}`,this.$data.category)
                    .then((response) => {
                         this.$store.dispatch('getCategories');
                         this.$router.push('/categories');
                    });
            },
            getConstraints() {
                return {
                    cat_name: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 characters long'
                        }
                    },
                };
            }
        }
    }
</script>

<style>
.errors {
    background: lightcoral;
    border-radius:5px;
    padding: 21px 0 2px 0;
}
</style>
