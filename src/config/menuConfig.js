const menuList = [
  {
    title: '首页', // 菜单标题名称
    key: '/home', // 对应的path
    icon: 'el-icon-s-home', // 图标名称
    isPublic: true, // 公开的
  },
  {
    title: '商品',
    key: '/products',
    icon: 'el-icon-goods',
    children: [ // 子菜单列表
      {
        title: '品类管理',
        key: '/category',
        icon: 'el-icon-s-operation',
      },
      {
        title: '商品管理',
        key: '/product',
        icon: 'el-icon-edit-outline',
      },
    ],
  },

  {
    title: '用户管理',
    key: '/user',
    icon: 'el-icon-user',
  },
  {
    title: '角色管理',
    key: '/role',
    icon: 'el-icon-s-claim',
  },

  {
    title: '图形图表',
    key: '/charts',
    icon: 'el-icon-picture-outline',
    children: [
      {
        title: '柱形图',
        key: '/charts/bar',
        icon: 'el-icon-coin',
      },
      {
        title: '折线图',
        key: '/charts/line',
        icon: 'el-icon-s-operation',
      },
      {
        title: '饼图',
        key: '/charts/pie',
        icon: 'el-icon-pie-chart',
      },
    ],
  },

  /* {
    title: '订单管理',
    key: '/order',
    icon: 'windows',
  }, */
]

export default menuList
