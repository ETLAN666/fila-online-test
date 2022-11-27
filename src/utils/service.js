import axios from "axios"
import {ElMessage} from "element-plus";

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

service.interceptors.request.use((config)=>{
    return config
},(error)=>{
    return Promise.reject(error)
})

service.interceptors.response.use((res)=>{
    const data = res.data
    if (res.status === 200){
        // const code = data.code
        return Promise.resolve(data);
    }
}, (error) => {
    if (error.response.status) {
        switch (error.response.status) {
            case 404:
                ElMessage({
                    type:'error',
                    message:'未找到请求路径！',
                    showClose:true
                })
                break
            case 502:
                ElMessage({
                    type:'error',
                    message:'服务器内部报错！',
                    showClose:true
                })
                break
            default:
                break
        }
    }
    return Promise.reject(error)
})

export default service
