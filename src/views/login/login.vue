<template>
	<div class="login-wrap">
        <div class="main-wrap">
            <div class="bg1"></div>
            <div class="right-wrap">
                <p class="title">辅掌柜平台管理</p>
                <div class="login-item">
                    <input type="text" v-model.trim="ruleForm.phone" placeholder="请输入手机号码" class="inp">
                    <span class="user"></span>
                </div>
                 <div class="login-item">
                    <input type="password" v-model.trim="ruleForm.password" placeholder="请输入密码" class="inp">
                     <span class="psd"></span>
                </div>
                 <div class="login-item">
                   <input type="button"  class="inp btn" value="登录" @click="onLogin">
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import {login} from '@/request/apis/login'
export default {
	props: {},
	data() {
		return {
            ruleForm:{},
            isRememberPsd:false,
        }
    },
    methods:{
        onValidate(){
            if(!this.ruleForm.phone){
                this.$message.error('请输入手机号码')
                return false
            }
            if(!this.ruleForm.password){
                this.$message.error('请输入密码')
                return false
            }
            return true
        },
        onLogin(){
            if(this.onValidate()){
                login(this.ruleForm).then(res => {
                    
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
    @import url('login.less');
</style>
