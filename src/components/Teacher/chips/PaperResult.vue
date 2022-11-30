<template>
  <div>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="发布时间" prop="start" />
      <el-table-column label="截止时间" prop="ddl" />
      <el-table-column label="试卷状态" prop="status" />
      <el-table-column label="试卷名称" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search" />
        </template>
        <template #default="scope">

          <el-button
              v-show="!isTeacher"
              size="small"
              type="primary"
              @click="handleView(scope.$index, tableData, scope.row)"
          >
            作答详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {computed, toRaw} from 'vue'

export default {
  name: "PaperResult",
  data:()=>({
    // tableData:[
    //   {
    //     date: '2016-05-03',
    //     timeCost: '46分钟',
    //     status:"待批改",
    //     name: '试卷1',
    //     address: 'No. 189, Grove St, Los Angeles',
    //   },
    //   {
    //     date: '2016-05-02',
    //     timeCost: '46分钟',
    //     status:"待批改",
    //     name: '试卷2',
    //     address: 'No. 189, Grove St, Los Angeles',
    //   },
    //   {
    //     date: '2016-05-04',
    //     timeCost: '46分钟',
    //     status:"待批改",
    //     name: '试卷3',
    //     address: 'No. 189, Grove St, Los Angeles',
    //   },
    //   {
    //     date: '2016-05-01',
    //     timeCost: '46分钟',
    //     status:"待批改",
    //     name: '试卷4',
    //     address: 'No. 189, Grove St, Los Angeles',
    //   },
    // ],
    search: '',
  }),
  setup(){
    const store = useStore()
    const router = useRouter()
    let isTeacher = computed(() => store.state.user.isTeacher)
    let tableData = computed(() => store.state.user.paperList)

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
      store.commit('set_sin_selections',paper.sin_q)
      store.commit('set_multi_choices',paper.mul_q)
      store.commit('set_judges_questions',paper.judge_q)
      store.commit('set_fill_blanks',paper.fill_q)
      store.commit('set_text_questions',paper.text_q)
      router.push({ path: '/teacher/paperView/sin_q2' })
    }

    return {
      isTeacher,
      tableData,
      handleView
    }
  },
  methods:{
    handleEdit(index, row) {
      console.log(index, row);
    },

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
