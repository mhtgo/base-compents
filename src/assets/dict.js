export const computedMapDict = function () {
    return {
        _dictCustomType: () => [...customType],
        _dictBankType: () => [...bankType],
        _dictCompanyNature: () => [...companyNature],
        _dictTrueOrFalse: () => [...trueOrFalse],
        _dictAllOrNone: () => [...allOrNone],
        _dictContractType: () => [...contractType],
        _dictContractAttribute: () => [...contractAttribute],
        _dictContractStatus: () => [...contractStatus],
        _dictUseOrUnused: () => [...useOrUnused],
        _dictBusinessModel: () => [...businessModel],
        _dictCostStandardType: () => [...costStandardType],
        _dictStandSettlementType: () => [...standSettlementType],
        _dictProjectType: () => [...projectType],
        _dictProjectStatus: () => [...projectStatus],
        _dictEnableType: () => [...enableType],
        _dictParamType: () => [...paramType],
        _dictPortAndStationType: () => [...portAndStationType],
        _dictEntrustType: () => [...entrustType],
        _dictValidType: () => [...validType],
        _dictTransportModeType: () => [...transportModeType],
        _dictPlanType: () => [...planType],
        _dictEntrustStatus: () => [...entrustStatus],
        _dictIfHeavyType: () => [...ifHeavyType],
        _dictTradeType: () => [...tradeType],
        _dictOrgStatusType: () => [...orgStatusType],
        _dictAccountType: () => [...accountType],
        _dictAccountStatus: () => [...accountStatus],
        _dictSexType: () => [...sexType],
        _dictDicType: () => [...dicType],
        _dictPlanStatus: () => [...planStatus],
        _dictPackingWay: () => [...packingWay],
        _dictSpecify: () => [...specify],
        _dictJobStatus: () => [...jobStatus],
        _dictContainerJobType: () => [...containerJobType],
        _dictExcelFieldTypes: () => [...excelFieldTypes],
        _dictPriorityType: () => [...priorityType],
        _dictOperatorType: () => [...operatorType],
        _dictAttrType: () => [...attrType],
    }
}

export const filtersMapDict = function () {
    return {
        _filterCustomType: (key) => customType.get(key),
        _filterBankType: (key) => bankType.get(key),
        _filterCompanyNature: (key) => companyNature.get(key),
        _filterTrueOrFalse: (key) => trueOrFalse.get(key),
        _filterAllOrNone: (key) => allOrNone.get(key),
        _filterContractType: (key) => contractType.get(key),
        _filterContractAttribute: (key) => contractAttribute.get(key),
        _filterContractStatus: (key) => contractStatus.get(key),
        _filterUseOrUnused: (key) => useOrUnused.get(key),
        _filterBusinessModel: (key) => businessModel.get(key),
        _filterCostStandardType: (key) => costStandardType.get(key),
        _filterStandSettlementType: (key) => standSettlementType.get(key),
        _filterProjectType: (key) => projectType.get(key),
        _filterProjectStatus: (key) => projectStatus.get(key),
        _filterEnableType: (key) => enableType.get(key),
        _filterParamType: (key) => paramType.get(key),
        _filterPortAndStationType: (key) => portAndStationType.get(key),
        _filterEntrustType: (key) => entrustType.get(key),
        _filterValidType: (key) => validType.get(key),
        _filterTransportModeType: (key) => transportModeType.get(key),
        _filterPlanType: (key) => planType.get(key),
        _filterEntrustStatus: (key) => entrustStatus.get(key),
        _filterIfHeavyType: (key) => ifHeavyType.get(key),
        _filterTradeType: (key) => tradeType.get(key),
        _filterOrgStatusType: (key) => orgStatusType.get(key),
        _filterAccountType: (key) => accountType.get(key),
        _filterAccountStatus: (key) => accountStatus.get(key),
        _filterSexType: (key) => sexType.get(key),
        _filterDicType: (key) => dicType.get(key),
        _filterPlanStatus: (key) => planStatus.get(key),
        _filterExcelFieldTypes: (key) => excelFieldTypes.get(key),
        _filterPackingWay: (key) => packingWay.get(key),
        _filterSpecify: (key) => specify.get(key),
        _filterJobStatus: (key) => jobStatus.get(key),
        _filterContainerJobType: (key) => containerJobType.get(key),
        _filterOperatorType: (key) => operatorType.get(key),
        _filterAttrType: (key) => attrType.get(key),
    }
}


/** ==========基础========= */
// 客户类型
export const customType = new Map([
    ['NORMAL', '合同客户'],
    ['TEMP', '临时客户'],
])
// 银行账户类型
export const bankType = new Map([
    ['B', '基本账户'],
    ['G', '一般账户'],
])
// 企业性质
export const companyNature = new Map([
    ['GYQY', '国有企业'],
    ['COMPANY_SS', '上市企业'],
    ['COMPANY_MY', '民营企业'],
    ['COMPANY_HZ', '合资企业'],
    ['COMPANY_QT', '其他企业']
])
// 是或否
export const trueOrFalse = new Map([
    [true, '是'],
    [false, '否']
])
// 有或无
export const allOrNone = new Map([
    [true, '有'],
    [false, '无']
])
// 合同类型
export const contractType = new Map([
    ['I', '收入合同'],
    ['O', '成本合同']
])
// 合同属性
export const contractAttribute = new Map([
    ['TSHT', '正式合同'],
    ['LSHT', '临时合同']
])
// 合同状态
export const contractStatus = new Map([
    // ['A','审批中'],
    ['C', '已生效'],
    ['D', '起草'],
    ['R', '退回'],
    ['S', '待签订'],
    ['V', '已作废'],
])
// 合同使用状态
export const useOrUnused = new Map([
    [true, '已使用'],
    [false, '未使用']
])
// 业务模式
export const businessModel = new Map([
    // ['XHQHFK', '先货权后付款'],
    // ['DXCG', '定向采购'],
    // ['JBXS', '集并销售'],
    // ['HDFK', '货到付款'],
    // ['QCWL', '全程物流'],
    // ['DZZY', '吊装作业'],
    ['JZX', '集装箱业务'],
    ['JSH', '件散货业务']
])
// 结算标准??费用标准
export const costStandardType = new Map([
    ['BSTD', '基本标准'],
    ['CSTD', '合同标准'],
    // ['PSTD','项目标准'],
])
export const standSettlementType = new Map([
    ['B', '基本标准'],
    ['P', '项目标准'],
])
// 项目类型
export const projectType = new Map([
    ['NORMAL', '正式项目'],
    ['TEMP', '临时项目']
])
// 项目状态
export const projectStatus = new Map([
    ['D', '起草'],
    ['A', '审批中'],
    ['R', '退回'],
    ['Z', '已作废'],
    ['S', '已立项'],
    ['C', '执行中'],
    ['O', '已结束'],
    ['F', '已冻结'],
])

