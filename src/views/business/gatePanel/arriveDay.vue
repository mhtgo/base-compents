<template>
    <div style="width: 491px">
        <div class="flex calendar-title">
            <a @click="setMonthNum(false)"><<</a>
            <div @click="getMonthDay">{{ setYear }}年{{ setMonth }}月</div>
            <a @click="setMonthNum(true)">>></a>
        </div>
        <ul class="weekdays">
            <li v-for="item in weekDay">{{ item }}</li>
        </ul>
        <ul class="days">
            <li v-for="(item,index) in info" :style="index%7===0?border:''"
                :class="item.day===today?'active':''"
                @click="handleCurrent(item)">
                <div class="flex">
                    <span>{{ item.days | day }} </span>
                    <div class="noJobNum">
                        <!--{{ item.noJobPlan }}-->
                    </div>
                </div>
                <div class="info-bg">{{ item.wagonNum | P }}</div>
                <div class="info-bg">{{ item.teu | teu }}</div>
            </li>
        </ul>

    </div>
</template>
<script>
    import { getLocalTime, mGetDate } from "@/utils/dateFormat";
    import { receive } from "@/api/gatePanel/gatePanel";

    export default {
        name: 'calendar',
        data() {
            return {
                nowTime: Date.parse(new Date()),
                now: new Date().toLocaleString().split(' ')[0].replace(/\//g, '-'),
                weekDay: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六',],
                setMonth: new Date().getMonth() + 1,
                setYear: new Date().getFullYear(),
                setDay: new Date().getDate(),
                today: getLocalTime(new Date(), 'YYYY-MM-DD'),
                setWeek: 0,
                info: [],
                calendarDay: [],
                dateType: 'day',
                border: 'border-left:1px solid #dddddd',
            }
        },
        mounted() {
            this.getMonthDay()
        },
        methods: {
            getMonthDay() {
                let toMonth = mGetDate(this.setYear, this.setMonth)
                let date = new Date(this.setYear, this.setMonth - 1, '1')

                this.setWeek = date.getDay()
                this.info = []
                for (let i = 0; i < toMonth; i++) {
                    this.info.push({
                        day: getLocalTime(this.setYear + '-' + this.setMonth + '-' + (i + 1), 'YYYY-MM-DD'),
                        days: i + 1,
                        noJobPlan: '',
                        teu: '',
                        wagonNum: '',
                    })
                }
                for (let i = 0; i < this.setWeek; i++) {
                    this.info.unshift({
                        day: '',
                        days: '',
                        noJobPlan: '',
                        teu: '',
                        wagonNum: '',
                    })
                }
                let params = {
                    search_EQ_dateType: 'day',
                    search_GTE_dateTime: getLocalTime(date, 'YYYY-MM-DD'),
                }
                receive(params).then(res => {
                    this.calendarDay = res.data.aaData
                    this.info.map((m, i) => {
                        this.calendarDay.map((f, index) => {
                            if (m.day === f.date) {
                                this.info[i].noJobPlan = f.noJobPlan
                                this.info[i].teu = f.teu
                                this.info[i].wagonNum = f.wagonNum
                            }
                        })
                    })
                })

            },
            setMonthNum(bool) {
                if (bool) {
                    if (this.setMonth < 12) {
                        this.setMonth = this.setMonth + 1
                    } else {
                        this.setYear = this.setYear + 1
                        this.setMonth = 1
                    }
                } else {
                    if (this.setMonth > 1) {
                        this.setMonth = this.setMonth - 1
                    } else {
                        this.setYear = this.setYear - 1
                        this.setMonth = 12
                    }
                }
                this.getMonthDay()
            },
            handleCurrent(item, bool) {
                console.log(item)
                if (item.wagonNum || item.teu) {
                    this.$emit('openArr', item)
                }
                // if(bool){
                //     this.$router.push(`/work/containerJob/workList?status=OPERATED&&date=${item.day}`)
                // }else {
                //     this.$router.push(`/work/JobTable?status=NOOPERATE&&date=${item.day}`)
                // }
            }
        },
        computed: {},
        filters: {
            day(val) {
                if (val !== '') {
                    return val + '日'
                }
            },
            P(val) {
                if (val !== '') {
                    return val + 'P'
                }
            },
            teu(val) {
                if (val !== '') {
                    return val + 'TEU'
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
        width: 70px;
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
        width: 70px;
        text-align: center;
        font-size: 12px;
        color: #777;
        float: left;
        border-right: 1px solid #dddddd;
        border-bottom: 1px solid #dddddd;
        height: 60px;
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
        font-size: 12px;
    }

    .noJobNum {
        cursor: pointer;
        background-color: red;
        color: #fff;
        width: 20px;
        border-radius: 7px;
    }
</style>
