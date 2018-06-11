export default function () {
    let pageArr = [10, 20, 50, 100, 500, 1000]// 分页数组
    return {
        pageStart: 1, // 起始页
        pageArr,
        iDisplayLength: pageArr[0] // 页长
    }
}
