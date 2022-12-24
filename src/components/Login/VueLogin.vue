<template>
  <div class="container">
    <div class="content">

      <div class="login-container animated fadeInDown" style="animation-delay:.3s;">
        <!--   Login   -->
        <div class="login justify-content-center" id="login-form">
          <h1 class="form-title"><i class="fas fa-user" style="color:#55a0ff;"></i> <br> LOGIN  <hr></h1>

          <div class="form-container animated fadeIn" style="animation-delay:.7s;">
<!--            <form method="POST" action="{{ route('login') }}">-->
            <form action="">

              <label for="logEmail"><i class="fas fa-at"></i> 邮箱账号 </label>
              <input id="logEmail" type="email" name="email" v-model="logForm.email" placeholder="E-mail">

              <label for="logPassword"><i class="fab fa-slack-hash"></i> 密码 </label>
              <input id="logPassword" type="password" name="password" v-model="logForm.password" placeholder="Password">

              <div class="submit-buttons">
                <input type="button" value="登录" @click="logConfirm(logForm)">
                <input type="button" value="注册" class="btn-register">
              </div>

            </form>
          </div>
        </div>
        <!--   Login   -->

        <!--    Register    -->

        <div class="register justify-content-cente animatedr"  style="animation-delay:.3s">
          <h1 class="form-title "><i class="fas fa-user-plus" style="color:#57efc4;"></i> <br> REGISTER <hr></h1>

          <div class="form-container animated fadeIn" style="animation-delay:.7s;">
<!--            <form method="POST" action="{{ route('register') }}">-->
            <form action="">


              <label for="regName"><i class="fab fa-amilia"></i> 用户名 </label>
              <input id="regName" type="text" name="name" v-model="regForm.userName" placeholder="Name" required autofocus>

              <label for="regEmail"><i class="fas fa-at"></i> 邮箱账号 </label>
              <input id="regEmail" type="email" name="email" v-model="regForm.email" placeholder="E-mail">

              <label for="regPassword"><i class="fab fa-slack-hash"></i> 密码 </label>
              <input id="regPassword" type="password" name="password" v-model="regForm.password" placeholder="Password">

              <label for="confPassword"><i class="fab fa-slack-hash"></i> 确认密码 </label>
              <input id="confPassword" type="password" name="password_confirmation" v-model="regForm.confirm_password"  placeholder="Password">


              <div style="padding-bottom: 16px">
                <label for="QR"><i class="fab fa-slack-hash"></i> 填写验证码 </label>
                <el-input id="QR" v-model="regForm.code" placeholder="Please input the verification code ">
                  <template #append>
                    <el-button @click="getCountdown" :disabled="totalTime <60">{{content}}</el-button>
<!--                    <v-icon @click="sendQR">mdi-email-arrow-left-outline</v-icon>-->
<!--                    <v-icon icon="md:home"></v-icon>-->
                  </template>

                  <v-icon icon="md:home"></v-icon>
                </el-input>
              </div>


              <div class="submit-buttons">
                <input type="button" id="regButton" value="注册" @click="regConfirm" style="background:#55efc4;">
                <input type="button" value="登录"  class="btn-login">
              </div>



            </form>
          </div>
        </div>

        <!--    Register    -->

        <div class="login animated fadeIn" style="animation-delay:.7s;animation-duration:4s;" id="login-bg"></div>

      </div>

    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { ElMessage } from 'element-plus'
import { registerCode, registerConfirm} from '@/api/index'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {computed} from 'vue';


export default {
  name: "VueLogin",
  data:()=>({
      isQR:false,
      totalTime: 60,
      content: "发送验证码",
      code:"",
      regForm:{
        userName:"",
        email:"",
        password:"",
        confirm_password:"",
        code:""
      },
      logForm:{
        email:"",
        password:"",
      }
  }),
  setup(){
    const store = useStore()
    const router = useRouter()
    let role = computed(function () {
      return store.state.user.role

    });

    function InitialSettings(data){
      return store.dispatch("initialState",data)
    }

    function JumpInto(){
      if (store.state.user.role === ''){
        ElMessage({
          message: '用户不存在或密码错误',
          type: 'error',
        })
      }
      else{
        router.push({path:'/teacher'})
      }
    }



    return {
      role,
      InitialSettings,
      JumpInto
    }
  },
  methods:{
     async logConfirm(data){
       console.log('start')
       await this.InitialSettings(data)
       console.log('end')
       setTimeout(()=>{
         this.JumpInto()
       },1000)
    },
    async getCountdown() {
      const result = await registerCode({email: this.regForm.email})
      console.log(result)
      ElMessage({
        message: '验证码已发送到您的邮箱，请注意查收',
        type: 'success',
      })
      let clock =  window.setInterval(() => {
        this.content = this. totalTime + 's后重新发送';
        this.totalTime --;
        if(this. totalTime < 0){
          this. totalTime = 60;
          this.content = "重新发送验证码";
          window.clearInterval(clock);
        }
      }, 1000);
    },

    async sendQR() {
      const result = await registerCode({email: this.regForm.email})
      console.log(result)
      ElMessage({
        message: '验证码已发送到您的邮箱，请注意查收',
        type: 'success',
      })
    },

    async regConfirm(){

      if (this.regForm.password === this.regForm.confirm_password) {
        const result = await registerConfirm({form:this.regForm})
        console.log(result)
        ElMessage({
          message: '注册成功',
          type: 'success',
        })
      }
      else{
        ElMessage.error('确认密码不一致')
      }
    },
  }
}

