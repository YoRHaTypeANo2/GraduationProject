<template>
  <div>
    <div class="logdiv">
    <el-button type="info"  center=true @click="open" style="background-color:#409eff;">未登录，请先登录</el-button>
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
      value:false
    };
  },
  computed:{
       ...mapState(["islog"]),
  },
  mounted(){
    let UserArr = this.$store.state.AllUserInfo
    for(let i = 0; i < UserArr.length; i++){
      console.log(UserArr[i].UserAccount,'-----',UserArr[i].UserPassword)
    }
    console.log(this.$store.state.AllUserInfo)
  },
  methods:{
    // 账号注册和登录
    open(){
            let AllInfo = []
            let IsAccount = false
            let IsSetAccount = false
            let CreatAccount = ''
            let CreatPassword = ''
            let CountIndex = 0
            AllInfo = this.$store.state.AllUserInfo
            this.$prompt('请输入账号', '登录',{
              confirmButtonText: '下一步',
              cancelButtonText: '注册',
              // 区分取消与关闭
              distinguishCancelAndClose: true,
            }).then(({ value }) => {
                for(let i = 0; i < AllInfo.length; i++){
                  if(value === AllInfo[i].UserAccount){
                    CountIndex = i
                    IsAccount = true
                  }
                }
                if(!IsAccount || !value){
                  this.$message({
                  type: 'error',
                  message: '请输入正确的账号'
                  });
                }else{
                  this.$prompt('请输入密码', {
                    confirmButtonText: '登录',
                  }).then(({ value }) => {
                    if(value === AllInfo[CountIndex].UserPassword){
                      this.$message({
                        type: 'success',
                        message: '登录成功，欢迎回来：' + AllInfo[CountIndex].UserAccount
                      })
                      this.$store.commit(LOGED,true)
                      this.$router.push('/center')
                    }else{
                      this.$message({
                        type: 'error',
                        message: '请输入正确的密码'
                      })
                    }
                  })
                } 
            }).catch(action => {
              if(action === 'cancel'){
                this.$prompt('请输入注册的账号', {
                  confirmButtonText: '下一步',
                }).then(({ value }) => {
                  if(!value){
                    this.$message({
                      type: 'error',
                      message: '账号不能为空',
                    })
                  }else{
                    CreatAccount = value
                    IsSetAccount = true
                  }
                }).then(() => {
                  if(IsSetAccount){
                    this.$prompt('请设置密码',{
                      confirmButtonText: '完成注册',
                    }).then(({ value }) => {
                      if(!value){
                        this.$message({
                          type: 'error',
                          message: '密码不能为空'
                        })
                      }else{
                        CreatPassword = value
                        let NewUserInfo = {
                        UserAccount:CreatAccount,
                        UserPassword:CreatPassword
                      }
                      this.$store.commit('UpLoadAccount',NewUserInfo)
                      this.$message({
                        type: 'success',
                        message: '注册成功'
                      })
                      // 用户数据上传至本地
                      let LocalUserInfo = []
                      let NowInfo = this.$store.state.AllUserInfo
                      for(let i = 0; i < NowInfo.length; i++){
                          let SingleInfo = [NowInfo[i].UserAccount,NowInfo[i].UserPassword]
                          LocalUserInfo.push(SingleInfo)
                      }
                      localStorage.setItem('UserInfo',LocalUserInfo)
                    }
                  })
                }
              })
            }
        })
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
