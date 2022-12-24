import { createWebHistory, createRouter } from "vue-router";

import VueTest from "@/components/test/VueTest";

import TeacherLayout from "@/components/Teacher/TeacherLayout";
import QuestionMarket from "@/components/Teacher/QuestionMarket";
import FillBlank from "@/components/Teacher/chips/FillBlank";
import MultiQuestions from "@/components/Teacher/chips/MultiQuestions";
import SinQuestions from "@/components/Teacher/chips/SinQuestions";
import TextQuestions from "@/components/Teacher/chips/TextQuestions";
import JudgeQuestions from "@/components/Teacher/chips/JudgeQuestions";
import PaperList from "@/components/Teacher/PaperList";
import PaperConstructor from "@/components/Teacher/PaperConstructor";

import PaperView from "@/components/Teacher/chips/PaperView";
import PaperResult from "@/components/Teacher/chips/PaperResult";

import StudentLayout from "@/components/Student/StudentLayout";
import VueLogin from "@/components/Login/VueLogin";

import store from '../store/index'



const routes = [
    {
        path: "/test",
        name: "test",
        component: VueTest,
        meta: { requiresAuth: false }
    },
    {
        path:"/",
        name:"login",
        component: VueLogin,
        meta: { requiresAuth: false }
    },
    {
        path:"/teacher",
        name:"teacher",
        component: TeacherLayout,
        meta: { requiresAuth: true },
        children:[
            {
                path:"/teacher/market",
                name:"market",
                component:QuestionMarket,
                meta: { requiresAuth: true },
                children:[
                    {
                        path:"/teacher/market/sin_q",
                        name:"sin_q",
                        component:SinQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/market/multi_q",
                        name:"multi_q",
                        component:MultiQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/market/fill_q",
                        name:"fill_q",
                        component:FillBlank,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/market/judge_q",
                        name:"judge_q",
                        component:JudgeQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/market/text_q",
                        name:"text_q",
                        component:TextQuestions,
                        meta: { requiresAuth: true },
                    }
                ]
            },
            {
                path:"/teacher/paperList",
                name:"paperList",
                component: PaperList,
                meta: { requiresAuth: true },
            },
            {
                path:"/teacher/paperResult",
                name:"paperResult",
                component: PaperResult,
                meta: { requiresAuth: true },
            },
            {
                path:"/teacher/construct",
                name:"construct",
                component: PaperConstructor,
                meta: { requiresAuth: true },
                children:[
                    {
                        path:"/teacher/construct/sin_q1",
                        name:"sin_q1",
                        component:SinQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/construct/multi_q1",
                        name:"multi_q1",
                        component:MultiQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/construct/fill_q1",
                        name:"fill_q1",
                        component:FillBlank,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/construct/judge_q1",
                        name:"judge_q1",
                        component:JudgeQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/construct/text_q1",
                        name:"text_q1",
                        component:TextQuestions,
                        meta: { requiresAuth: true },
                    }
                ]
            },
            {
                path:"/teacher/paperView",
                name:"paperView",
                component: PaperView,
                meta: { requiresAuth: true },
                children:[
                    {
                        path:"/teacher/paperView/sin_q2",
                        name:"sin_q2",
                        component:SinQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/paperView/multi_q2",
                        name:"multi_q2",
                        component:MultiQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/paperView/fill_q2",
                        name:"fill_q2",
                        component:FillBlank,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/paperView/judge_q2",
                        name:"judge_q2",
                        component:JudgeQuestions,
                        meta: { requiresAuth: true },
                    },
                    {
                        path:"/teacher/paperView/text_q2",
                        name:"text_q2",
                        component:TextQuestions,
                        meta: { requiresAuth: true },
                    },
                ]
            }
        ]
    },
    {
        path:"/student",
        name:"student",
        component: StudentLayout,
        meta: { requiresAuth: true },
    }

];



const router = createRouter({
    history: createWebHistory(),
    routes,
});





router.beforeEach((to, from,next) =>{

    // let token = window.localStorage.getItem('token')
    // console.log(window.localStorage.getItem('token'))
    // console.log(typeof (window.localStorage.getItem('token')))


    let token = store.getters.getToken
    console.log("to path",to.meta.requiresAuth)
    console.log("token: ",store.getters.getToken)

    if (to.meta.requiresAuth === true){
        if (token === ''){
            console.log('return!!!')
            next('/')
        }
        else{
            next()
        }
    }
    else{
        next()
    }




})

export default router;
