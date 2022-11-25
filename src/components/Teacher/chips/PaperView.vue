<template>
<div>
  <h2 class="background"><span>试卷1</span></h2>
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

<div style="padding-right: 30px">
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
        <el-button type="primary" @click="dialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>






  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: "PaperView",
  data:()=>({
    isTeacher:true,
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
  methods:{
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
