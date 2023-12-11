export const busOnline = () => {
    const data = [ // 需要可视化的数据
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
        addpendPadding: 10,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        label: {
            // 可手动配置label数据标签
            position: "top", // 位置：上中下 top bottom midden
            style: { // 样式
                fill: '#FFFFFF',
                opacity: 0.9,
            }
        },
        radius: 0.7,
        interactions: [{ type: 'element-active' }],
        height: 250
    }
    return {
        data, config
    }
}