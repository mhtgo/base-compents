// 系统列表
export const permissions = [{
        id: ['WPTMGR'],
        label: '平台管理',
        children: [{
                id: ['WPTMGR_SYSMGR'],
                label: '系统管理',
                children: [{
                    id: ['WPTMGR_SYSMGR_ORGMGR'],
                    label: '单位管理',
                    children: [{
                        id: ['WPTMGR_SYSMGR_ORGMGR:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_ORGMGR:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_ORGMGR:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_ORGMGR:DISABLED'],
                        label: '注销',
                    }, {
                        id: ['WPTMGR_SYSMGR_ORGMGR:ENABLED'],
                        label: '启用',
                    }]
                }, {
                    id: ['WPTMGR_SYSMGR_ROLEMGR'],
                    label: '角色管理',
                    children: [{
                        id: ['WPTMGR_SYSMGR_ROLEMGR:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_ROLEMGR:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_ROLEMGR:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_ROLEMGR:DEL'],
                        label: '删除',
                    }, {
                        id: ['WPTMGR_SYSMGR_ROLEMGR:PERMISSION'],
                        label: '分配权限',
                    }]
                }, {
                    id: ['WPTMGR_SYSMGR_DEPTMGR'],
                    label: '部门管理',
                    children: [{
                        id: ['WPTMGR_SYSMGR_DEPTMGR:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_DEPTMGR:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_DEPTMGR:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_DEPTMGR:DEL'],
                        label: '删除',
                    }]
                }, {
                    id: ['WPTMGR_SYSMGR_EXCEL'],
                    label: 'EXCEL导入模板下载',
                    children: [{
                        id: ['WPTMGR_SYSMGR_EXCEL:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_EXCEL:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_EXCEL:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_EXCEL:DEL'],
                        label: '删除',
                    }]
                }, {
                    id: ['WPTMGR_SYSMGR_PERSONMGR'],
                    label: '用户管理',
                    children: [{
                        id: ['WPTMGR_SYSMGR_PERSONMGR:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_PERSONMGR:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_PERSONMGR:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_PERSONMGR:DEL'],
                        label: '删除',
                    }, {
                        id: ['WPTMGR_SYSMGR_PERSONMGR:DISABLED'],
                        label: '注销',
                    }, {
                        id: ['WPTMGR_SYSMGR_PERSONMGR:ENABLED'],
                        label: '启用',
                    }]
                }, {
                    id: ['WPTMGR_SYSMGR_PARAMETER'],
                    label: '系统参数设置',
                    children: [{
                        id: ['WPTMGR_SYSMGR_PARAMETER:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_PARAMETER:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_PARAMETER:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_PARAMETER:DEL'],
                        label: '删除',
                    }]
                }, {
                    id: ['WPTMGR_SYSMGR_DICTIONARY'],
                    label: '系统字典管理',
                    children: [{
                        id: ['WPTMGR_SYSMGR_DICTIONARY:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_DICTIONARY:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_DICTIONARY:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_DICTIONARY:DEL'],
                        label: '删除',
                    }]
                }, {
                    id: ['WPTMGR_SYSMGR_SECURITYGROUP'],
                    label: '安全组',
                    children: [{
                        id: ['WPTMGR_SYSMGR_SECURITYGROUP:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_SYSMGR_SECURITYGROUP:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_SYSMGR_SECURITYGROUP:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_SYSMGR_SECURITYGROUP:DEL'],
                        label: '删除',
                    }]
                }]
            },
            {
                id: ['WPTMGR_BASEMGR'],
                label: '基础管理',
                children: [{
                    id: ['WPTMGR_BASEMGR_PORT'],
                    label: '港口及站点管理',
                    children: [{
                        id: ['WPTMGR_BASEMGR_PORT:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WPTMGR_BASEMGR_PORT:ADD'],
                        label: '新增',
                    }, {
                        id: ['WPTMGR_BASEMGR_PORT:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WPTMGR_BASEMGR_PORT:DEL'],
                        label: '删除',
                    }]
                }, {
                    id: ['WJOB_BASEMGR_ENTRUSTSPLIT'],
                    label: '委托拆分计划规则',
                    children: [{
                        id: ['WJOB_BASEMGR_ENTRUSTSPLIT:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_BASEMGR_ENTRUSTSPLIT:ADD'],
                        label: '新增',
                    }, {
                        id: ['WJOB_BASEMGR_ENTRUSTSPLIT:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WJOB_BASEMGR_ENTRUSTSPLIT:DEL'],
                        label: '删除',
                    }]
                }, {
                    id: ['WJOB_BASEMGR_CONTAINERTYPE'],
                    label: '箱型管理',
                    children: [{
                        id: ['WJOB_BASEMGR_CONTAINERTYPE:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_BASEMGR_CONTAINERTYPE:ADD'],
                        label: '新增',
                    }, {
                        id: ['WJOB_BASEMGR_CONTAINERTYPE:UPD'],
                        label: '编辑',
                    }, {
                        id: ['WJOB_BASEMGR_CONTAINERTYPE:DEL'],
                        label: '删除',
                    }]
                }]
            }
        ]
    },
    {
        id: ['WBUSMGR'],
        label: '商务管理',
        children: [{
            id: ['WBUSMGR_BUSMGR'],
            label: '商务管理工作台',
            children: [{
                id: ['WBUSMGR_BUSMGR_CUSTOM'],
                label: '客户管理',
                children: [{
                    id: ['WBUSMGR_BUSMGR_CUSTOM:QUERY'],
                    label: '查询',
                }, {
                    id: ['WBUSMGR_BUSMGR_CUSTOM:ADD'],
                    label: '新增',
                }, {
                    id: ['WBUSMGR_BUSMGR_CUSTOM:UPD'],
                    label: '编辑',
                }, {
                    id: ['WBUSMGR_BUSMGR_CUSTOM:DEL'],
                    label: '删除',
                }]
            }, {
                id: ['WBUSMGR_BUSMGR_CONTRACT'],
                label: '合同管理',
                children: [{
                    id: ['WBUSMGR_BUSMGR_CONTRACT:QUERY'],
                    label: '查询',
                }, {
                    id: ['WBUSMGR_BUSMGR_CONTRACT:ADD'],
                    label: '新增',
                }, {
                    id: ['WBUSMGR_BUSMGR_CONTRACT:UPD'],
                    label: '编辑',
                }, {
                    id: ['WBUSMGR_BUSMGR_CONTRACT:DEL'],
                    label: '删除',
                }, {
                    id: ['WBUSMGR_BUSMGR_CONTRACT:ADDEXTRA'],
                    label: '新增补充协议',
                }, {
                    id: ['WBUSMGR_BUSMGR_CONTRACT:VOID'],
                    label: '作废',
                }, {
                    id: ['WBUSMGR_BUSMGR_CONTRACT:SIGN'],
                    label: '签订',
                }]
            }, {
                id: ['WBUSMGR_BUSMGR_PROJECTMGR'],
                label: '项目管理',
                children: [{
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:QUERY'],
                    label: '查询',
                }, {
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:ADD'],
                    label: '新增',
                }, {
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:UPD'],
                    label: '编辑',
                }, {
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:DEL'],
                    label: '删除',
                }, {
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:VOID'],
                    label: '作废',
                }, {
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:FROZEN'],
                    label: '冻结',
                }, {
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:UNFROZEN'],
                    label: '解冻',
                }, {
                    id: ['WBUSMGR_BUSMGR_PROJECTMGR:END'],
                    label: '完结',
                }]
            }, {
                id: ['WBUSMGR_BUSMGR_ENTRUSTMGR'],
                label: '委托管理',
                children: [{
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:QUERY'],
                    label: '查询',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:ADD'],
                    label: '新增',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:UPD'],
                    label: '编辑',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:DEL'],
                    label: '删除',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:ADDSUPPLY'],
                    label: '补充委托',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:VOID'],
                    label: '作废',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:ACCEPT'],
                    label: '受理',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:END'],
                    label: '完结',
                }, {
                    id: ['WBUSMGR_BUSMGR_ENTRUSTMGR:FALL'],
                    label: '落空',
                }]
            }, {
                id: ['WBUSMGR_BUSMGR_COMPREHENSIVE'],
                label: '综合查询',
                children: [{
                    id: ['WBUSMGR_BUSMGR_COMPREHENSIVE:CONTAINERTRACKING'],
                    label: '集装箱跟踪',
                }, {
                    id: ['WBUSMGR_BUSMGR_COMPREHENSIVE:CONTAINERINPORTQUERY'],
                    label: '在港箱查询',
                }]
            }]
        }]
    },
    {
        id: ['WJOB'],
        label: '现场作业',
        children: [
            // {
            //     id: ['WJOB_BASEMGR'],
            //     label: '基础管理工作台',
            //     children: [{
            //         id: ['WJOB_BASEMGR_ENTRUSTSPLIT'],
            //         label: '委托拆分计划规则',
            //         children: [{
            //             id: ['WJOB_BASEMGR_ENTRUSTSPLIT:QUERY'],
            //             label: '查询',
            //         }, {
            //             id: ['WJOB_BASEMGR_ENTRUSTSPLIT:ADD'],
            //             label: '新增',
            //         }, {
            //             id: ['WJOB_BASEMGR_ENTRUSTSPLIT:UPD'],
            //             label: '编辑',
            //         }, {
            //             id: ['WJOB_BASEMGR_ENTRUSTSPLIT:DEL'],
            //             label: '删除',
            //         }]
            //     }, {
            //         id: ['WJOB_BASEMGR_CONTAINERTYPE'],
            //         label: '箱型管理',
            //         children: [{
            //             id: ['WJOB_BASEMGR_CONTAINERTYPE:QUERY'],
            //             label: '查询',
            //         }, {
            //             id: ['WJOB_BASEMGR_CONTAINERTYPE:ADD'],
            //             label: '新增',
            //         }, {
            //             id: ['WJOB_BASEMGR_CONTAINERTYPE:UPD'],
            //             label: '编辑',
            //         }, {
            //             id: ['WJOB_BASEMGR_CONTAINERTYPE:DEL'],
            //             label: '删除',
            //         }]
            //     }]
            // },
            {
                id: ['WJOB_TRAIN'],
                label: '铁路道闸工作台',
                children: [{
                    id: ['WJOB_TRAIN_STATISTICALQUERY'],
                    label: '统计查询'
                }, {
                    id: ['WJOB_TRAIN_ARRIVE'],
                    label: '到达',
                    children: [{
                        id: ['WJOB_TRAIN_ARRIVE:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_TRAIN_ARRIVE:ADD'],
                        label: '确报录入',
                    }, {
                        id: ['WJOB_TRAIN_ARRIVE:CONFIRM'],
                        label: '接车确认',
                    }, {
                        id: ['WJOB_TRAIN_ARRIVE:DEL'],
                        label: '删除',
                    }]
                }, {
                    id: ['WJOB_TRAIN_DISPATCH'],
                    label: '发运',
                    children: [{
                        id: ['WJOB_TRAIN_DISPATCH:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_TRAIN_DISPATCH:SEND'],
                        label: '发送',
                    }]
                }]
            },
            {
                id: ['WJOB_CONTAINERPLAN'],
                label: '铁路作业计划工作台',
                children: [{
                    id: ['WJOB_CONTAINERPLAN_TXJH'],
                    label: '提箱计划',
                    children: [{
                        id: ['WJOB_CONTAINERPLAN_TXJH:QUERY'],
                        label: '查询',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLAN_JCJH'],
                    label: '进场计划',
                    children: [{
                        id: ['WJOB_CONTAINERPLAN_JCJH:QUERY'],
                        label: '查询',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLAN_NZRC'],
                    label: '内转入场计划',
                    children: [{
                        id: ['WJOB_CONTAINERPLAN_NZRC:QUERY'],
                        label: '查询',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLAN_NZCC'],
                    label: '内转出场计划',
                    children: [{
                        id: ['WJOB_CONTAINERPLAN_NZCC:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_CONTAINERPLAN_NZCC:ADD'],
                        label: '新增',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLAN_CXJH'],
                    label: '拆箱计划',
                    children: [{
                        id: ['WJOB_CONTAINERPLAN_CXJH:QUERY'],
                        label: '查询',
                    }]
                }]
            },
            {
                id: ['WJOB_CONTAINERPLANJOB'],
                label: '铁路集装箱工作台',
                children: [{
                    id: ['WJOB_CONTAINERPLANJOB_STATISTICALQUERY'],
                    label: '作业量统计'
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_TRAINTX'],
                    label: '火车提箱',
                    children: [{
                        id: ['WJOB_CONTAINERPLANJOB_TRAINTX:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_TRAINTX:TX'],
                        label: '提箱',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_TRAINTX:BACTH'],
                        label: '批量提箱',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_TRAINTX:CANCEL'],
                        label: '取消作业',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_TRAINJC'],
                    label: '火车进场',
                    children: [{
                        id: ['WJOB_CONTAINERPLANJOB_TRAINJC:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_TRAINJC:JC'],
                        label: '进场',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_TRAINJC:BACTH'],
                        label: '批量进场',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_TRAINJC:CANCEL'],
                        label: '取消作业',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_CX'],
                    label: '拆箱作业',
                    children: [{
                        id: ['WJOB_CONTAINERPLANJOB_CX:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CX:CX'],
                        label: '拆箱',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CX:BACTH'],
                        label: '批量拆箱',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CX:CANCEL'],
                        label: '取消作业',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CX:UPLOADFILE'],
                        label: '上传记录',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_CARTX'],
                    label: '汽车提箱',
                    children: [{
                        id: ['WJOB_CONTAINERPLANJOB_CARTX:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CARTX:TX'],
                        label: '提箱',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CARTX:BACTH'],
                        label: '批量提箱',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CARTX:CANCEL'],
                        label: '取消作业',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_CARJC'],
                    label: '汽车进场',
                    children: [{
                        id: ['WJOB_CONTAINERPLANJOB_CARJC:QUERY'],
                        label: '查询',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CARJC:JC'],
                        label: '进场',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CARJC:BACTH'],
                        label: '批量进场',
                    }, {
                        id: ['WJOB_CONTAINERPLANJOB_CARJC:CANCEL'],
                        label: '取消作业',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_NZCC'],
                    label: '内转出场',
                    children: [{
                        id: ['WJOB_CONTAINERPLANJOB_NZCC:QUERY'],
                        label: '查询',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_NZJC'],
                    label: '内转进场',
                    children: [{
                        id: ['WJOB_CONTAINERPLANJOB_NZJC:QUERY'],
                        label: '查询',
                    }]
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_CONTAINERTRACKING'],
                    label: '集装箱跟踪'
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_CONTAINERINPORTQUERY'],
                    label: '在港箱查询'
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_CXRECORDQUERY'],
                    label: '拆箱记录查询'
                }, {
                    id: ['WJOB_CONTAINERPLANJOB_ARRIVECONFIRMQUERY'],
                    label: '到达确报查询'
                }]
            }
        ]
    }
]

export const getID = () => {
    let a = []
    permissions.forEach(item => {
        a.push(item.id[0])
        if (item.children && item.children.length > 0) {
            item.children.forEach(childItem => {
                a.push(childItem.id[0])
                if (childItem.children && item.children.length > 0) {
                    childItem.children.forEach(childItem2 => {
                        a.push(childItem2.id[0])
                        if (childItem2.children && childItem2.children.length > 0) {
                            childItem2.children.forEach(element => {
                                a.push(element.id[0])
                            })
                        }
                    })
                }
            })
        }
    })
    return a
}
export const permissions2 = []
