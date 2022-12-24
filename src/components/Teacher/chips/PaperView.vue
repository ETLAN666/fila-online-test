<template>
<div>
  <h2 class="background"><span>{{paperName}}</span></h2>
  <div v-show="!isTeacher">
    <vue-countdown :time="60 * 60 * 1000" v-slot="{ days, hours, minutes, seconds }">
      Time Remaining：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
    </vue-countdown>
  </div>


    <v-row>
      <v-tabs>
        <v-tab
            v-for="item in links"
            :key="item.name"
            :to="item.route"
        >
          {{item.name}}
        </v-tab>

      </v-tabs>
      <v-spacer></v-spacer>

<div v-show="!isTeacher" style="padding-right: 30px">
  <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="dialogVisible = true"
  >
    提交试卷
  </v-btn>
</div>

    </v-row>

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
  >
    <span>确认提交？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handPaperResult">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>


  <router-view></router-view>
</div>
</template>

<script>
import {useStore} from 'vuex'
import {onMounted, computed, toRaw} from 'vue'

export default {
  name: "PaperView",
  data:()=>({
    dialogVisible: false,
    links:[
      {
        name:"单选题",
        route:"/teacher/paperView/sin_q2",
      },
      {
        name:"多选题",
        route:"/teacher/paperView/multi_q2",
      },
      {
        name:"判断题",
        route:"/teacher/paperView/judge_q2",
      },
      {
        name:"填空题",
        route:"/teacher/paperView/fill_q2",
      },
      {
        name:"问答题",
        route:"/teacher/paperView/text_q2",
      },
    ],
  }),
  setup(){
    const store = useStore()
    let isTeacher = computed(() => store.state.user.isTeacher)
    let paperName = computed(() => store.state.user.paperName)

    let sin_q = computed(() => store.state.user.sin_selections)
    let multi_q = computed(() => store.state.user.multi_selections)
    let judge_q = computed(() => store.state.user.judge_questions)
    let fill_q = computed(() => store.state.user.fill_questions)
    let text_q = computed(() => store.state.user.text_questions)
    let email_num = computed(() => store.state.user.email)
    let show = computed(() => store.state.user.showData)

    onMounted(()=>{
      sin_q = computed(() => store.state.user.sin_selections)
      multi_q = computed(() => store.state.user.multi_selections)
      judge_q = computed(() => store.state.user.judge_questions)
      fill_q = computed(() => store.state.user.fill_questions)
      text_q = computed(() => store.state.user.text_questions)
      email_num = computed(() => store.state.user.email)
    })

     function postPaperResult(payload){
      store.dispatch("postNewResults", payload)
     }

    return {
      isTeacher,
      paperName,
      sin_q,
      multi_q,
      judge_q,
      fill_q,
      text_q,
      email_num,
      postPaperResult,
      show
    }
  },
  methods:{
    async handPaperResult(){
          let arr = []
          this.getResValues(arr, this.sin_q)
          this.getResValues(arr, this.multi_q)
          this.getResValues(arr, this.judge_q)
          this.getResValues(arr, this.fill_q)
          this.getResValues(arr, this.text_q)

          await this.postPaperResult(arr)

          this.dialogVisible = false
    },

    getResValues(array, questions){
      let tmp = toRaw(questions)
      console.log("tmp:",tmp)
      tmp.forEach((item, index, arr) => {
        let x = {}
        x['qid'] = item.id
        x['name'] = toRaw(this.paperName)
        x['email'] = toRaw(this.email_num)
        if (item.type === '单选题'){
          x['my_answer'] = item.radios
        }
        else if( item.type === '多选题'){
          x['my_answer'] = item.radios
        }
        else if( item.type === '判断题'){
          x['my_answer'] = item.radios
        }
        else if( item.type === '填空题'){
          x['my_answer'] = item.text
        }
        else if( item.type === '问答题'){
          x['my_answer'] = item.text
        }

        array.push(x)
        console.log(index)
        console.log(arr)
        console.log("item:",item)
      })
      console.log("array now:",array)
    }
  }
}
</script>

<style scoped>

h2 {
  font: 33px sans-serif;
  margin-top: 30px;
  text-align: center;
  text-transform: uppercase;
}
h2.background {
  position: relative;
  z-index: 1;
}
h2.background:before {
  border-top: 2px solid #dfdfdf;
  content: "";
  margin: 0 auto;
  /* this centers the line to the full width specified */
  position: absolute;
  /* positioning must be absolute here, and relative positioning must be applied to the parent */
  top: 50%;
  left: 0;
  right: 0;
  bottom: 0;
  width: 95%;
  z-index: -1;
}
h2.background span {
  /* to hide the lines from behind the text, you have to set the background color the same as the container */
  background: #fff;
  padding: 0 15px;
}

</style>
