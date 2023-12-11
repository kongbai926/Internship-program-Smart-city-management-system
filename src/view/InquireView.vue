<template>
    <div id='app'>
        <!-- 左边事件查看面板 -->
        <div class="left-canvans">
            <EventCard :dataSource="eventData" style="position: relative; left: 3vw;top: 2vh;" />
        </div>
        <!-- 加载城市三维视图时显示进度条 -->
        <div class="progress-bar" v-if="renderView && !renderProgressBar">
            <ProgressBarPanel />
        </div>

        <!-- 城市三维视图 -->
        <CityBuildData v-if="renderView" v-model:renderProgressBar="renderProgressBar" />
        <!-- 底部工具箱 -->
        <BottomTool v-model:valveForLayer="renderView" v-model:renderProgressBar="renderProgressBar"
            @eventData="(data) => { eventData = data }" />
    </div>
</template>

<script>
import CityBuildData from "@/components/InquireView/CityBuildData.vue";
import BottomTool from "@/components/InquireView/BottomTool.vue";
import EventCard from "@/components/InquireView//EventCard.vue";
import ProgressBarPanel from "@/components/InquireView/ProgressBarPanel.vue";
// import { computed } from "vue";
export default {
    components: {
        CityBuildData,
        BottomTool,
        EventCard,
        ProgressBarPanel
    },
    data() {
        return {
            renderView: false, // the valve 控制本视图初始化时是否显示三维城市图层。默认不显示
            renderProgressBar: false, // the valve 控制进度条，面板是否显示
            eventData: [],
        }
    },
    methods: {
    },
    mounted() {
    },
    watch: {
    }
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

.progress-bar {
    position: absolute;
    width: var(--width);
    height: var(--height);
    --width: 21vw;
    --height: 2vh;
    overflow: hidden;
    left: calc((100vw - var(--width)) / 2);
    top: calc((100vh - var(--height)) / 2);
    opacity: 0.8;
}
</style>