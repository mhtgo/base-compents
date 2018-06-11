import Vue from 'vue'
import Router from 'vue-router'
import BaseRouter from 'views/common/base-router.vue'
import layout from 'views/layout/index'

Vue.use(Router)

const routes = [{
        path: '/',
        name: 'layout',
        component: resolve => require(['../views/layout/index.vue'], resolve),
        redirect: '/Login',
        children: [{
                path: '/business/busPla',
                name: '商务管理',
                component: resolve => require(['../views/business/index.vue'], resolve),
                meta: {
                    title: '商务管理'
                }
            },
            {
                path: '/first',
                name: '欢迎',
                component: resolve => require(['../views/business/first.vue'], resolve),
                meta: {
                    title: '欢迎'
                }
            },
            {
                path: '/business/busPla/Customer',
                name: '客户管理',
                component: resolve => require(['../views/business/customer/index.vue'], resolve),
                meta: {
                    title: '客户管理'
                }
            },
            {
                path: '/business/busPla/Contract',
                name: '合同管理',
                component: resolve => require(['../views/business/contract/index.vue'], resolve),
                meta: {
                    title: '合同管理'
                }
            },
            {
                path: '/business/busPla/Track',
                name: '集装箱追踪查询',
                component: resolve => require(['../views/business/containerTrack/containerTrack.vue'], resolve),
                meta: {
                    title: '集装箱追踪查询'
                }
            },
            {
                path: '/business/busPla/ContainerOnPort',
                name: '在港箱查询',
                component: resolve => require(['../views/business/ContainerOnPort/ContainerOnPort.vue'], resolve),
                meta: {
                    title: '在港箱查询'
                }
            },
            {
                path: '/Home/SystemS',
                name: '系统管理工作台',
                component: resolve => require(['../views/business/system/index.vue'], resolve),
                meta: {
                    title: '系统管理工作台'
                }
            },
            {
                path: '/Home/SystemBase',
                name: '基础管理工作台',
                component: resolve => require(['../views/business/jobBase/index.vue'], resolve),
                meta: {
                    title: '基础管理工作台'
                }
            },
            {
                path: '/Home/SystemBase/Port',
                name: '港口管理',
                component: resolve => require(['../views/business/port/port.vue'], resolve),
                meta: {
                    title: '港口管理'
                },
            },
            {
                path: '/Home/SystemBase/EntrustSplitRule',
                name: '委托拆分计划规则',
                component: resolve => require(['../views/business/entrustSplitRule/index.vue'], resolve),
                meta: {
                    title: '委托拆分计划规则'
                },
            },
            {
                path: '/Home/SystemBase/ContainerType',
                name: '箱类型管理',
                component: resolve => require(['../views/business/containerType/index.vue'], resolve),
                meta: {
                    title: '箱类型管理'
                },
            },
            {
                path: '/Home/SystemBase/ContainerSize',
                name: '箱尺寸管理',
                component: resolve => require(['../views/business/containerSize/index.vue'], resolve),
                meta: {
                    title: '箱尺寸管理'
                },
            },
            {
                path: '/Home/SystemS/Department',
                name: '部门管理',
                component: resolve => require(['../views/business/system/department.vue'], resolve),
                meta: {
                    title: '部门管理'
                },
            },
            {
                path: '/Home/SystemS/excel',
                name: 'excel模板',
                component: resolve => require(['../views/business/base-excel/index.vue'], resolve),
                meta: {
                    title: 'excel模板'
                },
            },
            {
                path: '/Home/SystemS/Role',
                name: '角色管理',
                component: resolve => require(['../views/business/system/role.vue'], resolve),
                meta: {
                    title: '角色管理'
                },
            },
            {
                path: '/Home/SystemS/Org',
                name: '使用单位',
                component: resolve => require(['../views/business/system/org.vue'], resolve),
                meta: {
                    title: '使用单位'
                },
            },
            {
                path: '/Home/SystemS/Person',
                name: '用户管理',
                component: resolve => require(['../views/business/system/person.vue'], resolve),
                meta: {
                    title: '用户管理'
                },
            },
            {
                path: '/Home/SystemS/SystemParameter',
                name: '系统参数管理',
                component: resolve => require(['../views/business/system/systemParameter.vue'], resolve),
                meta: {
                    title: '系统参数管理'
                },
            },
            {
                path: '/Home/SystemS/SecurityGroup',
                name: '安全组',
                component: resolve => require(['../views/business/system/securityGroup.vue'], resolve),
                meta: {
                    title: '安全组'
                },
            },
            {
                path: '/Home/InterfaceManagement',
                name: 'interface-management',
                component: resolve => require(['../views/business/system/interfaceManagement.vue'], resolve),
                meta: {
                    title: '接口管理'
                },
            },
            {
                path: '/Home/SystemS/SystemDictionary',
                name: '系统字典',
                component: resolve => require(['../views/business/system/systemDictionary.vue'], resolve),
                meta: {
                    title: '系统字典'
                },
            },
            {
                path: '/work/JobBase',
                name: '现场作业基础管理',
                component: resolve => require(['../views/business/jobBase/index.vue'], resolve),
                meta: {
                    title: '现场作业基础管理'
                },
            },
            {
                path: '/work/JobPlan',
                name: '铁路作业计划管理',
                component: resolve => require(['../views/business/jobPlan/index.vue'], resolve),
                meta: {
                    title: '铁路作业计划管理'
                },
            },
            {
                path: '/work/JobTable',
                name: '计划列表',
                component: resolve => require(['../views/business/jobPlan/JobTable.vue'], resolve),
                meta: {
                    title: '计划列表'
                },
            },
            {
                path: '/work/gatePanel',
                name: '铁路道闸工作台',
                component: resolve => require(['../views/business/gatePanel/index.vue'], resolve),
                meta: {
                    title: '铁路道闸工作台'
                }
            },
            {
                path: '/work/containerJob',
                name: '铁路集装箱作业台',
                component: resolve => require(['../views/business/containerJob/index.vue'], resolve),
                meta: {
                    title: '铁路集装箱作业台'
                }
            },
            {
                path: '/work/containerJob/workList',
                name: '作业列表',
                component: resolve => require(['../views/business/workList/index.vue'], resolve),
                meta: {
                    title: '作业列表'
                }
            }
        ]
    },
    {
        path: '/business/busPla/Entrust',
        component: layout,
        redirect: '/business/busPla/Entrust/index',
        children: [{
                path: 'index',
                name: '委托管理',
                component: resolve => require(['../views/business/entrust/index'], resolve),
                meta: {
                    title: '委托管理'
                }
            },
            {
                path: 'Add',
                name: 'entrust-add',
                component: resolve => require(['../views/business/entrust/add-index.vue'], resolve),
                meta: {
                    title: '新增'
                }
            },
            {
                path: 'Add/Enter',
                name: 'entrust-add-enter',
                component: resolve => require(['../views/business/entrust/add/enter.vue'], resolve),
                meta: {
                    title: '进场入库委托新增'
                }
            },
            {
                path: 'Add/TakeOut',
                name: 'entrust-add-take-out',
                component: resolve => require(['../views/business/entrust/add/takeOut.vue'], resolve),
                meta: {
                    title: '提货出库委托新增'
                }
            },
            {
                path: 'Add/TakeApart',
                name: 'entrust-add-take-apart',
                component: resolve => require(['../views/business/entrust/add/takeApart.vue'], resolve),
                meta: {
                    title: '拆箱委托新增'
                }
            },
            {
                path: 'Add/Supply',
                name: 'entrust-add-supply',
                component: resolve => require(['../views/business/entrust/add/supply.vue'], resolve),
                meta: {
                    title: '补充委托新增'
                }
            }
        ]
    },
    {
        path: '/business/busPla/Project',
        name: 'Project',
        component: layout,
        meta: {
            title: 'Project'
        },
        redirect: '/business/busPla/Project/index',
        children: [{
            path: 'index',
            name: '项目管理',
            component: resolve => require(['../views/business/project/index.vue'], resolve),
            meta: {
                title: '项目管理'
            },
        }, {
            path: 'build/:model/:id',
            name: '项目操作',
            component: resolve => require(['../views/business/project/step.vue'], resolve),
            meta: {
                title: '项目操作'
            },
        }]
    },
    {
        path: '/Login',
        name: 'login',
        component: resolve => require(['../views/login/login.vue'], resolve),
        meta: {
            title: '登录'
        },
    },
    {
        path:'/Preview',
        name:'preview',
        component:resolve=>require(['../views/business/common/preview.vue'],resolve),
        meta:{
            title:'预览'
        }
    }
]

const router = new Router({
    routes,
})

router.afterEach(to => {
    document.title = (to.meta && to.meta.title) || '万州集装箱系统'
})

export default router
