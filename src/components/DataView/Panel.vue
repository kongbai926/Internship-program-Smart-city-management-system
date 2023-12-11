<template>
    <div class="panel">
        <header class="panel-header">
            <slot name="header"></slot>
        </header>
        <hr>
        <div id="body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
// export default {
//     data() {
//         return {
//             }
//     },
//     methods() {
//     },
// }
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}
.panel{
    min-width: 200px;
    min-height: 250px;
    max-width: 5500px;
    max-height: 500px;
    overflow: hidden;
    background-color: #53697670;
    color: white;
    border-radius: 5%;
    opacity: 1;
    margin-bottom: 20px;
}
header{
    height: 30px;
    width: 100%;
    margin-bottom: 3px;
    text-align: center;
    line-height: 30px;
    font-size: 17px;
}
body{
    min-height: 100px;
}
</style>