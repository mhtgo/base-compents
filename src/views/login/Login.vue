<template>
    <div class="login-cont">
        <div class="nav wrapper">
            <a href="javascript:" class="logo"></a>
        </div>
        <div class="full-bg">
            <div class="wrapper" id="setPad">
                <div style="width: 500px;height: 450px">
                    <img :src="img" alt="" style="width: 100%;height: 100%;">
                </div>
                <!--<div class="img"></div>-->
                <div class="form">
                    <div class="tit">登录认证</div>
                    <div class="line">
                        <div class="icon">
                            <img src="../../assets/img/i-user.png" height="18" width="20" alt="">
                        </div>
                        <input type="text" placeholder="请输入你的账号" v-model="loginForm.userName">
                    </div>
                    <div class="line">
                        <div class="icon">
                            <img src="../../assets/img/i-pwd.png" height="23" width="19" alt="">
                        </div>
                        <input type="password" placeholder="请输入你的密码" v-model="loginForm.password">
                    </div>
                    <div class="other">
                        <div class="rembe" :class="{'active': loginForm.remember}" @click="loginForm.remember = !loginForm.remember">
                            <i class="icon"></i>记住账号
                        </div>
                        <!--<a href="javascript:" class="forget">忘记密码？</a>-->
                    </div>
                    <a href="javascript:" id="btn" class="submit" @click="submitForm">登录</a>
                </div>
            </div>
        </div>
        <div class="footer wrapper">
            <div class="company">
                <div class="info">
                    <span class="name">重庆市万州港口（集团）有限责任公司</span>
                    <span class="other">地址：重庆市万州区鞍子坝客运港区</span>
                    <span class="other">联系电话：023-58295315</span>
                </div>
                <!--<p class="copy-right">-->
                <!--Copyright © 2009-2014bykj.com 重庆久久物流有限责任公司(14555822.bykj.com) 版权所有-->
                <!--</p>-->
            </div>
        </div>
    </div>
    <!-- <el-form class="center" :rules="rules" ref="form" :model="form" label-width="80px"
               @keyup.enter.native="submitForm('Form')">
          <h3 class="title">后台管理系统</h3>
          <el-form-item class="ml" prop="userName">
              <el-input v-model="form.userName" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item class="ml" prop="pwd">
              <el-input v-model="form.pwd" type="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item class="ml">
              <el-checkbox v-model="checked">记住密码</el-checkbox>
          </el-form-item>
          <el-form-item class="ml">
              <el-button :loading="loginLoading" class="btn" type="primary" @click="submitForm(form)">登录</el-button>
          </el-form-item>
      </el-form> -->
</template>

<script>
    import {
        login,
        getAgain
    } from '@/api/auth/auth'
    import {
        getPersonName
    } from '@/api/system/person'
    import {
        setCookie,
        Token
    } from '@/utils/cookie'

    export default {
        name: "Login",
        data() {
            return {
                img: require('../../assets/img/bg-other.png'),
                checked: '',
                loginForm: {
                    userName: 'admin',
                    password: '123456',
                    remember: true
                },
                admin: {
                    userName: '',
                    password: ''
                },
                orgId: '',
                adminLogin: false,
                handle: (e) => {
                    if (e.keyCode === 13) {
                        this.submitForm()
                    }
                }
            }
        },
        mounted() {
            let admin = this.$route.query.login
            if (admin === 'admin') {
                this.adminLogin = true
            }
            let acc = localStorage.getItem('loginForm')
            if (acc) {
                this.loginForm.userName = acc
            }
            document.addEventListener('keyup', this.handle)
        },
        destroyed() {
            document.removeEventListener('keyup', this.handle)
        },
        methods: {
            submitForm() {
                if (this.loginForm.userName === '') {
                    this.$message({
                        message: '请输入账户名',
                        type: 'warning'
                    })
                    return
                } else if (this.loginForm.password === '') {
                    this.$message({
                        message: '请输入您的密码',
                        type: 'warning'
                    })
                    return
                } else {
                    login(this.loginForm).then(res => {
                        let data = JSON.parse(res.data)
                        setCookie(Token, data.token)
                        getAgain().then(res => {
                            this.$store.commit('SET_CURRENT_USER', res.data)
                            this.$router.push('/first')
                        })
                    })
                }
            }
        }
    }

