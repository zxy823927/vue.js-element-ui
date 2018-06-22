<template>
  <div id="loginbox" >
    <div class="loginbg"></div>
    <div class="login">
     <!--  -->
      <div class="loginmid">
        <div class="giveme"></div>
        <ul class="userlogin" v-if="isLogin">
          <li class="logword">账号登录</li>
          <el-form :model="form" :rules="rules" ref="form" label-width="0px" style="width:80%">
            <el-form-item label-width="0px" prop="staffId">
              <login-input placeholder="请输入用户名" v-model="form.staffId" @keyup="login" class="" @focus="focusbtn"></login-input>
            </el-form-item>
            <el-form-item label-width="0px" prop="pwd">
              <login-input placeholder="请输入密码"  type="password" v-model="form.pwd" @keyup="login" class="" @focus="focusbtn"></login-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width:100%" type="primary" @click="login('login')" :loading="loginLoading">登录</el-button>
            </el-form-item>
            <template v-if="error">
              <div style="margin-bottom: 15px">
                <el-tag type="danger" style="width:100%">{{errorMsg}}</el-tag>
                <!-- <el-alert
                  :title="errorMsg"
                  type="error"
                  @close="errorMsg = ''; error = false"
                  show-icon>
                </el-alert> -->
              </div>
            </template>
          </el-form>
        </ul>
        <ul class="userlogin" v-if="!isLogin">
          <router-link to='/index/main'><li class="afterLogin">您已登录!点击进入首页！</li></router-link>
        </ul>
      </div>
      <div class="loginfoot"></div>
    </div>
  </div>
</template>

<script>
    //import Axios from "axios";
    import Axios from "axios";
    import httpService from "../../../pub/constants/httpService.js";
    // import config from '../config/loginConfig.js';
    import LoginInput from './input/src/input.vue'
    import ajax from '../../../pub/utils/ajaxUtil';
    import { showMessage } from '../../../pub/utils/promptUtil';
    export default{
        components:{
            LoginInput
        },
        data:function(){
            return{
                code: '',
                isLogin: true,
                rightpic: false,
                rightpw: false,
                codeSrc: "",
                phoneError: false,
                error: false,
                codeKey: "",
                staffId: '',
                pwd: '',
                form:{
                    staffId:'',
                    pwd:''
                },
                rules: {
                    staffId: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                    ]
                },
                errorMsg:'',
                loginLoading:false
            }
        },//data结束-----------------------------------
        beforeMount:function(){
            localStorage.removeItem("oprtarealist");
        },
        mounted:function(){//初始加载——————————————————————————————————————

        },
        methods:{
            enterLogin: function(event){
                console.log(event);
            },
            focusbtn:function () {
                this.loginLoading = false;
            },
            login:function(key) {//登录————————————————————————————————-——————\

                var _this = this;
                if(key.code!='Enter'&&key!='login'){
                  return;
                }
                this.$refs["form"].validate((valid) =>{
                    _this.loginLoading = true;
                    if (valid) {
                        ajax.getJson(httpService.loginUrl,_this.form,function (res) {
                            if(res.status== '200'){
                                var ctx = res.token;
                                sessionStorage.setItem("Token", ctx);
                                delete res.token;
                                _this.$router.push("index/main");
                                //刷新首页把登录请求刷掉
                                location.reload();
                            }else{
                                showMessage('提示', res.message, 'info');
                                _this.loginLoading = false;
                            }

                        })

                    }
                });
            }
        }//methods结束-----------------------------------
    }
</script>

<style lang="sass">
  @import "./../styles/login.scss";
  /*@import  '../../pub/styles/reset.css';*/
</style>
