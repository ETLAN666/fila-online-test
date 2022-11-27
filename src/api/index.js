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
