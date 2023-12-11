<template>
    <div id='app'>
    </div>
</template>

<script>
import { inject } from "vue";
import mapboxgl from "mapbox-gl";
import { Scale, Fullscreen, MapTheme, MouseLocation } from "@antv/l7";
export default {
    data() {
        return {

        }
    },
    mounted() {
        // map与scene对象
        const { scene, mapboxMap } = inject('#scene_map')
        // map对象
        const map = mapboxMap
        map.on('load', () => {
            // 当前定位(受不可控因素影响，不开VPN定位超时)
            const geolocate = new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                    timeout: 20000
                },
                trackUserLocation: true,
                showUserHeading: true,
            })
            map.addControl(geolocate, 'top-left');
            geolocate.on('error', () => {
                alert('定位稍微出现一点小错误，请稍后尝试！');
            });

            // 方向按钮
            const nav = new mapboxgl.NavigationControl();
            map.addControl(nav, 'top-left');

            // 导航 因版本原因，mapbox-gl/direction库未安装成功，功能不可用
            // map.addControl(
            //     new mapboxgl.MapboxDirections({
            //         accessToken: process.env.VUE_APP_mapboxToken
            //     }),
            //     'top-left'
            // )

            // 设置大气
            mapboxMap.setFog({
                'range': [0.1, 0.8],
                'horizon-blend': 0.1,
                'color': 'white',
                'high-color': 'blue',
                'space-color': 'black',
                'star-intensity': 0.5
            });

        })

        // scene对象
        scene.on('loaded', () => {
            // 缩放比例尺
            scene.addControl(
                new Scale({
                    zoomInTitle: '放大',
                    zoomOutTitle: '缩小',
                    maxWidth: 100
                }));

            // 全屏
            scene.addControl(
                new Fullscreen({
                    // btnText: '进入全屏',
                    title: '全屏',
                    // exitBtnText: '退出全屏',
                    exitTitle: '退出'
                })
            )

            // 地图主题
            scene.addControl(
                new MapTheme({
                    title: '主题',
                    options: [
                        { value: 'mapbox://styles/mapbox/streets-v11', text: '街道', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=1' },
                        { value: 'mapbox://styles/mapbox/outdoors-v11', text: '户外', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=2' },
                        { value: 'mapbox://styles/mapbox/light-v10', text: '明亮', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=3' },
                        { value: 'mapbox://styles/mapbox/dark-v10', text: '黑暗', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=4' },
                        { value: 'mapbox://styles/mapbox/satellite-v9', text: '卫星', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=5' },
                        { value: 'mapbox://styles/mapbox/satellite-streets-v11', text: '卫星与街道', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=6' },
                        { value: 'mapbox://styles/mapbox/navigation-night-v1', text: '导航之夜', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=7' },
                        { value: 'mapbox://styles/mapbox/navigation-day-v1', text: '导航-白天', img: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.mH9YLFEL5YdVxJM82mjVJQAAAA?pid=ImgDet&rs=8' },
                    ],
                    popperTrigger: 'hover'
                })
            )


            // 鼠标所在经纬度
            scene.addControl(
                new MouseLocation({
                    transform: (postion) => {
                        return postion.map((item) => item.toFixed(4))
                    },
                    position: 'bottomcenter'
                })
            )
        })
    }
}


</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}
</style>