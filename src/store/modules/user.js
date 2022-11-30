import { loginConfirm, getQuestionsSets, setSinQ, setMulQ, addQ,modifyQ,
        setJudgeQ, setFillQ, setTextQ, getPaperList, deleteQ, postPaper,
        postPaperResult, getPaperResult} from '@/api/index'
import {ElMessage} from "element-plus";



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
            ['mdi-alpha-r-box-outline', '作答详情','/teacher/paperResult'],
        ],
        isTeacher:false,
        paperView:false,

        //Data
        paperName:"试卷",
        sin_selections:[{
            id:"1",
            description:"中断向量提供 （）。",
            selection:["入口地址","返回地址","寄存器地址","下一条指令的地址"],
            radios:"",
            img:true,
            img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
            answer:"返回地址",
            dialogFormVisible:false,
            star:"black"
        }],
        multi_selections:[{
            id:"1",
            description:"美国西海岸的州（）。",
            selection:["加利福利亚州","德克萨斯州","俄亥俄州","新泽西州"],
            radios:[],
            img:true,
            img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
            answer:"加利福利亚州",
            dialogFormVisible:false,
            star:"black"
        }],
        judge_questions:[ {
            id:"1",
            description:"中共一大召开于1921年",
            selection:["正确","错误"],
            img:true,
            img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
            answer:"正确",
            dialogFormVisible:false,
            star:"black"
        }],
        fill_questions:[  {
            id:"2",
            description:"红军长征开始于（）年",
            text:"",
            img:true,
            img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
            answer:"1934",
            dialogFormVisible:false,
            star:"black"
        }],
        text_questions:[ {
            id:"2",
            description:"请预测一下本次卡塔尔世界杯决赛名单",
            text:"",
            img:false,
            img_url:"https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg",
            answer:"法国",
            dialogFormVisible:false,
            star:"black"
        }],

        paperList:[],
        collections:[],
        sequence:[]
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
        },
        setStatus(state, status){
            state.isTeacher = status
        },

        set_sin_radios(state, payload){
            console.log("payload in vuex:", payload)
            state.sin_selections = state.sin_selections.map((item, index, arr)=>{
                if (item.id === payload.item.id){
                    item.radios = payload.choice
                    console.log(index)
                    console.log(arr)
                }
                return item
            })
        },

        set_judge_radios(state, payload){
            state.judge_questions = state.judge_questions.map((item, index, arr)=>{
                if (item.id === payload.item.id){
                    item.radios = payload.choice
                    console.log(index)
                    console.log(arr)
                }
                return item
            })
        },

        set_multi_radios(state, payload){
            state.multi_selections = state.multi_selections.map((item, index, arr)=>{
                if (item.id === payload.item.id){
                    item.radios = item.radios + ',' + payload.choice
                    console.log(index)
                    console.log(arr)
                }
                return item
            })
        },

        set_paperName(state, name){
            state.paperName = name
        },
        set_paperView(state, flag){
            state.paperView = flag
        },

        set_sequence(state){
            state.sequence = []
            for (let key in state.collections){
                state.sequence.push(key.id)
            }
        },
        setDialog(state, payload){
            if (payload.type === '单选题'){
                state.sin_selections = state.sin_selections.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        if (item.dialogFormVisible === false)
                        item.dialogFormVisible = true
                        console.log(index)
                        console.log(arr)
                    }
                    else{
                        item.dialogFormVisible = false
                    }
                    return item
                })
            }
            else if(payload.type === '多选题'){
                state.multi_selections = state.multi_selections.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        if (item.dialogFormVisible === false)
                            item.dialogFormVisible = true
                        console.log(index)
                        console.log(arr)
                    }
                    else{
                        item.dialogFormVisible = false
                    }
                    return item
                })
            }
            else if(payload.type === '判断题'){
                state.judge_questions = state.judge_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        if (item.dialogFormVisible === false)
                            item.dialogFormVisible = true
                        console.log(index)
                        console.log(arr)
                    }
                    else{
                        item.dialogFormVisible = false
                    }
                    return item
                })
            }
            else if(payload.type === '填空题'){
                state.fill_questions = state.fill_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        if (item.dialogFormVisible === false)
                            item.dialogFormVisible = true
                        console.log(index)
                        console.log(arr)
                    }
                    else{
                        item.dialogFormVisible = false
                    }
                    return item
                })
            }
            else if(payload.type === '问答题'){
                state.text_questions = state.text_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        if (item.dialogFormVisible === false)
                            item.dialogFormVisible = true
                        console.log(index)
                        console.log(arr)
                    }
                    else{
                        item.dialogFormVisible = false
                    }
                    return item
                })
            }
        },



        set_sin_selections(state, payload){
            state.sin_selections = setSinQ(payload)
        },
        set_multi_choices(state, payload){
            state.multi_selections = setMulQ(payload)
        },
        set_judges_questions(state, payload){
            state.judge_questions = setJudgeQ(payload)
        },
        set_fill_blanks(state, payload){
            state.fill_questions = setFillQ(payload)
        },
        set_text_questions(state, payload){

            state.text_questions = setTextQ(payload)
        },
        set_paperList(state, payload){
            state.paperList = payload
        },

        set_from_collections(state){
            state.sin_selections = state.collections.filter(item => item.type === "单选题")
            state.multi_selections = state.collections.filter(item => item.type === "多选题")
            state.judge_questions = state.collections.filter(item => item.type === '判断题')
            state.fill_questions = state.collections.filter(item => item.type === "填空题")
            state.text_questions = state.collections.filter(item => item.type === "问答题")

            console.log("单选题:",state.sin_selections)
            console.log("多选题:",state.multi_selections)
            console.log("判断题:",state.judge_questions)
            console.log("填空题:",state.fill_questions)
            console.log("问答题:",state.text_questions)
        },

        add_collections(state, payload){
            state.collections.push(payload)
            console.log("collections:",state.collections)
            if (payload.type === '单选题'){
                state.sin_selections = state.sin_selections.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'yellow'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '多选题'){
                state.multi_selections = state.multi_selections.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'yellow'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '判断题'){
                state.judge_questions = state.judge_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'yellow'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '填空题'){
                state.fill_questions = state.fill_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'yellow'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '问答题'){
                state.text_questions = state.text_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'yellow'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }

        },
        delete_item_from_collections(state, payload){
            state.collections = state.collections.filter(item=>{
                return item.id !== payload.id
            })
            if (payload.type === '单选题'){
                state.sin_selections = state.sin_selections.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'black'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '多选题'){
                state.multi_selections = state.multi_selections.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'black'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '判断题'){
                state.judge_questions = state.judge_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'black'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '填空题'){
                state.fill_questions = state.fill_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'black'
                        console.log(index)
                        console.log(arr)
                    }
                    return item
                })
            }
            else if(payload.type === '问答题'){
                state.text_questions = state.text_questions.map((item, index, arr)=>{
                    if (item.id === payload.id){
                        item.star = 'black'
                        console.log(index)
                        console.log(arr[0])
                    }
                    return item
                })
            }
        },
        delete_fillQ_item(state, payload){
            state.fill_questions = state.fill_questions.filter(item=>{
                return item.id !== payload.id
            })
        },
        delete_judgeQ_item(state, payload){
            state.judge_questions = state.judge_questions.filter(item=>{
                return item.id !== payload.id
            })
        },
        delete_MultiQ_item(state, payload){
            state.multi_selections = state.multi_selections.filter(item=>{
                return item.id !== payload.id
            })
        },
        delete_SinQ_item(state, payload){
            state.sin_selections = state.sin_selections.filter(item=>{
                return item.id !== payload.id
            })
        },
        delete_TextQ_item(state, payload){
            state.text_questions = state.text_questions.filter(item=>{
                return item.id !== payload.id
            })
        },


        add_fillQ_item(state, payload){
            state.fill_questions.push(payload)
        },
        add_judgeQ_item(state, payload){
            state.judge_questions.push(payload)
        },
        add_MultiQ_item(state, payload){
            state.multi_selections.push(payload)
        },
        add_SinQ_item(state, payload){
            state.sin_selections.push(payload)
        },
        add_TextQ_item(state, payload){
            state.text_questions.push(payload)
        },



    },
    actions: {
       initialState(store, info) {
           return new Promise((resolve, reject)=>{
               console.log(1)
               loginConfirm({email: info.email, password: info.password}).then(result=>{
                   console.log(result)
                   window.localStorage.setItem("token", result.token)
                   store.commit('setRole',result.role)
                   store.commit('setEmail',result.email)
                   store.commit('setName',result.name)
                   console.log(2)
                   if (result.role === 'student'){
                       console.log('set student style!')
                   }
                   else{
                       console.log('set teacher style!')
                       store.commit('setUserIcon','mdi-card-account-details-star-outline')
                       store.commit('setBarColor','red darken-3')
                       let links = [
                           ['mdi-file-search-outline', '查询试卷','/teacher/paperList'],
                           ['mdi-cube', '在线题库','/teacher/market/sin_q'],
                           ['mdi-folder-edit-outline', '在线组卷','/teacher/construct'],
                       ]
                       store.commit('setLinks',links)
                       store.commit('setStatus',true)
                   }
                   resolve(result);
               }).catch(err=>{
                   reject(err);
               });
           });

        },

        getQuestions(store){
           return new Promise((resolve, reject)=>{
               getQuestionsSets().then(result=>{
                   store.commit('set_sin_selections',result.sin_q)
                   store.commit('set_multi_choices',result.mul_q)
                   store.commit('set_judges_questions',result.judge_q)
                   store.commit('set_fill_blanks',result.fill_q)
                   store.commit('set_text_questions',result.text_q)
                   resolve(result)
               }).catch(err=>{
                   reject(err)
               })

           })

        },

        getPapers(store){
           return new Promise((resolve, reject) =>{
               getPaperList().then(result=>{
                   console.log("result:",result)
                   store.commit('set_paperList',result)

                   resolve(result)
               }).catch(err=>{
                   reject(err)
               })
           })
        },

        deleteQuestion(store, payload){
           return new Promise((resolve, reject)=>{
               deleteQ(payload).then(result=>{
                   console.log('result',result)
                   if (payload.type === '单选题'){
                       store.commit('delete_SinQ_item',payload)
                   }
                   else if(payload.type === '多选题'){
                       store.commit('delete_MultiQ_item',payload)
                   }
                   else if(payload.type === '判断题'){
                       store.commit('delete_judgeQ_item',payload)
                   }
                   else if(payload.type === '填空题'){
                       store.commit('delete_fillQ_item',payload)
                   }
                   else if(payload.type === '问答题'){
                       store.commit('delete_TextQ_item',payload)
                   }
                   ElMessage({
                     type:'success',
                     message:'删除成功',
                     showClose:true
                   })
                   resolve(result)
               }).catch(err=>{
                   reject(err)
               })
           })
        },

        addQuestion(store, payload){
            return new Promise((resolve, reject)=>{
                addQ(payload).then(result=>{
                    console.log('result',result)
                    payload['id'] = parseInt(result)
                    if (payload.type === '单选题'){
                        store.commit('add_SinQ_item',payload)
                    }
                    else if(payload.type === '多选题'){
                        store.commit('add_MultiQ_item',payload)
                    }
                    else if(payload.type === '判断题'){
                        store.commit('add_judgeQ_item',payload)
                    }
                    else if(payload.type === '填空题'){
                        store.commit('add_fillQ_item',payload)
                    }
                    else if(payload.type === '问答题'){
                        store.commit('add_TextQ_item',payload)
                    }
                    ElMessage({
                        type:'success',
                        message:'添加成功',
                        showClose:true
                    })
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        editPost(store, payload){
            return new Promise((resolve, reject)=>{
                modifyQ(payload).then(result=>{
                    store.commit('setDialog',payload)
                    console.log('result',result)
                    ElMessage({
                        type:'success',
                        message:'修改成功',
                        showClose:true
                    })
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        postNewPaper(store, payload){
            return new Promise((resolve, reject)=>{
                postPaper(payload).then(result=>{
                    console.log('result',result)
                    ElMessage({
                        type:'success',
                        message:'发布成功',
                        showClose:true
                    })
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
            })
        },

        postNewResults(store, payload){
            return new Promise((resolve, reject)=>{
                console.log('payload',payload)
                postPaperResult(payload).then(result=>{
                    console.log('result',result)
                    ElMessage({
                        type:'success',
                        message:'提交成功',
                        showClose:true
                    })
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
            })
        },

        getResults(store, payload){
            return new Promise((resolve, reject)=>{
                console.log('payload',payload)
                getPaperResult({email:payload}).then(result=>{
                    console.log('get paper result:',result)
                    store.commit('set_paperList', result)
                    resolve(result)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
    }


}

export default user
