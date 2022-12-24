<template>
<div v-show="show">

  <div style=" text-align: center;
      right: 10px;
      top: 60px;
      position:fixed;
      z-index:100;"
  >

     <v-btn
         v-show="isTeacher&&!isPaperView"
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
          v-for="(item, index) in sin_selections"
          :key="item.id"
          cols="12"
      >
        <v-card
            class="mx-auto"
            max-width="600"
        >
          <v-card-title>单选题 第{{index+1}}题
            <div style="color: #54a0ff; display: inline">
              （2分）
            </div>

          </v-card-title>

          <v-card-text>
            <div style="color: black; font-size: medium">
              {{item.description}}
            </div>
          </v-card-text>

          <div v-if="item.img" style="padding-top: 10px">
            <v-img
                height="200"
                :src="item.img_url"
            >

            </v-img>
          </div>

          <v-card-text>
            <div>
              <v-container fluid>
                <v-radio-group>
                  <v-radio @click="solo_select(item, item.selection[0])" value={{item.selection[0]}}>
                    <template v-slot:label>
                      <div>{{item.selection[0]}}</div>
                    </template>
                  </v-radio>
                  <v-radio @click="solo_select(item, item.selection[1])"  value={{item.selection[1]}}>
                    <template v-slot:label>
                      <div>{{item.selection[1]}}</div>
                    </template>
                  </v-radio>
                  <v-radio @click="solo_select(item, item.selection[2])" value={{item.selection[2]}}>
                    <template v-slot:label>
                      <div>{{item.selection[2]}}</div>
                    </template>
                  </v-radio>
                  <v-radio @click="solo_select(item, item.selection[3])" value={{item.selection[3]}}>
                    <template v-slot:label>
                      <div>{{item.selection[3]}}</div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-container>
            </div>


          </v-card-text>

          <v-expansion-panels v-show="isTeacher">
            <v-expansion-panel elevation="0">
              <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                显示答案
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                {{item.answer}}
              </v-expansion-panel-text>
            </v-expansion-panel>

          </v-expansion-panels>

          <v-expansion-panels v-show="!isTeacher">
            <v-expansion-panel elevation="0">
              <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
                我的答案
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                {{item.my_answer}}
              </v-expansion-panel-text>
            </v-expansion-panel>

          </v-expansion-panels>

          <v-card-actions v-show="isTeacher&&!isPaperView">
            <v-list-item class="w-100">

<!--              <v-list-item-title>My Answer</v-list-item-title>-->

<!--              <v-list-item-subtitle>{{item.my_answer}}</v-list-item-subtitle>-->

              <template v-slot:append>
                <div class="justify-self-end">
                  <v-icon class="mr-1" icon="mdi-star" :color =item.star @click="collectQuestion(item)"></v-icon>
                  <span class="subheading mr-2">收藏</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1" icon="mdi-text-box-edit-outline" @click="openEdit(item)"></v-icon>
                  <span class="subheading mr-2">编辑</span>
                  <span class="mr-1">·</span>
                  <v-icon class="mr-1" icon="mdi-trash-can" @click="deleteQuestion(item)"></v-icon>
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
            <el-form-item label="题目图片" :label-width="formLabelWidth">
              <v-file-input
                  v-model="files"
                  color="deep-purple-accent-4"
                  counter
                  label="File input"
                  placeholder="Select your files"
                  prepend-icon="mdi-camera"
                  variant="outlined"
                  :show-size="1000"
              >
                <template v-slot:selection="{ fileNames }">
                  <template v-for="(fileName, index) in fileNames" :key="index">
                    <v-chip
                        color="deep-purple-accent-4"
                        label
                        size="small"
                        class="mr-2"
                    >
                      {{ fileName }}
                    </v-chip>
                  </template>
                </template>
              </v-file-input>
            </el-form-item>
            <el-form-item label="选项一" :label-width="formLabelWidth">
              <el-input v-model="item.selection[0]" autocomplete="off" />
            </el-form-item>
            <el-form-item label="选项二" :label-width="formLabelWidth">
              <el-input v-model="item.selection[1]" autocomplete="off" />
            </el-form-item>
            <el-form-item label="选项三" :label-width="formLabelWidth">
              <el-input v-model="item.selection[2]" autocomplete="off" />
            </el-form-item>
            <el-form-item label="选项四" :label-width="formLabelWidth">
              <el-input v-model="item.selection[3]" autocomplete="off" />
            </el-form-item>
            <el-form-item label="参考答案" :label-width="formLabelWidth">
              <el-input v-model="item.answer" autocomplete="off" />
            </el-form-item>
          </el-form>
          <template #footer>
              <span class="dialog-footer">
                  <el-button @click="openEdit(item)">Cancel</el-button>
                  <el-button type="primary" @click="this.EditFormPost(item)">
                    Confirm
                  </el-button>
               </span>
          </template>
        </el-dialog>
      </v-col>
    </v-row>

    <el-dialog v-model="form.dialogFormVisible" title="Shipping address">
      <el-form :model="form">
        <el-form-item label="问题描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项一" :label-width="formLabelWidth">
          <el-input v-model="form.selection[0]" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项二" :label-width="formLabelWidth">
          <el-input v-model="form.selection[1]" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项三" :label-width="formLabelWidth">
          <el-input v-model="form.selection[2]" autocomplete="off" />
        </el-form-item>
        <el-form-item label="选项四" :label-width="formLabelWidth">
          <el-input v-model="form.selection[3]" autocomplete="off" />
        </el-form-item>
        <el-form-item label="参考答案" :label-width="formLabelWidth">
          <el-input v-model="form.answer" autocomplete="off" />
        </el-form-item>
      </el-form>

      <template #footer>
              <span class="dialog-footer">
                  <el-button @click="form.dialogFormVisible = false">Cancel</el-button>
                  <el-button type="primary" @click="addQuestion(form)">
                    Confirm
                  </el-button>
               </span>
      </template>
    </el-dialog>
  </v-container>