</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .center {
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .title {
        margin: 0 auto 40px;
        text-align: center;
        color: #505458;
    }

    .btn {
        width: 100%;
        margin: 0 auto;
    }

    .ml {
        margin-left: -80px;
    }

    .wrapper {
        width: 900px;
        margin: 0px auto;
    }

    .login-cont {
        width: 100%;
        height: 100%;
        background: #fff;
        * {
            box-sizing: border-box;
        }
        .nav {
            padding: 15px 0;
            .logo {
                width: 620px;
                height: 92px;
                display: inline-block;
                background: url(../../assets/img/company.png) no-repeat;
            }
        }
        .full-bg {
            width: 100%;
            height: 640px;
            background: url(../../assets/img/bg.jpg) no-repeat;
            background-size: cover;
            text-align: center;
            .wrapper {
                display: flex;
                justify-content: space-between;
                padding: 0 75px 0 25px;
                align-items: center;
                width: 1100px;
                height: 640px;
            }
            .form {
                width: 350px;
                height: 360px;
                background: #6f86ee;
                border-radius: 10px;
                padding: 30px;
                margin-top: 110px;
                .tit {
                    font-size: 24px;
                    color: #fff;
                    margin-bottom: 25px;
                }
                .line {
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    .icon {
                        width: 20px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                    }
                    input {
                        border: none;
                        flex: 1;
                        height: 40px;
                        line-height: 40px;
                        border-bottom: 1px solid #99a1f3;
                        padding-left: 15px;
                        color: #fff;
                        background: transparent;
                        margin-left: 5px;
                        font-size: 14px;
                    }
                    ::-webkit-input-placeholder {
                        color: #fff;
                        font-size: 16px;
                    }
                }
                .other {
                    padding: 15px 0 30px 0;
                    display: flex;
                    justify-content: space-between;
                }
                .rembe {
                    color: #fff;
                    line-height: 20px;
                    font-size: 14px;
                    cursor: pointer;
                    &.active {
                        .icon {
                            background: url(../../assets/img/remember.png) no-repeat;
                        }
                    }
                    .icon {
                        width: 20px;
                        height: 20px;
                        display: inline-block;
                        border: 1px solid #fff;
                        float: left;
                        border-radius: 2px;
                        margin-right: 11px;
                    }
                }
                .forget {
                    color: #fff;
                    text-decoration: underline;
                    font-style: italic;
                    font-size: 14px;
                }
                .submit {
                    height: 45px;
                    line-height: 45px;
                    background: #314ebf;
                    display: block;
                    color: #fff;
                    border-radius: 25px;
                    text-align: center;
                    font-size: 20px;
                    transition: background .3s;
                    &:hover {
                        background: #2a46b2;
                    }
                }
            }
            .img {
                width: 632px;
                height: 538px;
                background: url(../../assets/img/bg-other.png) no-repeat;
            }
        }
        .footer {
            padding: 60px 0 120px 0;
            .company {
                padding: 20px 0;
                border-top: 1px solid #dcdcdc;
                border-bottom: 1px solid #dcdcdc;
            }
            .info {
                display: flex;
                align-items: center;
                margin-bottom: 10px;
                span {
                    margin-right: 35px;
                }
                .name {
                    font-size: 18px;
                    color: #444;
                }
                .other {
                    color: #888;
                    font-size: 14px;
                }
            }
            .copy-right {
                margin: 0;
                color: #888;
                font-size: 14px;
            }
        }
    }

</style>
