<template>
    <div class="customer-view" v-if="category">
        <div class="user-img">
            <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <td>{{ category.id }}</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>{{ category.cat_name }}</td>
                </tr>
            </table>
            <router-link to="/categories">Back to all categories</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'view',
        created() {
            if (this.categories.length) {
                this.category = this.categories.find((category) => category.id == this.$route.params.id);
            } else {
                axios.get(`/api/categories/${this.$route.params.id}`)
                    .then((response) => {
                        this.category = response.data.category
                    });
            }
        },
        data() {
            return {
                category: null
            };
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            categories() {
                return this.$store.getters.categories;
            }
        }
    }
</script>

<style scoped>
.customer-view {
    display: flex;
    align-items: center;
}
.user-img {
    flex: 1;
}
.user-img img {
    max-width: 160px;
}
.user-info {
    flex: 3;
    overflow-x: scroll;
}
</style>
