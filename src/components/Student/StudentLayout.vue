<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="blue darken-3"
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
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
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
</template>

<script>
export default {
  name: "StudentLayout",
  data: () => ({
    logout:"/",
    drawer: null,
    links: [
      ['mdi-file-search-outline', '查询试卷','/teacher/paperList'],
      ['mdi-cube', '试卷题库','/teacher/market/sin_q'],
      ['mdi-file-edit-outline', '开始答题'],
    ],
  }),
}
</script>

<style scoped>

</style>
