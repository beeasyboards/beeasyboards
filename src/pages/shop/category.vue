<style lang="sass" scoped> @import 'core';

</style>

<template>
    <div class="page">
        <h1>Hello from a category</h1>
        <a v-link="{ name: 'shop-product', params: { slug: 'foo' } }">Go to a product</a>
    </div>
</template>

<script>
module.exports = {

};
</script>
