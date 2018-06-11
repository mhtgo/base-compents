
export function filterNum(val) {
    if(val){
        return val.replace(/(?=(?!\b)(?:\d{3})+(?!\d))/g,',')
    }else {
        return '--'
    }
}
