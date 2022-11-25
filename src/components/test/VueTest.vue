<template>
<div id="app">

  <v-container
      class="py-8 px-6"
      fluid
  >
    <v-btn
        class="ma-2"
        outlined
        color="indigo"
    >
      Outlined Button
    </v-btn>

  </v-container>



</div>
</template>

<script>


export default {
  name: "VueTest",
  data: () => ({
    formLabelWidth: '120px',
    text_questions:[
      {
        id:"1",
        description:"请列举出白居易在诗词方面的代表作",
        text:"",
        img:true,
        img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        answer:"琵琶行",
        dialogFormVisible:false,
      },
      {
        id:"2",
        description:"请预测一下本次卡塔尔世界杯决赛名单",
        text:"",
        img:false,
        img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
        answer:"法国",
        dialogFormVisible:false,
      },
    ],
  }),
  methods:{
    returnTop(){
      window.scrollTo(0,0);
    },
  }
}
</script>

<style scoped>
body{
  padding-right: 0px !important;
  overflow: hidden;
}
</style>
