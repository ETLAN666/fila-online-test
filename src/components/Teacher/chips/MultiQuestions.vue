<template>
  <div>
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
            v-for="item in multi_selections"
            :key="item.id"
            cols="12"
        >
          <v-card
              class="mx-auto"
              max-width="600"
          >
            <v-card-title>多选题 第{{item.id}}题
              <div style="color: #54a0ff; display: inline">
                （3分）
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
                <v-container fluid>
                  <v-radio-group
                      :multiple=true
                      v-model="item.radios_tmp"
                  >
                    <v-radio @click="multi_select(item, item.selection[0])"  value={{item.selection[0]}}>
                      <template v-slot:label>
                        <div>{{item.selection[0]}}</div>
                      </template>
                    </v-radio>
                    <v-radio @click="multi_select(item, item.selection[1])"  value={{item.selection[1]}}>
                      <template v-slot:label>
                        <div>{{item.selection[1]}}</div>
                      </template>
                    </v-radio>
                    <v-radio @click="multi_select(item, item.selection[2])" value={{item.selection[2]}}>
                      <template v-slot:label>
                        <div>{{item.selection[2]}}</div>
                      </template>
                    </v-radio>
                    <v-radio @click="multi_select(item, item.selection[3])" value={{item.selection[3]}}>
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

                <v-list-item-title>My Answer</v-list-item-title>

                <v-list-item-subtitle>{{item.my_answer}}</v-list-item-subtitle>

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
                  <el-button type="primary" @click="EditPost(item)">
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
import {computed} from 'vue'
import {ElMessage} from "element-plus";

export default {
  name: "MultiQuestions",
  data:()=>({
    formLabelWidth: '120px',
    collections:[],
    // multi_selections:[
    //   {
    //     id:"1",
    //     description:"美国西海岸的州（）。",
    //     selection:["加利福利亚州","德克萨斯州","俄亥俄州","新泽西州"],
    //     radios:[],
    //     img:true,
    //     img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
    //     answer:"加利福利亚州",
    //     dialogFormVisible:false,
    //     star:"black"
    //   },
    //   {
    //     id:"2",
    //     description:"中国古代的大发明（）。",
    //     selection:["火药","指南针","造纸术","蒸汽机"],
    //     radios:[],
    //     img:false,
    //     img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
    //     answer:"火药,指南针,造纸术",
    //     dialogFormVisible:false,
    //     star:"black"
    //   }
    // ],
    form:{
      id:"7",
      description:"中国古代的大发明（）。",
      selection:["火药","指南针","造纸术","蒸汽机"],
      radios:[],
      img:false,
      img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
      answer:"火药,指南针,造纸术",
      dialogFormVisible:false,
      star:"black"
    }
  }),
  setup(){
    const store = useStore()
    let isTeacher = computed(() => store.state.user.isTeacher)
    let multi_selections = computed(() => store.state.user.multi_selections)
    let isPaperView = computed(() => store.state.user.paperView)

    function multi_select(item, choice){
      let tmp = {}
      tmp['item'] = item
      tmp['choice'] = choice
      store.commit('set_multi_radios',tmp)
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
        'type': '多选题',

        "radios":[],
        'description':form.description,
        'selection':form.selection,
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

    function EditPost(item){
      let payload = {
        'id': item.id,
        'type': '多选题',
        'content':item.description,
        'choice':item.selection[0]+','+ item.selection[1]+','+ item.selection[2]+','+ item.selection[3],
        'answer':item.answer,
        'url':''
      }
      store.dispatch("editPost", payload)
    }

    return {
      isTeacher,
      isPaperView,
      multi_selections,
      collectQuestion,
      deleteQuestion,
      addQuestion,
      openEdit,
      EditPost,
      multi_select
    }
  },
  methods:{
    returnTop(){
      window.scrollTo(0,0);
    },
    // addQuestion(){
    //   this.form.dialogFormVisible = false
    //   this.multi_selections.push(this.form)
    // },
    // collectQuestion(item){
    //   if (item.star==="black"){
    //     item.star = "yellow"
    //     this.collections.push(item)
    //     // console.log(this.collections.length)
    //   }
    //   else{
    //     item.star = "black"
    //     this.collections.forEach(function (element,index,array){
    //       if (element.id===item.id){
    //         array.splice(index,1);
    //       }
    //     })
    //     // console.log(this.collections.length)
    //   }
    //
    // },
    // deleteQuestion(id){
    //   this.multi_selections.forEach(function (item,index,array){
    //     if (item.id===id){
    //       array.splice(index,1);
    //     }
    //   })
    // }
  }
}
</script>

<style scoped>

</style>