</div>
</template>

<script>
import {useStore} from 'vuex'
import {reactive, onMounted, computed} from 'vue'
import {ElMessage} from "element-plus";

export default {
  name: "SinQuestions",
  data:()=>({
    formLabelWidth: '120px',
    collections:[],
    files: [],
    show:false,
    form:{
      id:"7",
      description:"以下谁是罗马帝国的皇帝（）。",
      selection:["奥古斯都","凯撒","亚历山大","亚瑟"],
      radios:"",
      img:true,
      img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
      answer:"亚历山大",
      dialogFormVisible:false,
      star:"black"
    }
  }),
  setup(){
    const store = useStore()
    let isTeacher = computed(() => store.state.user.isTeacher)
    let sin_selections = computed(()=>store.state.user.sin_selections)
    let isPaperView = computed(() => store.state.user.paperView)

    const state = reactive({
      show: false
    })

    onMounted(()=>{
      console.log("sin_q mounted...")
      console.log("show: ",state.show)
      isTeacher = computed(() => store.state.user.isTeacher)
      sin_selections = computed(()=>store.state.user.sin_selections)
      isPaperView = computed(() => store.state.user.paperView)
      state.show = store.getters.getShow
      console.log("show: ",state.show)
    })


    function solo_select(item, choice){
      console.log("choice",choice)
      let tmp = {}
      tmp['item'] = item
      tmp['choice'] = choice
      store.commit('set_sin_radios',tmp)
    }

    function collectQuestion(item){
      if (item.star==="black"){
        // item.star = "yellow"
        store.commit('add_collections',item)
        ElMessage({
          type:'success',
          message:'收藏成功',
          showClose:true
        })
      }
      else{
        // item.star = "black"
        store.commit('delete_item_from_collections',item)
        ElMessage({
          type:'success',
          message:'成功移出收藏',
          showClose:true
        })
      }
    }

    function deleteQuestion(item){
      let tmp = {
        'id': item.id,
        'type': item.type,
        'content':item.description,
        'choice':item.selection[0]+','+ item.selection[1]+','+ item.selection[2]+','+ item.selection[3],
        'answer':item.answer,
        'url':''
      }
      return store.dispatch("deleteQuestion",tmp)
    }

    function addQuestion(form){
      console.log(form)
      let item = {
        'content':form.description,
        'choice':form.selection[0]+','+ form.selection[1]+','+ form.selection[2]+','+ form.selection[3],
        'answer':form.answer,
        'url':'',
        'type': '单选题',

        'description':form.description,
        'selection':form.selection,
        "radios":"",
        "img_url":'',
        'my_answer':"",
        "img":"",
        "dialogFormVisible":false,
        "star":"black",

      }
      form.dialogFormVisible = false
      return store.dispatch("addQuestion",item)
    }

    function openEdit(item){
      store.commit('setDialog',item)
    }

    function EditPost(payload){
      // let payload = {
      //   'id': item.id,
      //   'type': '单选题',
      //   'content':item.description,
      //   'choice':item.selection[0]+','+ item.selection[1]+','+ item.selection[2]+','+ item.selection[3],
      //   'answer':item.answer,
      //   'url':''
      // }
      return store.dispatch("editPost", payload)
    }

    function setImgURL(payload){
      store.commit('setImgURL',payload)
    }

    return {
      isTeacher,
      isPaperView,
      sin_selections,
      collectQuestion,
      deleteQuestion,
      addQuestion,
      openEdit,
      EditPost,
      solo_select,
      setImgURL

    }
  },
  mounted() {
    console.log("test...")
    setTimeout(()=>{
      this.show = true
    }, 100)

  },
  methods:{
    async EditFormPost(item){
      let formData = new FormData()
      let tmp = ""
      formData.append('id', item.id)
      formData.append('type', '单选题')
      formData.append('content', item.description)
      formData.append('answer', item.answer)
      formData.append('choice', item.selection[0]+','+ item.selection[1]+','+ item.selection[2]+','+ item.selection[3])
      if (this.files.length > 0){
        console.log("files:",this.files[0])
        formData.append('img_file', this.files[0])
        formData.append('img_name', this.files[0].name)


        await this.EditPost(formData).then(value=>{
          tmp = value
          console.log("tmp:",tmp)
          let info = {
            'id': item.id,
            'img_url': tmp,
          }
          this.setImgURL(info)
        })
      }
      else{
        formData.append('url', '')
        await this.EditPost(formData)
      }
    },
    returnTop(){
      window.scrollTo(0,0);
    },
  }
}
</script>

<style scoped>

</style>
