<template>
    <div id='app' class="demo-progress">
        <el-progress
          :percentage="100"
          status="warning"
          :indeterminate="true"
          :duration="1"
        />
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods() {
    },
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
</style>