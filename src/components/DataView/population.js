export const population = () => {
    const data = [
        // 需要可视化的数据
        {
            type: '分类一', value: 27,
        }, {
            type: '分类二', value: 25,
        }, {
            type: '分类三', value: 18,
        }, {
            type: '分类四', value: 15,
        }, {
            type: '分类五', value: 10,
        }, {
            type: '其它', value: 5,
        },
    ]
    const config = { // 数据可视化环境配置
        appendPadding: 10,
        angleField: "value",
        colorField: "type",
        radius: 0.7,
        label: {
            type: "inner",
            labelHeight: 12,
            offset: "-10%",
            content: "{name}\n{percentage}",
            style: {
                // 设置标注样式
                fill: '#fff',
                stroke: 'black',
                shadowColor: '#652e80',
                shaowBlur: 20,
                cursor: 'pointer'
            }
        },
        interactions: [{ type: "element-active" }],
        // use custom theme
        theme: "custom-theme",
        height: 270,
        legend: { // 图例
            position: "top-center",
            itemName: {
                style: {
                    fill: '#fff'
                },
            },
            marker:{ // 图标
                symbol:'hollowCircle'
            }
        }
    }
    return {
        data, config
    }
}