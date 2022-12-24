<template>
<div id="app">



<!--  <img :src="imageUrl" height="150" v-if="imageUrl" alt="tmp"/>-->
<!--  <v-text-field label="Select Image" @click='pickFile' v-model='imageName' prepend-icon="mdi-file-image"></v-text-field>-->
<!--  <input-->
<!--      type="file"-->
<!--      style="display: none"-->
<!--      ref="image"-->
<!--      accept="image/jpeg, image/jpg, image/png"-->
<!--      @change="onFilePicked"-->
<!--  >-->
<v-card
    class="mx-auto"
    width="800"
>
  <v-div style="padding: 10px">
    <v-file-input
        v-model="files"
        color="deep-purple-accent-4"
        counter
        label="File input"
        placeholder="Select your files"
        prepend-icon="mdi-camera"
        variant="outlined"
        :show-size="1000"
    >
      <template v-slot:selection="{ fileNames }">
        <template v-for="(fileName, index) in fileNames" :key="index">
          <v-chip
              color="deep-purple-accent-4"
              label
              size="small"
              class="mr-2"
          >
            {{ fileName }}
          </v-chip>
        </template>
      </template>
    </v-file-input>
    <v-btn
        color="secondary"
        prepend-icon="mdi-cloud-upload"
        @click="testUpload"
    >
      Upload
    </v-btn>
  </v-div>
  <v-img
      :src=imageUrl
      max-height="125"
      cover
      class="bg-grey-lighten-2"
  ></v-img>

  <v-img
      max-height="200"
      src = ""
  >

  </v-img>

</v-card>




</div>
</template>

<script>

import {testSend} from '@/api/index'
import {useStore} from 'vuex'
import {computed} from 'vue'
import {useRouter} from 'vue-router'
import axios from "axios";

export default {
  name: "VueTest",
  data: () => ({
    files: [],
    imageUrl: 'https://picsum.photos/350/165?random',
    imageFile: null,
    imageName: '',
    input:"zerocamera@qq.com",
    userInfo:{
      id:"27469@qq.com"
    },
    result:"",
    radioGroup: [],


  }),
  setup(){
    const store = useStore()
    const router = useRouter()

    let role = computed(() => store.state.user.role)

    function sendImage(data){
      return store.dispatch('uploadImg',data)
    }

    function changeRole(data){
      store.commit("setRole",data)
      console.log(store.state.user.role)
    }

    function JumpInto(){
      console.log('Jump to...')
      router.push({path:'/teacher'})
    }

    return {
      role,
      sendImage,
      changeRole,
      JumpInto
    }
  },
  methods:{
    async testUpload(){
      let formData = new FormData()
      let tmp = ""
      if (this.files.length > 0){
        console.log("files:",this.files[0])
        formData.append('img_file', this.files[0])
        formData.append('img_name', this.files[0].name)
        tmp = await this.sendImage(formData)
        console.log("tmp:",tmp)
        this.imageUrl = tmp
      }

    },


    async getData() {
      // this.$axios.get('/api/')
      // .then(
      //     (response)=>{
      //       console.log(response);
      //       this.data= response.data;
      //     })
      // .catch(
      //     (error)=>{
      //       console.log(error)
      //     })
      console.log(this.role)
      const r = await testSend({email: this.input})
      this.result = r
      console.log(r)
    },
    testMap(){
      var arr = [{id:1},{id:2},{id:3}]
      // var newArray = arr.map(x=>{})
      var newArray = []
      arr.forEach(function(item){
        let x = {}
        x['id'] = item.id
        x['gender'] = 'male'
        newArray.push(x)
      })
      console.log(newArray)
    },
    testOut(){
      console.log(this.radioGroup)
    },
    clear(){
      this.radioGroup=[]
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },

    pickFile() {
      this.$refs.image.click()
    },
    onFilePicked(e) {
      const files = e.target.files
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        if (this.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageUrl = fr.result
          this.imageFile = files[0]
        })
      } else {
        this.imageName = ''
        this.imageFile = ''
        this.imageUrl = ''
      }
    },

    submitForm() {
      let formData = new FormData()
      if (this.files.length > 0){
        console.log("files:",this.files[0])
        formData.append('img_file', this.files[0])
        formData.append('img_name', this.files[0].name)

        axios.post('/api/upload/file', formData)
            .then(res => {
              console.log(res)
            })
            .catch(err => {
              console.log(err)
            })
      }



    }
  },
}
</script>

<style scoped>

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
