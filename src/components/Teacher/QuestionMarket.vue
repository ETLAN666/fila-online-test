<template>
  <div>
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
</template>

<script>

export default {
  name: "QuestionMarket",
  data:()=>({
    links:[
      {
        name:"单选题",
        route:"/teacher/market/sin_q",
      },
      {
        name:"多选题",
        route:"/teacher/market/multi_q",
      },
      {
        name:"判断题",
        route:"/teacher/market/judge_q",
      },
      {
        name:"填空题",
        route:"/teacher/market/fill_q",
      },
      {
        name:"问答题",
        route:"/teacher/market/text_q",
      },
    ],

  }),
  methods:{





  }
}
</script>

<style scoped>

</style>
