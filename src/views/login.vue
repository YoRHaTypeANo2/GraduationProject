<template>
  <div>
    <div class="logdiv">
    <el-button type="info"  center=true @click="open">未登录，请先登录</el-button>
    </div>
  </div>

</template>

<script>
import {mapState} from 'vuex'
import {LOGED} from '../../type/index.js'
  export default{
    name:"login",

  data(){
    return{
      value:false,
      CreatAcount:'',
      CreatPassword:'',
      UploadArr:[],
    };
  },
  computed:{
       ...mapState(["islog"]),
  },
  mounted(){
  },
  methods:{
    open() {
            this.$prompt('请输入账号', '登录',{
              confirmButtonText: '登录',
              cancelButtonText: '注册',
            }).then(({ value }) => {
              if(value === 'a2'){
                this.$message({
                  type: 'success',
                  message: '欢迎回来： ' + value
                });
                this.$store.commit(LOGED,true);
                this.$router.push({name: "center"});
              }else{
                this.$message({
                  type: 'error',
                  message: '请输入正确的账号'
                });
              } 
            }).catch(() => {
              this.$prompt('请输入注册的账号', {
                confirmButtonText: '下一步',
              }).then(({ value }) => {
                this.CreatAcount = value
              }).then(() => {
                this.$prompt('请设置密码',{
                confirmButtonText: '完成注册',
              }).then(({ value }) => {
                this.CreatPassword = value
                let UserInfo = {
                  UserAcount:this.CreatAcount,
                  UserPassword:this.CreatPassword
                }
                this.UploadArr.push(UserInfo)
                console.log(this.UploadArr)
                console.log("hello")
                })
              })
            });
          }
  }
};
</script>

<style scoped>
*{
  margin: 0px;
  padding: 0px;
}
 .el-button{
   position: absolute;
   width: 50%;
   height: 100px;
   top: 40%;
   left: 50%;
   transform: translate(-50%,-50%);
 }

</style>
