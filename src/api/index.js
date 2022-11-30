import service from "@/utils/service";


/**
 * @description: 测试
 * @param {*} params
 * @return {*}
 * @author: ET
 */
export function testSend(params){
    return service ({
        url:'/test/sendData',
        method:'get',
        params:params
    })
}




/**
 * @description: 注册
 * @return {*}
 * @author: ET
 */
export function registerCode(params){
    console.log("params",params)
    return service ({
        url:'/register/sendCode',
        method:'get',
        params:params
    })
}

export function registerConfirm(params){
    return service ({
        url:'/register/confirmCode',
        method:'post',
        data:params
    })
}

/**
 * @description: 登陆
 * @return {*}
 * @author: ET
 */
export function loginConfirm(params){
    return service ({
        url:'/login',
        method:'get',
        params:params
    })
}


/**
 * @description: 获取题库信息
 * @return {*}
 * @author: ET
 */
export function getQuestionsSets(){
    return service ({
        url:'/data/AllQuestions',
        method:'get',
    })
}


/**
 * @description: 题目操作
 * @return {*}
 * @author: ET
 */
export function deleteQ(params){
    return service ({
        url:'/data/deleteQ',
        method:'post',
        data:params
    })
}

export function addQ(params){
    return service ({
        url:'/data/addQ',
        method:'post',
        data:params
    })
}

export function modifyQ(params){
    return service ({
        url:'/data/modifyQ',
        method:'post',
        data:params
    })
}


/**
 * @description: 对题库元素遍历处理
 * @return {*}
 * @author: ET
 */
export function setSinQ(arr){
    var sin_q = []
    arr.forEach(function (item){
        // console.log("item.length: ",item.length)
        let x = {}
        x['id'] = item[0]
        x['type'] = item[1]
        x['description'] = item[2]
        x['selection'] = item[3].split(',')
        x['answer'] = item[4]
        x['img_url'] = item[5]

        x['radios'] = ""
        if (item.length > 6){
            x['my_answer'] = item[6]
        }
        else{
            x['my_answer'] = ''
        }
        x['img'] = item[5] !== '';
        x['dialogFormVisible'] = false
        x['star'] = 'black'

        sin_q.push(x)
    })
    return sin_q
}

export function setMulQ(arr){
    var mul_q = []
    arr.forEach(function (item){
        let x = {}
        x['id'] = item[0]
        x['type'] = item[1]
        x['description'] = item[2]
        x['selection'] = item[3].split(',')
        x['answer'] = item[4]
        x['img_url'] = item[5]

        if (item.length > 6){
            x['my_answer'] = item[6]
        }
        else{
            x['my_answer'] = ''
        }
        x['radios'] = ''
        x['radios_tmp'] = []
        x['img'] = item[5] !== '';
        x['dialogFormVisible'] = false
        x['star'] = 'black'
        mul_q.push(x)
    })
    return mul_q
}

export function setJudgeQ(arr){
    var judge_q = []
    arr.forEach(function (item){
        let x = {}
        x['id'] = item[0]
        x['type'] = item[1]
        x['description'] = item[2]
        x['selection'] = ["正确","错误"]
        x['answer'] = item[4]
        x['img_url'] = item[5]
        x['radios'] = ""
        if (item.length > 6){
            x['my_answer'] = item[6]
        }
        else{
            x['my_answer'] = ''
        }
        x['img'] = item[5] !== '';
        x['dialogFormVisible'] = false
        x['star'] = 'black'
        judge_q.push(x)
    })
    return judge_q
}

export function setFillQ(arr){
    var fill_q = []
    arr.forEach(function (item){
        let x = {}
        x['id'] = item[0]
        x['type'] = item[1]
        x['description'] = item[2]
        x['text'] = ""
        x['answer'] = item[4]
        x['img_url'] = item[5]

        if (item.length > 6){
            x['my_answer'] = item[6]
        }
        else{
            x['my_answer'] = ''
        }
        x['img'] = item[5] !== '';
        x['dialogFormVisible'] = false
        x['star'] = 'black'
        fill_q.push(x)
    })
    return fill_q
}

export function setTextQ(arr){
    var text_q = []
    arr.forEach(function (item){
        let x = {}
        x['id'] = item[0]
        x['type'] = item[1]
        x['description'] = item[2]
        x['text'] = ""
        x['answer'] = item[4]
        x['img_url'] = item[5]

        if (item.length > 6){
            x['my_answer'] = item[6]
        }
        else{
            x['my_answer'] = ''
        }
        x['img'] = item[5] !== '';
        x['dialogFormVisible'] = false
        x['star'] = 'black'
        text_q.push(x)
    })
    return text_q
}


/**
 * @description: 获取试卷信息
 * @return {*}
 * @author: ET
 */
export function getPaperList(){
    return service ({
        url:'/data/AllPapers',
        method:'get',
    })
}

/**
 * @description: 组卷提交
 * @return {*}
 * @author: ET
 */
export function postPaper(params){
    return service ({
        url:'/data/makePaper',
        method:'post',
        data:params
    })
}

/**
 * @description: 试卷结果提交
 * @return {*}
 * @author: ET
 */
export function postPaperResult(params){
    return service ({
        url:'/data/postResult',
        method:'post',
        data:params
    })
}


/**
 * @description: 获取作答详情
 * @return {*}
 * @author: ET
 */
export function getPaperResult(params){
    return service ({
        url:'/data/getResultList',
        method:'get',
        params:params
    })
}
