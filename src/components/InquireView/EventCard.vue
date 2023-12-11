<template>
    <div id='app' v-if="dataSource.length">
        <!-- <b>父级表格边框: </b><el-switch v-model="parentBorder" /><i>子级表格边框: </i><el-switch v-model="childBorder" /> -->
        <el-table :data="dataSource" :border="parentBorder" style="width: 300px" @row-click="rowClick">
            <el-table-column label="类型" prop="type" />
            <el-table-column label="id" prop="properties.id" />
            <el-table-column label="事件" prop="properties.name" />
            <el-table-column type="expand">
                <template #default="props">
                    <div m="4">
                        <p m="t-0 b-2">Id: {{ props.row.properties.id }}</p>
                        <p m="t-0 b-2">类型: <span>{{ props.row.type }}</span>&nbsp;&nbsp;事件: <span>{{
                            props.row.properties.name }}</span>
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th colspan="3">
                                        Geometry
                                    </th>
                                </tr>
                                <tr>
                                    <th>类型</th>
                                    <th>经度</th>
                                    <th>纬度</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ props.row.geometry.type }}</td>
                                    <td>{{ props.row.geometry.coordinates[0] }}</td>
                                    <td>{{ props.row.geometry.coordinates[1] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { inject } from "vue";
import { PointLayer, Marker } from "@antv/l7";
export default {
    data() {
        return {
            parentBorder: false, // 父级表格边框控制阀门
            childBorder: false, // 子级表格边框控制阀门
            maker: {}, // 点击事故点的标注
            scene: {}, // scene对象，用于本组件操作scene对象
            map: {}, // map对象，用于本组件对map对象进行操作
            pointlayer: {}, // 事故点图层
        }
    },
    props: {
        dataSource: Array
    },
    methods: {
        // 事故点渲染
        accidentPoint: function (pointData) {
            // console.log(this.pointlayer)
            // 去除旧事故点
            this.removePoint()

            // 事故点数据处理
            var data = []
            pointData.forEach(item => {
                const {
                    geometry: { coordinates },
                    properties: { id, name },
                    ...rest
                } = item
                data.push({
                    lng: coordinates[0],
                    lat: coordinates[1],
                    id,
                    name,
                    ...rest
                })
            })

            // 事故点渲染
            const point_layers = new PointLayer({
                name: '事故点'
            }).source(data, {
                parser: {
                    type: 'json',
                    x: 'lng',
                    y: 'lat',
                }
            })
                .shape('crash').size(15)
                // 向scene对象添加图层进行显示
            this.scene.addLayer(point_layers)
            this.pointlayer = point_layers
        },

        // 点击表格中的某一行时，地图飞行到对应的事故点并添加标注
        rowClick: function (row) {
            // 消除之前旧的标注
            this.removePoint({})

            const { geometry: { coordinates } } = row
            // 在row对应的事故点创建标注
            this.maker = new Marker({
                color: 'yellow',
                extData: { ...row }
            }).setLnglat(coordinates)
            this.scene.addMarker(this.maker)

            // 地图飞行到row对应的事故点
            this.map.flyTo({
                center: coordinates,
                zoom: 16,
            })
        },

        // 移除旧的事故点以及相关标记
        removePoint: function (point = this.pointlayer, maker = this.maker) {
            if (maker.markerOption && point.name) { // 点标记marker以及事故点point都存在时同时去除两个对象
                maker.remove()
                this.scene.removeLayer(point)
            } else if (point.name) { // 仅存在事故点point时，去除point
                this.scene.removeLayer(point)

            } else if (maker.markerOption) { // 仅存在事故点标记marker时，去除marker
                maker.remove()
            }
        }
    },
    mounted() {
        // 引入scene、map对象
        const { scene, mapboxMap: map } = inject('#scene_map')
        this.scene = scene
        this.map = map

        // 添加图片
        const img = require('@/assets/交通事故.png')
        scene.addImage('crash', img)

        // 创建事故点图层
        this.accidentPoint(this.dataSource)

    },
    watch: {
        dataSource(newData) {
            // 传递空数据时，1.消除旧的事故点point 2.消除旧的事故标记点marker
            if (!newData) {
                this.removePoint()
            }
            // 接收到新数据时，绘制新的事故点
            this.accidentPoint(newData)
        }
    },
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

#app {
    max-width: 40vw;
    max-height: 80vh;
    min-width: 10vw;
    min-height: 2vh;
    overflow: auto;
}

table,
th,
td {
    border: 1px solid;
}

table {
    width: 100%;
    margin: 0 auto;
    display: block;
    overflow-x: auto;
    border-spacing: 0;
}

thead {
    text-align: center;
}

tbody {
    white-space: nowrap;
}

th,
td {
    padding: 5px 10px;
    border-top-width: 0;
    border-left-width: 0;
}

th {
    position: sticky;
    top: 0;
    background: #fff;
    vertical-align: bottom;
}

tr:last-child td {
    border-bottom-width: 0;
}
</style>