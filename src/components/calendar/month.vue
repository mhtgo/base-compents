<template>
    <div style="width: 493px">
        <div class="flex calendar-title">
            <a @click="setMonthNum(false)"><<</a>
            <div @click="getMonthDay">{{ setYear }}年</div>
            <a @click="setMonthNum(true)">>></a>
        </div>
        <ul class="days">
            <li v-for="(item,index) in info" :style="index%6===0?border:''" :class="item.months===setMonth&&getYear===setYear?'active':''">
                <div class="flex">
                    <a @click="handleMonth(item)">{{ item.months | month }} </a>
                    <div class="noJobNum" @click="handleCurrent(item,false)">{{ item.noJobNum }}</div>
                </div>
                <div @click="handleCurrent(item,true)" class="info-bg">{{ item.jobNum }}</div>
            </li>
        </ul>
    </div>
</template>
<script>
    import { calendar } from "@/api/containerJob/containerJob";
    import { getLocalTime } from "@/utils/dateFormat";

    export default {
        name: 'calendar',
        data() {
            return {
                setMonth: new Date().getMonth() + 1,
                setYear: new Date().getFullYear(),
                setDay: new Date().getDate(),
                getYear:new Date().getFullYear(),
                info: [],
                calendarDay: [],
                dateType: 'month',
                border: 'border-left:1px solid #dddddd',
            }
        },
        mounted() {
            this.getMonthDay()
        },
        methods: {
            getMonthDay() {
                let toMonth = 12
                let date = new Date(this.setYear, this.setMonth - 1, '1')
                this.info = []
                for (let i = 0; i < toMonth; i++) {
                    this.info.push({
                        months: i + 1,
                        month: '',
                        jobNum: '',
                        noJobNum: '',
                        totalJobNum: '',
                    })
                }

                let params = {
                    search_EQ_dateType: this.dateType,
                    search_GTE_dateTime: getLocalTime(date, 'YYYY-MM-DD'),
                }
                calendar(params).then(res => {
                    this.calendarDay = res.data.aaData
                    this.info.map((m, i) => {
                        this.calendarDay.map((f, index) => {
                            if (m.months === Number(f.date.split('-')[1])) {
                                this.info[i].month = f.date
                                this.info[i].jobNum = f.jobNum
                                this.info[i].noJobNum = f.noJobNum
                                this.info[i].totalJobNum = f.totalJobNum
                            }
                        })
                    })
                })

            },
            setMonthNum(bool) {
                if (bool) {
                    this.setYear = this.setYear + 1
                } else {
                    this.setYear = this.setYear - 1
                }
                this.getMonthDay()
            },
            handleCurrent(item, bool) {
                console.log(item)
                if (bool) {
                    this.$router.push(`/work/containerJob/workList?status=OPERATED&&date=${item.month}&&dateType=month`)
                } else {
                    this.$router.push(`/work/JobTable?status=NOOPERATE&&date=${item.month}&&dateType=month`)
                }
            },
            handleMonth(item){
                if(item.month){
                    this.$emit('handleMonth',item)
                }
            }
        },
        computed: {},
        filters: {
            month(val) {
                if (val !== '') {
                    return val + '月'
                }
            }
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .flex {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .calendar-title {
        height: 45px;
        padding: 0 20px;
        background-color: #ecf0fc;
    }

    .flexCenter {
        display: flex;
        align-items: center;
    }

    * {
        box-sizing: border-box;
    }

    ul {
        list-style-type: none;
    }

    body {
        font-family: Verdana, sans-serif;
    }

    .month ul {
        margin: 0;
        padding: 0;
    }

    .month ul li {
        color: white;
        font-size: 20px;
        text-transform: uppercase;
        letter-spacing: 3px;
    }

    .weekdays {
        margin: 0;
        border-top: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
    }

    .weekdays li {
        display: inline-block;
        width: 82px;
        color: #666;
        text-align: center;
        border-right: 1px solid #dddddd;
        height: 35px;
        line-height: 35px;
        /*border-bottom:1px solid #eee ;*/
    }

    .days {
        margin: 0;
        border-top: 1px solid #dddddd;
        border-left: 1px solid #dddddd;
    }

    .days li {
        list-style-type: none;
        display: inline-block;
        width: 82px;
        text-align: center;
        font-size: 12px;
        color: #777;
        float: left;
        border-right: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        height: 50px;
        padding: 0 5px;
    }

    .days li {
        padding: 5px;
    }

    .active {
        background: #4e75ea;
        color: #ffffff !important;

    }

    .active .info-bg {
        color: #ffffff !important;
    }

    .lteDay {
        background-color: #f9f9f9;
    }

    .info-bg {
        cursor: pointer;
        color: red;
        font-size: 18px;
    }

    .noJobNum {
        cursor: pointer;
        background-color: red;
        color: #fff;
        width: 20px;
        border-radius: 7px;
    }
</style>
