<template>
  <div>
    <div style=" text-align: center;
      right: 10px;
      top: 60px;
      position:fixed;
      z-index:100;"
    >
      <v-btn
          v-show="isTeacher"
          large
          tile
          color="blue"
          @click="form.dialogFormVisible = true"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add
      </v-btn>

      <v-btn
          class="ma-2 white--text"
          @click="returnTop"
      >
        <v-icon
            left
            dark
        >
          mdi-arrow-up-circle-outline
        </v-icon>
        Return
      </v-btn>
    </div>
    <v-container
        class="py-8 px-6"
        fluid
    >

      <v-row>
        <v-col
            v-for="item in judge_questions"
            :key="item.id"
            cols="12"
        >
          <v-card
              class="mx-auto"
              max-width="600"
          >
            <v-card-title>判断题 第{{item.id}}题
              <div style="color: #54a0ff; display: inline">
                （1分）
              </div>

            </v-card-title>

            <v-card-subtitle>
              <div style="color: black; font-size: medium">
                {{item.description}}
              </div>

            </v-card-subtitle>

            <div v-if="item.img" style="padding-top: 10px">
              <v-img
                  height="200"
                  :src="item.img_url"
              >

              </v-img>
            </div>

            <v-card-text>
              <div>
                <v-radio-group>
                  <v-radio
                      label="错误"
                      color="red"
                      value={{item.selection[0]}}
                  ></v-radio>
                  <v-radio
                      label="正确"
                      color="success"
                      value={{item.selection[1]}}
                  ></v-radio>
                </v-radio-group>
              </div>

            </v-card-text>

            <v-expansion-panels >
              <v-expansion-panel elevation="0">
                <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                  显示答案
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                 {{item.answer}}
                </v-expansion-panel-text>
              </v-expansion-panel>

            </v-expansion-panels>

            <v-card-actions>
              <v-list-item class="w-100">

<!--                <v-list-item-title>Evan You</v-list-item-title>-->

<!--                <v-list-item-subtitle>Vue Creator</v-list-item-subtitle>-->

                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-icon class="mr-1" icon="mdi-star" :color =item.star @click="collectQuestion(item)"></v-icon>
                    <span class="subheading mr-2">收藏</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1" icon="mdi-text-box-edit-outline" @click="item.dialogFormVisible = true"></v-icon>
                    <span class="subheading mr-2">编辑</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1" icon="mdi-trash-can" @click="deleteQuestion(item.id)"></v-icon>
                    <span class="subheading">删除</span>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
          </v-card>
          <el-dialog v-model="item.dialogFormVisible" title="Modify">
            <el-form :model="item">
              <el-form-item label="问题描述" :label-width="formLabelWidth">
                <el-input v-model="item.description" autocomplete="off" />
              </el-form-item>

              <el-form-item label="参考答案" :label-width="formLabelWidth">
                <el-input v-model="item.answer" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                  <el-button @click="item.dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="item.dialogFormVisible = false">
                    Confirm
                  </el-button>
               </span>
            </template>
          </el-dialog>
        </v-col>
      </v-row>
      <el-dialog v-model="form.dialogFormVisible" title="Modify">
        <el-form :model="form">
          <el-form-item label="问题描述" :label-width="formLabelWidth">
            <el-input v-model="form.description" autocomplete="off" />
          </el-form-item>

          <el-form-item label="参考答案" :label-width="formLabelWidth">
            <el-input v-model="form.answer" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
               <span class="dialog-footer">
                  <el-button @click="form.dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="addQuestion">
                    Confirm
                  </el-button>
               </span>
        </template>
      </el-dialog>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "JudgeQuestions",
  data:()=>({
    formLabelWidth: '120px',
    isTeacher:true,
    collections:[],
    judge_questions:[
      {
        id:"1",
        description:"中共一大召开于1921年",
        selection:["正确","错误"],
        img:true,
        img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        answer:"正确",
        dialogFormVisible:false,
        star:"black"
      },
      {
        id:"2",
        description:"贞观之治时期的唐朝皇帝是唐太宗李世民",
        selection:["正确","错误"],
        img:true,
        img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        answer:"正确",
        dialogFormVisible:false,
        star:"black"
      }
    ],
    form:{
      id:"7",
      description:"贞观之治时期的唐朝皇帝是唐太宗李世民",
      selection:["正确","错误"],
      img:true,
      img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
      answer:"正确",
      dialogFormVisible:false,
      star:"black"
    }
  }),
  methods:{
    returnTop(){
      window.scrollTo(0,0);
    },
    addQuestion(){
      this.form.dialogFormVisible = false
      this.judge_questions.push(this.form)
    },
    collectQuestion(item){
      if (item.star==="black"){
        item.star = "yellow"
        this.collections.push(item)
        // console.log(this.collections.length)
      }
      else{
        item.star = "black"
        this.collections.forEach(function (element,index,array){
          if (element.id===item.id){
            array.splice(index,1);
          }
        })
        // console.log(this.collections.length)
      }

    },
    deleteQuestion(id){
      this.judge_questions.forEach(function (item,index,array){
        if (item.id===id){
          array.splice(index,1);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
