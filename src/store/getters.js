const getters = {
    currentUser: state => state.user.currentUser,
    projectApprovalId: state => state.project.id,
    projectApprovalStep: state => state.project.step,
    current: state => state.project.current,
    projectApprovalMaxStep: state => state.project.maxStep, // 目前最大执行步骤
    projectApprovalSteps: state => state.project.steps, // 定向采购步骤
    // 全局新增编辑loading
    loadingBtn: state => state.loading.status
}
export default getters
