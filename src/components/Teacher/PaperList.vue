<template>
<div>
  <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
    <el-table-column label="出题时间" prop="start" />
    <el-table-column label="有效截止期" prop="ddl" />
    <el-table-column label="试卷总分" prop="total_score" />
    <el-table-column label="试卷名称" prop="name" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button v-show="isTeacher" size="small" @click="handleEdit(scope.$index, scope.row)">
          编辑
        </el-button>
        <el-button
            v-show="isTeacher"
            size="small"
            type="primary"
            @click="handleView(scope.$index, tableData, scope.row)"
        >
          查看
        </el-button>


        <el-button
            v-show="!isTeacher"
            size="small"
            @click="open2(scope.row)">
          试卷详情
        </el-button>


        <el-button
            v-show="!isTeacher"
            size="small"
            type="primary"
            @click="handleView(scope.$index, tableData, scope.row)"
        >
          开始答题
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {onMounted, computed, toRaw} from 'vue'
// import {useRouter} from 'vue-router'
export default {
  name: "PaperList",
  data:()=>({
    search: '',
  }),
  setup(){
    const store = useStore()
    const router = useRouter()
    let isTeacher = computed(() => store.state.user.isTeacher)
    let tableData = computed(() => store.state.user.paperList)
    let show = computed(() => store.state.user.showData)

    onMounted(()=>{
      isTeacher = computed(() => store.state.user.isTeacher)
      tableData = computed(() => store.state.user.paperList)
    })

    function handleView(index, table, row) {
      console.log(index, row);
      const tmp = toRaw(row)
      console.log("tmp:",tmp);
      console.log("tmp.name:",tmp.name);
      // store.dispatch("setPaperView",table, tmp.name)
      let data = toRaw(table)
      console.log("setView:",data)
      console.log("name:",tmp.name)
      let paper = data.find((item)=>{
        if(item.name === tmp.name){
          return item
        }
      })
      console.log("paper:",paper)

      store.commit("set_paperName", paper.name)
      store.commit('set_sin_selections',paper.questions.sin_q)
      store.commit('set_multi_choices',paper.questions.mul_q)
      store.commit('set_judges_questions',paper.questions.judge_q)
      store.commit('set_fill_blanks',paper.questions.fill_q)
      store.commit('set_text_questions',paper.questions.text_q)
      router.push({ path: '/teacher/paperView/sin_q2' })
    }



    return {
      isTeacher,
      tableData,
      handleView,
      show
    }


  },
  methods:{
    handleEdit(index, row) {
      console.log(index, row);
      // console.log(row.note)
    },
    // handleView(index, row) {
    //   console.log(index, row);
    //   router.push({ path: '/teacher/paperView/sin_q2' })
    // },
    open2(info) {
      let tmp = toRaw(info)
      this.$notify({
        title: info.name,
        message: tmp.note,
        duration: 0,
        offset: 100
      });
    }
  }

}
</script>

<style scoped>

</style>