$(document).ready(function(){

  $('.btn-register').click(function(){

    setTimeout(function(){
      $('#login-form').removeClass('fadeIn');
      $('.register').removeClass(' zoomOut');
      $('#login-form').css('animation-delay','0');
      $('.register').css(' animation-delay','0');

    },10)

    $('#login-form').addClass('animated zoomOut');
    $('#login-form').css('display','none');
    $('.register').addClass('animated fadeIn');
    $('.register').css('display','block');
    $('.login-container').css('height','95vh');
  })

  $('.btn-login').click(function(){
    setTimeout(function(){
      $('.register').removeClass('fadeIn');
      $('#login-form').removeClass(' zoomOut');
    },10)


    $('.register').addClass('animated zoomOut');
    $('.register').css('display','none');
    $('#login-form').addClass('animated fadeIn');
    $('#login-form').css('display','block');
    $('.login-container').css('height','70vh');
  })



})
</script>

<style scoped>
body{
  background:#f8fafc;
}

.content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-container{
  background: white;
  position: relative;
  border-radius: 5px;
  display: flex;
  width: 70vw;
  height: 70vh;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.07);
  transition: .4s;
}


.login{
  transition: .4s;
  font-family: Comfortaa;
}

.login#login-form{
  width: 50%;
  display: block;
  padding: 15px;
  align-items: center;
  text-align: center;
  position: relative;
  margin-top: 20px;
}

.login#login-bg{
  width: 50%;
  display: inline-flex;
  background: url(https://picsum.photos/700);
  background-size: cover;
  background-position: center center;
  float: right;
  border-radius: 0 5px 5px 0;
}

.register{
  width: 50%;
  display: block;
  padding: 15px;
  align-items: center;
  text-align: center;
  position: relative;
  margin-top: 30px;
  transition: .4s;
  font-family: Comfortaa;
  display: none;
}


.form-title{
  position: absolute;
  top: 11%;
  left: 0;
  right: 0;
  text-align: center;
  color: #dedede;
  font-size: 2.2em;
  font-family: Spartan;
  line-height: 1.4;
  margin-top: -24px;
}

.form-title hr{
  width: 75%;
  border: 2px solid #dedede1f;
  border-radius: 10px;
  margin-top: 20px;
}

.register .form-title{
  margin-top: -54px;
}


.form-container{
  padding: 25px 10px;
  border-radius: 5px;
  width: 80%;
  text-align: left;
  margin-top: 70px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


label{
  font-size: .7em;
  color: #7392ff;
  margin: 0px 0 !important;
  margin-left: 4px !important;
}

input{
  background: #f8fafc ;
  border: 0;
  width: 100%;
  display: block;
  padding: 10px 15px;
  border-radius: 5px;
  margin-bottom: 20px !important;
  outline: 0;
  transition: .4s;
}

input::placeholder{
  opacity: .4;
}

.submit-buttons{
  display: flex;
}

.submit-buttons input{
  width: 50%;
  text-align: center;
  color: white;
  transition: .2s;
}

.submit-buttons input:hover{
  opacity: .7;
}

.submit-buttons input:nth-of-type(1){
  border-radius: 5px 0 0 5px;
  background: #54a0ff;
}

.submit-buttons input:nth-of-type(2){
  border-radius: 0 5px 5px 0;
  background: #c8d6e5;
}

@media (max-width:933px){
  .login#login-bg{
    width: 0;
  }

  .login#login-form,.register{
    width: 100%;
  }

  input{
    width: 100%;
  }
}
</style>
