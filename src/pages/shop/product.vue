<style lang="sass" scoped> @import 'core';

</style>

<template>
    <div class="page">
        <h1>Hello from a product</h1>
        <a v-link="{ name: 'shop-category', params: { slug: 'bar' } }">Go to a category</a>
    </div>
</template>

<script>
module.exports = {

};
</script>
