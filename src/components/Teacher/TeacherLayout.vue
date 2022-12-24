<template>
<div>
  <v-app id="inspire">
    <v-app-bar
        app
        :color="barColor"
        dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
          style="width: 300px"
          class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">YNU网考</span>
      </v-toolbar-title>
      <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon
      @click="logOut"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>{{userIcon}}</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-app-bar>

    <!--   <router-view></router-view>-->

    <v-navigation-drawer v-model="drawer">
      <v-sheet
          color="grey-lighten-4"
          class="pa-4"
      >
<!--        <v-avatar-->
<!--            class="mb-4"-->
<!--            color="grey-darken-1"-->
<!--            size="64"-->
<!--        ></v-avatar>-->
        <v-avatar
            class="mb-4"
            size="80"
        >
          <v-img
              :src = avatar
              alt="John"
          ></v-img>
        </v-avatar>

        <div>{{name}}</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
            v-for="[icon, text, route] in links"
            :key="icon"
            link
            @click="selectFunction(text)"
            :to="route"
        >
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view></router-view>



    </v-main>
  </v-app>


</div>
</template>

<script>
import {useStore} from 'vuex'
import {onMounted, computed, toRaw} from 'vue'
import {useRouter} from 'vue-router'

export default {
  name: "TeacherLayout",
  data: () => ({
    drawer: null,
    show: false
  }),
  setup(){
    const store = useStore()
    const router = useRouter()

    let email = computed(()=>store.state.user.email)
    let name = computed(()=>store.state.user.name)
    let role = computed(() => store.state.user.role)
    let avatar = computed(() => store.state.user.avatar)

    let userIcon = computed(() => store.state.user.userIcon)
    let barColor = computed(() => store.state.user.barColor)

    let links = computed(()=> store.state.user.links)

    onMounted(()=>{
      console.log("teacherLayout mounted...")
      email = computed(()=>store.state.user.email)
      name = computed(()=>store.state.user.name)
      role = computed(() => store.state.user.role)

      userIcon = computed(() => store.state.user.userIcon)
      barColor = computed(() => store.state.user.barColor)

      links = computed(()=> store.state.user.links)
    })

    function logOut(){
      window.localStorage.setItem("token", '')
      store.commit('setShowData', false)
      router.push({path:'/'})
      window.location.reload()
    }

    function JumpInto(path){
      router.push({path:path})
    }

    function getQuestions(){
      store.commit("set_paperView",  false)
      return store.dispatch("getQuestions")
    }

    function getPaperList(){
      store.commit("set_paperView",  true)
      return store.dispatch("getPapers")
    }

    function getResultList(info){
      return store.dispatch("getResults", info)
    }


    return {
      email,
      name,
      role,
      avatar,
      userIcon,
      barColor,
      links,
      logOut,
      JumpInto,
      getQuestions,
      getPaperList,
      getResultList,
    }


  },
  mounted() {
    setTimeout(()=>{
      this.show = true
    },100)
  },

  methods:{
    async selectFunction(info){
      console.log(info)
      if (info === '在线题库' || info === '试卷题库'){
        console.log(1)
        await this.getQuestions()
        let path = '/teacher/market/sin_q'
        this.JumpInto(path)

      }
      else if (info === '查询试卷'){
        console.log(2)
        await this.getPaperList()
        let path = '/teacher/paperList'
        this.JumpInto(path)
      }
      else if (info === '在线组卷'){
        console.log(3)
        let path = '/teacher/construct'
        this.JumpInto(path)
      }
      else if (info === '作答详情'){
        console.log(4)
        let tmp = toRaw(this.email)
        console.log("email tmp:", tmp)
        await this.getResultList(tmp)
        let path = '/teacher/paperResult'
        this.JumpInto(path)
      }
    }
  }
}
</script>

