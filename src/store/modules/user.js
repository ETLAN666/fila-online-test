import { loginConfirm} from '@/api/index'
const user = {
    state: () => ({
        //base info
        role:'student',
        email:'',
        name:'',

        //style
        userIcon:"mdi-account-school-outline",
        barColor:"blue darken-3",

        //operation
        links:[
            ['mdi-file-search-outline', '查询试卷','/teacher/paperList'],
            ['mdi-cube', '试卷题库','/teacher/market/sin_q'],
        ],
        isStudent:true,
        isTeacher:false
    }),

    getters: {
        getRole(state){
            return state.role
        },
        getEmail(state){
            return state.email
        },
        getName(state){
            return state.name
        },
        getUserIcon(state){
            return state.userIcon
        },
        getBarColor(state){
            return state.barColor
        }
    },

    mutations: {
        setRole(state, role){
            state.role = role
        },
        setEmail(state, email){
            state.email = email
        },
        setName(state, name){
            state.name = name
        },
        setUserIcon(state, icon){
            state.userIcon = icon
        },
        setBarColor(state, color){
            state.barColor = color
        },
        setLinks(state, links){
            state.links = links
        }
    },
    actions: {
       async initialSate(store, info) {
            console.log(store.state.role)
            const result = await loginConfirm({email: info.email, password: info.password})
            store.commit('setRole',result.role)
            store.commit('setEmail',result.email)
            store.commit('setName',result.name)



           if (result.role === 'student'){
               console.log('set student style!')
               // store.commit('setUserIcon','mdi-account-school-outline')
               // store.commit('setBarColor','blue darken-3')

           }
           else{
               console.log('set teacher style!')
               store.commit('setUserIcon','mdi-card-account-details-star-outline')
               store.commit('setBarColor','red darken-3')
               let links = [
                   ['mdi-file-search-outline', '查询试卷','/teacher/paperList'],
                   ['mdi-cube', '在线题库','/teacher/market/sin_q'],
                   ['mdi-folder-edit-outline', '在线组卷','/teacher/construct'],
                   ['mdi-alpha-r-box-outline', '作答详情','/teacher/paperResult'],
               ]
               store.commit('setLinks',links)
           }
            console.log(store.state.role)
            window.localStorage.setItem("token", result.token)
        },

    }


}

export default user
