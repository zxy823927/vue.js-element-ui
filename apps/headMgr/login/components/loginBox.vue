<template>
  <el-dialog title="账号登录" v-model="showDialog" size="tiny" @close="cancelClick">

    <el-form :model="form"  :rules="rules" ref="form" style="position:relative">
      <el-form-item label="" :label-width="formLabelWidth"  prop="staffId">
        <login-input placeholder="请输入用户名" v-model="form.staffId" @keyup="login" class=""></login-input>
      </el-form-item>
      <el-form-item label="" :label-width="formLabelWidth"  prop="pwd">
        <login-input placeholder="请输入密码"  type="password" v-model="form.pwd" @keyup="login" class=""></login-input>
      </el-form-item>
      <div style="position:absolute;width:100%">
      <template v-if="error">
          <el-tag type="danger" style="width:100%">{{errorMsg}}</el-tag>
      </template>
    </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelClick">取 消</el-button>
      <el-button type="primary" @click="login('login')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

  import LoginInput from '../../login/components/input/src/input.vue';
  import Axios from "axios";
  import config from '../../login/config/loginConfig.js';
  import ajax from '../../../pub/utils/ajaxUtil';
  export default {
    components:{
        LoginInput
    },
    props:{
      dialogFormVisible: Boolean
    },
    created:function(){
      
    },
    data:function(){
      return {
        showDialog: this.dialogFormVisible,
        errorMsg: "",
        error: false,
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
        formLabelWidth: '0px'
      };
    },
    watch:{
        dialogFormVisible: {
              immediate: true,
              handler(v) {
                // debugger;
                this.showDialog = v;
              }
        }
    },
    methods:{
        login:function(key) {//登录————————————————————————————————-——————\
            var _this = this;
            //debugger;
            if(key.code!='Enter'&&key!='login'){
              return;
            }
            this.$refs["form"].validate((valid) => {

                if (valid) {
                    ajax.getJson(config.loginUrl, _this.form, function (res) {
                        sessionStorage.clear();
                        if (res.status == '200') {
                            var ctx = res.token;
                            sessionStorage.setItem("Token", ctx);
                            delete res.token;
                            _this.$emit("closeModel");
                        } else {
                            _this.errorMsg = res.message ? res.message : "连接登录服务器失败，请稍后重试";
                            _this.error = true;
                            setTimeout(function () {
                                _this.errorMsg = '';
                                _this.error = false;
                            }, 2000);
                        }
                    });
                }
            });
        },
        cancelClick:function(){
            this.$emit('closeModel',false);
        },
    }
  };
</script>