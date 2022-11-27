<template>
<div id="app">

  <v-container
      class="py-8 px-6"
      fluid
  >
<!--    <el-input-->
<!--        v-model="input"-->
<!--        class="w-50 m-2"-->
<!--        size="large"-->
<!--        :placeholder="input"-->
<!--    />-->
<!--    <v-btn-->
<!--        class="ma-2"-->
<!--        outlined-->
<!--        color="indigo"-->
<!--        @click="changeRole(input)"-->
<!--    >-->
<!--      获取数据-->
<!--    </v-btn>-->
<!--    <v-card-title>-->
<!--      Test Data:${{role}}-->
<!--    </v-card-title>-->

    <el-input
        v-model="input"
        class="w-50 m-2"
        size="large"
        :placeholder="input"
    />
    <v-btn
        class="ma-2"
        outlined
        color="indigo"
        @click="JumpInto"
    >
      获取数据
    </v-btn>
    <v-card-title>
      Test Data:${{role}}
    </v-card-title>
  </v-container>



</div>
</template>

<script>

import {testSend} from '@/api/index'
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useRouter} from 'vue-router'

export default {
  name: "VueTest",
  data: () => ({
    input:"zerocamera@qq.com",
    userInfo:{
      id:"27469@qq.com"
    },
    result:""


  }),
  setup(){
    const store = useStore()
    const router = useRouter()

    let role = computed(() => store.state.user.role)

    function changeRole(data){
      store.commit("setRole",data)
      console.log(store.state.user.role)
    }

    function JumpInto(){
      console.log('dasdasdasd')
      router.push({path:'/teacher'})
    }

    return {
      role,
      changeRole,
      JumpInto
    }
  },
  methods:{
    async getData() {
      // this.$axios.get('/api/')
      // .then(
      //     (response)=>{
      //       console.log(response);
      //       this.data= response.data;
      //     })
      // .catch(
      //     (error)=>{
      //       console.log(error)
      //     })
      const r = await testSend({email: this.input})
      this.result = r
      console.log(r)
    }
  },
}
</script>

<style scoped>
body{
  padding-right: 0px !important;
  overflow: hidden;
}
</style>
