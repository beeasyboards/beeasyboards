<style lang="sass">
@import 'src/style';
</style>

<template>
    <div>
        <v-header></v-header>
        <router-view transition="fade" transition-mode="out-in"></router-view>
    </div>
</template>

<script>
export default {
    components: {
        'v-header': require('./../components/header'),
    },
}
</script>
