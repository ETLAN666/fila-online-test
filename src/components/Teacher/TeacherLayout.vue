<template>
<div>
  <v-app id="inspire">
    <v-app-bar
        app
        :color="userForm.barColor"
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
      :to="logout"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn icon @click="changeUser">
        <v-icon>{{userForm.userIcon}}</v-icon>
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
        <v-avatar
            class="mb-4"
            color="grey-darken-1"
            size="64"
        ></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
            v-for="[icon, text, route] in links"
            :key="icon"
            link
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
export default {
  name: "TeacherLayout",
  data: () => ({
    userForm:{
      user:"teacher",
      userIcon:"mdi-card-account-details-star-outline",
      barColor:"red darken-3"
    },
    // studentForm:{
    //   user:"student",
    //   userIcon:"mdi-mdi-account-school-outline",
    //   barColor:"blue darken-3"
    // },
    logout:"/",
    drawer: null,
    links: [
      ['mdi-file-search-outline', '查询试卷','/teacher/paperList'],
      ['mdi-cube', '在线题库','/teacher/market/sin_q'],
      ['mdi-folder-edit-outline', '在线组卷','/teacher/construct'],
      ['mdi-alpha-r-box-outline', '作答详情','/teacher/paperResult'],
    ],
  }),
  methods:{
    changeUser(){
      if(this.userForm.user==="teacher"){
        this.userForm={
          user:"student",
          userIcon:"mdi-account-school-outline",
          barColor:"blue darken-3"
        }
      }
      else{
        this.userForm={
          user:"teacher",
          userIcon:"mdi-card-account-details-star-outline",
          barColor:"red darken-3"
        }
      }
    }

  }
}
</script>

