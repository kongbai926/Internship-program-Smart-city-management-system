<template>
    <div id='map'>
    </div>
</template>

<script>
import { Scene } from "@antv/l7";
import { Mapbox } from "@antv/l7-maps";
import mapboxgl from "mapbox-gl";
import { app } from "../main";
export default {
    name: 'HomeView',
    mounted() {
        // 读取mapbox-gl申请的token。
        const token = process.env.VUE_APP_mapboxToken;
        // 初始化地图与Scene对象
        mapboxgl.accessToken = token
        const mapboxMap = new mapboxgl.Map({
            container: 'map',
            // center: [114.23, 30.26],
            center: [120.145, 30.238915],
            style: "mapbox://styles/mapbox/navigation-night-v1",
            zoom: 4,
            projection: 'globe',
            language: 'auto',
            minZoom: 1
        });
        const scene = new Scene({
            id: 'map',
            map: new Mapbox({
                mapInstance: mapboxMap
            })
        });

        // 全局共享scene与map对象
        app.provide('#scene_map', { scene, mapboxMap })
    }
}


</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

#map {
    width: 100vw;
    height: 94vh;
}
</style>
