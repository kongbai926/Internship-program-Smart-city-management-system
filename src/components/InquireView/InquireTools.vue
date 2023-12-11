<template>
    <el-popover placement="top" :width="200" trigger="click">
        <div class="tools">
            <i v-for="item in tools" :class="['iconfont', `icon-${item}`]" @click="launch(item)">
                <img :src="require(`@/assets/${item}.png`)" alt="图片丢失">
            </i>
        </div>
        <template #reference>
            <slot></slot>
        </template>
    </el-popover>
</template>

<script>
import { DrawPolygon, DrawRect, DrawCircle, DrawEvent } from "@antv/l7-draw";
import { inject } from "vue";
import { booleanPointInPolygon, point, polygon } from "@turf/turf";
export default {
    data() {
        return {
            scene: {}, // the scene 初始化scene对象
            tools: ['drawPolygonTool', 'drawRectTool', 'drawCircleTool', 'delete'], // 工具箱
            drawTools: {}, // 绘制工具的功能
            dataSource: [
                {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.2832564, 30.8791321], type: 'Point'
                    },
                    properties: {
                        id: 'Point-1', name: '剐蹭'
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.2856498, 30.164421], type: 'Point'
                    },
                    properties: {
                        id: 'Point-2', name: '撞车'
                    },
                },
                {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.365648, 30.1231464], type: 'Point'
                    },
                    properties: {
                        id: 'Point-3', name: '追尾'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.6589797, 30.1316131], type: 'Point'
                    },
                    properties: {
                        id: 'Point-4', name: '醉驾'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.53454131, 30.13215464], type: 'Point'
                    },
                    properties: {
                        id: 'Point-5', name: '车祸'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.56598, 30.7897434], type: 'Point'
                    },
                    properties: {
                        id: 'Point-6', name: '打架'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.346465, 30.3123435], type: 'Point'
                    },
                    properties: {
                        id: 'Point-7', name: '追尾'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.134648, 30.1656], type: 'Point'
                    },
                    properties: {
                        id: 'Point-8', name: '生育'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.346499, 30.34646], type: 'Point'
                    },
                    properties: {
                        id: 'Point-9', name: '高血压'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.132164, 30.2365645], type: 'Point'
                    },
                    properties: {
                        id: 'Point-10', name: '心脏病'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.131646, 30.8979132], type: 'Point'
                    },
                    properties: {
                        id: 'Point-11', name: '剐蹭'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.1316464, 30.897435223], type: 'Point'
                    },
                    properties: {
                        id: 'Point-12', name: '超速'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.879715, 30.656463], type: 'Point'
                    },
                    properties: {
                        id: 'Point-13', name: '逆行'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.13164, 30.9894536], type: 'Point'
                    },
                    properties: {
                        id: 'Point-14', name: '剐蹭'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.314634, 30.31649645], type: 'Point'
                    },
                    properties: {
                        id: 'Point-15', name: '醉驾'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.34164, 30.32564], type: 'Point'
                    },
                    properties: {
                        id: 'Point-16', name: '逃逸'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.131464, 30.9684434], type: 'Point'
                    },
                    properties: {
                        id: 'Point-17', name: '醉驾'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.32134, 30.56849463], type: 'Point'
                    },
                    properties: {
                        id: 'Point-18', name: '车祸'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.341464, 30.39846546], type: 'Point'
                    },
                    properties: {
                        id: 'Point-19', name: '车祸'
                    },
                }, {
                    type: 'Feature',
                    geometry: {
                        coordinates: [114.8974341, 30.356698], type: 'Point'
                    },
                    properties: {
                        id: 'Point-20', name: '逃逸'
                    },
                },
            ], // the source 事故数据源
            eventData: [] // the event data 事件数据。在绘制的图形内部出现的事件
        }
    },
    emits: [
        'eventData',
    ],
    methods: {
        // 添加绘制工具
        drawInter: function () {
            this.tools.forEach((item, index) => {
                switch (item.valueOf()) {
                    case 'drawPolygonTool':
                        this.drawTools[item] = new DrawPolygon(this.scene, {
                            areaOptions: {}
                        });
                        break;
                    case 'drawRectTool':
                        this.drawTools[item] = new DrawRect(this.scene, {
                            areaOptions: {}
                        });
                        break;
                    case 'drawCircleTool':
                        this.drawTools[item] = new DrawCircle(this.scene, {
                            areaOptions: {}
                        });
                        break;
                    default:
                        break;
                }
            })
        },

        // 停止之前选择的绘制工具
        stopDraw: function () {
            for (const key in this.drawTools) {
                var tool = this.drawTools[key];
                if (tool) {
                    tool.disable()
                }
            }
        },

        // 清除绘制的所有图像
        clearFearture: function () {
            for (const key in this.drawTools) {
                var tool = this.drawTools[key];
                if (tool) {
                    tool.clear()
                    tool.removeActiveFeature()
                }
            }
        },

        // 不同工具图标点击后触发事件，激发对应的绘制工具
        launch: function (option) {
            this.stopDraw() // 停止所有绘制工具的使用
            if (option === 'delete') {
                this.clearFearture() // 单独清除所有图像以及清除Fearture，在上一个函数调用时已经停止使用绘制工具
                this.eventData = [] // 清空事件数据
                document.onkeydown = null // 去除文档键盘监听事件
                return
            }
            var tool = this.drawTools[option] // 根据用户点击的选项'取出'对应的绘制工具
            // 启用用户点击选择的工具
            tool.enable()
            // 用户点击工具之后，监听键盘事件
            this.listen_keyBoard(tool)
            // 当用户绘制完成之后，将绘制图像范围内的事故数据放出去
            tool.on(DrawEvent.Change, (feartures) => {
                feartures.forEach((fearture) => {
                    const { geometry: { coordinates } } = fearture // 多边形的顶点坐标数组
                    var polygonUrf = polygon(coordinates) // 生成需要判断的外层的面
                    const resData = this.dataSource.filter(item => {
                        const { geometry: { coordinates } } = item // 事故数据中的点坐标数组
                        var pointUrf = point(coordinates) // 生成需要判断的内部的点
                        var isInArea = booleanPointInPolygon(pointUrf, polygonUrf) // boolean ‘生成的点’是否在‘生成的面’中的返回值
                        return isInArea
                    })
                    this.eventData = resData
                });
            });
        },

        // 监听键盘事件。
        listen_keyBoard(tool) {
            document.onkeydown = (event) => {
                // console.log(event)
                if (event.code === 'Escape') { // 当用户按下esc键时，停止绘制工具的使用，同时取消键盘监听事件
                    tool.disable()
                    document.onkeydown = null
                }
            }
        }
    },
    mounted() {
        const { scene } = inject('#scene_map')
        this.scene = scene

        // 初始化绘制工具
        this.drawInter()
    },
    watch: {
        eventData(newData) {
            this.$emit('eventData', newData)
        }
    }
}
</script>

<style scoped>
* {
    margin: 0px;
    padding: 0px
}

.tools {
    max-width: 200px;
    max-height: 30px;
    min-width: 50px;
    min-height: 10px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
}

.iconfont img {
    width: 25px;
    height: 25px;
}

.iconfont:hover {
    cursor: pointer;
    background-color: aqua;
}
</style>