// 已启用或未启用
export const enableType = new Map([
    [true, '已启用'],
    [false, '未启用']
])

// 系统参数类型
export const paramType = new Map([
    ['B', '业务级'],
    ['S', '系统级'],
])

// 港口和站点
export const portAndStationType = new Map([
    ['P', '港口'],
    ['S', '站点'],
])

// 委托类型名称
export const entrustType = new Map([
    ['JCRK', '进场入库'],
    ['THCK', '提货出库'],
    ['CXWT', '拆箱委托'],
    ['BCWT', '补充进场入库'],
])

// 委托类型名称
export const packingWay = new Map([
    ['C', '集装箱'],
    ['B', '散货'],
    ['P', '件货']
])

// 委托状态
export const entrustStatus = new Map([
    ['NOACCEPT', '未受理'],
    ['ACCEPTED', '已受理'],
    ['VOID', '已作废'],
    ['OPERATE', '作业中'],
    ['FINISHED', '已完结'],
])
// 作业状态
export const jobStatus = new Map([
    ['NOOPERATE', '未作业'],
    ['OPERATING', '作业中'],
    ['OPERATED', '已作业'],
    ['CANCELLED', '已取消'],
])

// 是否空重
export const ifHeavyType = new Map([
    ['E', '空'],
    ['F', '重'],
])

// 内外贸
export const tradeType = new Map([
    ['I', '内贸'],
    ['O', '外贸'],
])

// 是否有效
export const validType = new Map([
    [true, '有效'],
    [false, '无效'],
])

// 运输方式
export const transportModeType = new Map([
    ['TR', '火车'],
    ['CR', '汽车'],
    // ['SHIP','船舶'],
])

// 出库方式
export const specify = new Map([
    [true, '指定箱'],
    [false, '大堆箱']
])

// 计划类型
export const planType = new Map([
    ['JCJH', '进场计划'],
    ['CCJH', '出场计划'],
    ['CXJH', '拆箱计划'],
    ['ZXJH', '装箱计划'],
    ['NZRC', '内转入场计划'],
    ['NZCC', '内转出场计划'],
    ['ZCJH', '装车计划'],
    ['XCJH', '卸车计划'],
    ['ZSJH', '装船计划'],
    ['XSJH', '卸船计划'],
    ['JGJH', '加工计划'],
    ['TXJH', '提箱计划'],
])

// 单位主体
export const orgStatusType = new Map([
    [true, '已启用'],
    [false, '已注销'],
])

export const accountType = new Map([
    ['M', '主账号'],
    ['S', '子账号'],
])

export const accountStatus = new Map([
    [true, '正常'],
    [false, '注销'],
])

export const sexType = new Map([
    ['MAN', '女'],
    ['WOMAN', '男'],
])

export const dicType = new Map([
    ['A', '数组'],
    ['D', '数据'],
])
// 计划作业状态
export const planStatus = new Map([
    ['NOOPERATE', '未作业'],
    ['OPERATE', '作业中'],
    ['COMPLETED', '已完成'],
    ['VOIDS', '已作废']
])
// 集装箱作业状态
export const containerJobType = new Map([
    ['IN_PORT', '进港'],
    ['OUT_PORT', '出港'],
    ['IN_TRANSFER', '内转入场'],
    ['OUT_TRANSFER', '内转出场'],
    ['IN_YARD', '进场'],
    ['OUT_YARD', '出场'],
    ['ZX', '装箱'],
    ['CX', '拆箱'],
])
// excel字段校验类型
export const excelFieldTypes = new Map([
    ['String', '字符串'],
    ['Int', '整数'],
    ['Float', '小数'],
    ['Enum', '枚举'],
    ['Date', '日期']
])

// 优先级
export const priorityType=new Map([
  ['1','1'],
  ['2','2'],
  ['3','3'],
  ['4','4'],
  ['5','5'],
  ['6','6'],
  ['7','7'],
  ['8','8'],
  ['9','9'],
])
// 操作符
export const operatorType=new Map([
    ['EQ','等于'],
    ['NE','不等于'],
    ['CONTAIN','包含'],
    ['NOTCONTAIN','不包含'],
])
// 因素枚举
export const attrType=new Map([
    ['transportMode','运输方式'],
    ['cargoName','货名'],
    ['containerOwner','箱主单位'],
    ['entrustFrom','委托来源'],
    ['entrustOrgId','委托单位'],
])
// 是否在港
export const portStatusType=new Map([
    [true,'在港'],
    [false,'不在港'],
])
