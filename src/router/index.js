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

const routes = [
    {
        path: "/test",
        name: "test",
        component: VueTest,
    },
    {
        path:"/",
        name:"login",
        component: VueLogin,
    },
    {
        path:"/teacher",
        name:"teacher",
        component: TeacherLayout,
        children:[
            {
                path:"/teacher/market",
                name:"market",
                component:QuestionMarket,
                children:[
                    {
                        path:"/teacher/market/sin_q",
                        name:"sin_q",
                        component:SinQuestions,
                    },
                    {
                        path:"/teacher/market/multi_q",
                        name:"multi_q",
                        component:MultiQuestions,
                    },
                    {
                        path:"/teacher/market/fill_q",
                        name:"fill_q",
                        component:FillBlank,
                    },
                    {
                        path:"/teacher/market/judge_q",
                        name:"judge_q",
                        component:JudgeQuestions,
                    },
                    {
                        path:"/teacher/market/text_q",
                        name:"text_q",
                        component:TextQuestions,
                    }
                ]
            },
            {
                path:"/teacher/paperList",
                name:"paperList",
                component: PaperList,
            },
            {
                path:"/teacher/paperResult",
                name:"paperResult",
                component: PaperResult,
            },
            {
                path:"/teacher/construct",
                name:"construct",
                component: PaperConstructor,
                children:[
                    {
                        path:"/teacher/construct/sin_q1",
                        name:"sin_q1",
                        component:SinQuestions,
                    },
                    {
                        path:"/teacher/construct/multi_q1",
                        name:"multi_q1",
                        component:MultiQuestions,
                    },
                    {
                        path:"/teacher/construct/fill_q1",
                        name:"fill_q1",
                        component:FillBlank,
                    },
                    {
                        path:"/teacher/construct/judge_q1",
                        name:"judge_q1",
                        component:JudgeQuestions,
                    },
                    {
                        path:"/teacher/construct/text_q1",
                        name:"text_q1",
                        component:TextQuestions,
                    }
                ]
            },
            {
                path:"/teacher/paperView",
                name:"paperView",
                component: PaperView,
                children:[
                    {
                        path:"/teacher/paperView/sin_q2",
                        name:"sin_q2",
                        component:SinQuestions,
                    },
                    {
                        path:"/teacher/paperView/multi_q2",
                        name:"multi_q2",
                        component:MultiQuestions,
                    },
                    {
                        path:"/teacher/paperView/fill_q2",
                        name:"fill_q2",
                        component:FillBlank,
                    },
                    {
                        path:"/teacher/paperView/judge_q2",
                        name:"judge_q2",
                        component:JudgeQuestions,
                    },
                    {
                        path:"/teacher/paperView/text_q2",
                        name:"text_q2",
                        component:TextQuestions,
                    },
                ]
            }
        ]
    },
    {
        path:"/student",
        name:"student",
        component: StudentLayout
    }

];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
