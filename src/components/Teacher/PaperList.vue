<template>
<div>
  <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
    <el-table-column label="出题时间" prop="date" />
    <el-table-column label="有效截止期" prop="deadline" />
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
            @click="handleView(scope.$index, scope.row)"
        >
          查看
        </el-button>


        <el-button
            v-show="!isTeacher"
            size="small"
            @click="open2">
          试卷详情
        </el-button>


        <el-button
            v-show="!isTeacher"
            size="small"
            type="primary"
            @click="handleView(scope.$index, scope.row)"
        >
          开始答题
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import router from "@/router";
export default {
  name: "PaperList",
  data:()=>({
    isTeacher:false,
    tableData:[
      {
        date: '2016-05-03',
        deadline: '2016-08-03',
        total_score:"100",
        name: '试卷1',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        deadline: '2016-08-09',
        total_score:"100",
        name: '试卷2',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        deadline: '2016-08-10',
        total_score:"100",
        name: '试卷3',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        deadline: '2016-08-20',
        total_score:"100",
        name: '试卷4',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
    search: '',
  }),
  methods:{
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleView(index, row) {
      console.log(index, row);
      router.push({ path: '/teacher/paperView/sin_q2' })
    },
    open2() {
      this.$notify({
        title: '试卷1',
        message: '限时1小时完成，总分值100分，周五之前务必提交',
        duration: 0,
        offset: 100
      });
    }
  }

}
</script>

<style scoped>

</style>
