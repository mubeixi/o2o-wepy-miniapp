多套主题，可以在后台切换

feat(组件): 新增一堆组件
1.新增form-diy组件
2.新增upload-image组件


//去掉tabbar
tabBar: {
    borderStyle: "white",
    color: "#999999",
    selectedColor: "#26C78D",
    list: [
        {
            "pagePath": "pages/index",
            "iconPath": "/static/tabbar/find.png",
            "selectedIconPath": "/static/tabbar/find.png",
            "text": "发现"
        },
        {
            "pagePath": "pages/index",
            "iconPath": "/static/tabbar/live.png",
            "selectedIconPath": "/static/tabbar/live.png",
            "text": "商品管理"
        },
        {
            "pagePath": "pages/index",
            "iconPath": "/static/tabbar/praise.png",
            "selectedIconPath": "/static/tabbar/praise.png",
            "text": "店铺设置"
        },
        {
            "pagePath": "pages/index",
            "iconPath": "/static/tabbar/notify.png",
            "selectedIconPath": "/static/tabbar/notify.png",
            "text": "入驻"
        },
        {
            "pagePath": "pages/index",
            "iconPath": "/static/tabbar/user.png",
            "selectedIconPath": "/static/tabbar/user.png",
            "text": "店铺信息"
        }
    ]
},

//IM客户如果发商品的话，跳转到对应的商品页面


// 只有一个叶子node时，选择可能父级node不会勾选上。
// 商户详情上滑优化（会出现重复的demo的情况)

