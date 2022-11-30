<template>
<div>
  <div style="padding: 30px">
    <v-timeline align="start">
      <v-timeline-item
          v-for="(item, i) in items"
          :key="i"
          :dot-color="item.color"
          :icon="item.icon"
          fill-dot
      >
        <v-card>
          <v-card-title :class="['text-h6', `bg-${item.color}`]">
            {{item.title}}
          </v-card-title>
          <v-card-text class="notice">
            <div style="padding: 3px">
              <p>{{item.text}}</p>
            </div>

            <div v-if="item.isTrue" style="padding-top: 6px">
              <v-btn
                  :color="item.color"
                  variant="outlined"
                  :to="item.route"
              >
                前往题库
              </v-btn>
            </div>

            <div v-if="item.isPreview" style="padding-top: 6px">
              <v-btn
                  :color="item.color"
                  variant="outlined"
                  @click="paperViewer"
              >
                预览试卷
              </v-btn>
            </div>

            <div v-if="item.isAdd" style="padding-top: 6px">
              <v-btn
                  :color="item.color"
                  variant="outlined"
                  @click="form.dialogFormVisible = true"
              >
                信息添加
              </v-btn>
            </div>

            <div v-if="item.isConfirm" style="padding-top: 6px">
              <v-btn
                  :color="item.color"
                  variant="outlined"
                  @click="paperPublish(collections)"
              >
                确认发布
              </v-btn>
            </div>

          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>

    <el-dialog v-model="form.dialogFormVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="试卷标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试卷命题时间" :label-width="formLabelWidth">
          <el-input v-model="form.start" autocomplete="off" />
        </el-form-item>
        <el-form-item label="有效截止期" :label-width="formLabelWidth">
          <el-input v-model="form.ddl" autocomplete="off" />
        </el-form-item>
        <el-form-item label="限时" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试卷总分值" :label-width="formLabelWidth">
          <el-input v-model="form.score" autocomplete="off" />
        </el-form-item>
        <el-form-item label="试卷描述" :label-width="formLabelWidth">
          <el-input v-model="form.note" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
              <span class="dialog-footer">
                  <el-button @click="form.dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="addInfo">
                    Confirm
                  </el-button>
               </span>
      </template>
    </el-dialog>
  </div>

  <v-divider></v-divider>
  <div v-show="paperInfo">
    <h2 class="background"><span>{{form.title}}</span></h2>
  </div>
  <div v-show="preview">
    <div>
      <v-tabs>
        <v-tab
            v-for="item in links"
            :key="item.name"
            :to="item.route"
        >
          {{item.name}}
        </v-tab>

      </v-tabs>
    </div>
    <v-container
        class="py-8 px-6"
        fluid
    >
      <router-view></router-view>
    </v-container>
  </div>

</div>
</template>

<script>
import {useStore} from 'vuex'
import {computed, toRaw} from "vue";


export default {
  name: "PaperConstructor",
  data:()=>({
    preview:false,
    paperInfo:false,
    items: [
      {
        color: 'red-lighten-1',
        icon: 'mdi-star',
        title:"First Step",
        text:"点击下方按钮，跳转到题库中进行选题。（点击题目右下方的星号即可选中题目，添加到候选题列表）",
        isTrue:true,
        route:"/teacher/market/sin_q"
      },
      {
        color: 'purple-lighten-1',
        icon: 'mdi-book-variant',
        title:"Second Step",
        text:"返回到此页面，预览并核对选题(点击预览按钮，即可预览所有已选题目，若有需要再进行题目修改)",
        isPreview:true,
      },
      {
        color: 'blue-lighten-1',
        icon: 'mdi-airballoon',
        title:"Third Step",
        text:"添加试卷基本信息（标题，命题时间，有效截止期，总分值）",
        isAdd:true
      },
      {
        color: 'green-lighten-1',
        icon: 'mdi-check-bold',
        title:"Fourth Step",
        text:"确认选题，完成组卷，发布到试卷题库",
        isConfirm:true
      },
    ],
    formLabelWidth: '120px',
    form:{
      name:"综合卷",
      start:"2022-11-22",
      ddl:"2022-12-10",
      time:"60",
      score:"100",
      seq:[],
      note:"试题总分100分，重点考察本学期第5~8章的课本内容，限时一小时完成",
      dialogFormVisible:false,
    },
    links:[
      {
        name:"单选题",
        route:"/teacher/construct/sin_q1",
      },
      {
        name:"多选题",
        route:"/teacher/construct/multi_q1",
      },
      {
        name:"判断题",
        route:"/teacher/construct/judge_q1",
      },
      {
        name:"填空题",
        route:"/teacher/construct/fill_q1",
      },
      {
        name:"问答题",
        route:"/teacher/construct/text_q1",
      },
    ],
  }),
  setup(){
    const store = useStore()
    let collections = computed(() => store.state.user.collections)

    function initialViewData(){
      store.commit("set_from_collections")
    }

    function publishPaper(paper){
      store.dispatch("postNewPaper",paper)
    }


    return {
      collections,
      initialViewData,
      publishPaper
    }


  },
  methods:{
    addInfo(){
      this.paperInfo=true
      this.form.dialogFormVisible=false
    },
    paperViewer(){
      this.initialViewData()
      this.preview = this.preview !== true;
    },
    async paperPublish(questions){
      let tmp = toRaw(questions)
      console.log("tmp:",tmp)
      let seq = []
      tmp.forEach((item, index, arr) => {
        seq.push(item.id.toString())
        console.log(index)
        console.log(arr)
        console.log("item:",item)
      })
      // for (let key in tmp){
      //   console.log("key:",key)
      //   seq.push(key.id)
      // }
      this.form.seq = seq
      console.log("form:",this.form)
      await this.publishPaper(this.form)
      console.log("finish")
    }
  }
}
</script>



<style scoped>
.notice{
  font-family:"微软雅黑","黑体","宋体";
  font-size:18px;
}

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
