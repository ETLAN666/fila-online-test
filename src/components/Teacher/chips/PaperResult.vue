<template>
  <div>
    <el-table :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" style="width: 100%">
      <el-table-column label="完成时间" prop="date" />
      <el-table-column label="总计用时" prop="timeCost" />
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
              @click="handleView(scope.$index, scope.row)"
          >
            作答详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "PaperResult",
  data:()=>({
    isTeacher:false,
    tableData:[
      {
        date: '2016-05-03',
        timeCost: '46分钟',
        status:"待批改",
        name: '试卷1',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        timeCost: '46分钟',
        status:"待批改",
        name: '试卷2',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        timeCost: '46分钟',
        status:"待批改",
        name: '试卷3',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        timeCost: '46分钟',
        status:"待批改",
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
