<style lang="sass" scoped>
div {
    border: 1px solid red;
    background-color: green;

    img {
        border: 1px solid blue;
        height: auto;
        max-width: 550px;
        width: 100%;
    }
}
</style>

<template>
    <div>
        <img v-if="color === 'black'" src="./../assets/logo_black.png" alt="Be Easy">
        <img v-else src="./../assets/logo_white.png" alt="Be Easy">
    </div>
</template>

<script>
module.exports = {

    /**
     * @type {Object}
     */
    props: {
        color: { default: 'black' },
    },
};
</script>
