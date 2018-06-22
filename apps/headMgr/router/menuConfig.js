module.exports = {
    phoneMenu: [
        {
            id: '1',
            name: '电话吧顾客到店识别',
            url: '/headMgr/phoneBar',
            icon: 'icon iconfont icon-user'
        },
        {
            id: '2',
            name: '门店私人订制数据统计',
            url: '/headMgr/personalTailor',
            icon: 'icon iconfont icon-reportmgr'
        },
        {
            id: '3',
            name: '客户到店详情',
            url: '/headMgr/shopDetails',
            icon: 'icon iconfont icon-defdoc'
        }
    ],
    workCheckMenu: [
        {
            id: '1',
            name: '考勤管理',
            url: '/checkWork/checkWorkindex',
            icon: 'icon iconfont icon-attendance'
        }, {
            id: '2',
            name: '用户管理',
            url: '/checkWork/dishCombo',
            icon: 'icon iconfont icon-attendance'
        }, {
            id: '3',
            name: '用户组管理',
            url: '/checkWork/hotPot',
            icon: 'icon iconfont icon-attendance'
        }, {
            id: '4',
            name: '考勤修改日志',
            url: '/checkWork/changePriceList',
            icon: 'icon iconfont icon-attendance'
        }, {
            id: '5',
            name: '年休假管理',
            url: '/checkWork/annualLeave',
            icon: 'icon iconfont icon-attendance'
        }
    ],
    configureMenu: [{
        id: '1',
        name: '发红包权限配置',
        url: '/toConfigure/giveRedEnvelopes',
        icon: 'icon iconfont icon-defdoc'
    },
        {
            id: '2',
            name: '海底捞特色',
            children: [{
                id: '2-1',
                name: '活动专区',
                url: '/toConfigure/activityIndex',
            }],
            icon: 'icon iconfont icon-defdoc'
        },
        {
            id: '3',
            name: '视频监控',
            url: '/toConfigure/dishLabel',
            icon: 'icon iconfont icon-defdoc'
        },
        {
            id: '4',
            name: '美甲配置',
            url: '/toConfigure/manicure',
            icon: 'icon iconfont icon-defdoc'
        },
        {
            id: '5',
            name: '考勤系统管理人员配置',
            url: '/toConfigure/checkStaff',
            icon: 'icon iconfont icon-defdoc'
        },
        {
            id: '6',
            name: '捞面手表区域管理',
            children: [
                {
                    id: '6-1',
                    name: '手表区域配置',
                    url: '/toConfigure/watchSet',
                },
                {
                    id: '6-2',
                    name: '捞面订单查看',
                    url: '/toConfigure/noodleList',
                },
                {
                    id: '6-3',
                    name: '提醒设置',
                    url: '/toConfigure/remindSet',
                }],
            icon: 'icon iconfont icon-defdoc'
        }

    ]
};
