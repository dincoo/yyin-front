<template>
  <div>
    <basic-container>
      <avue-tabs :option="option"
                 v-model="form"
                 @change="handleChange"
                 @submit="handleSubmit"></avue-tabs>
    </basic-container>
  </div>
</template>

<script>
  import option from "@/const/user/info";
  import {resetPwd,userDetails,ModifyUser} from '@/api/sysManageApi/adminApi'


  export default {
    data() {
      return {
        type: "info",
        option: option,
        form: {}
      };
    },
    created() {
      this.handleWitch();
    },
    methods: {
      handleSubmit() {
        if (this.type === "info") {
          ModifyUser(this.form).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改信息成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
        } else {
          resetPwd(this.form.oldPassword, this.form.newPassword, this.form.newPassword1).then(res => {
            if (res.data.success) {
              this.$message({
                type: "success",
                message: "修改密码成功!"
              });
            } else {
              this.$message({
                type: "error",
                message: res.data.msg
              });
            }
          })
        }
      },
      handleWitch() {
        if (this.type === "info") {
          let userInfo=this.$store.getters.userInfo
          userDetails(userInfo.id).then(res => {
            const user = res.data;
            this.form = {
              id: user.id,
              avatar: user.avatar,
              name: user.username,
              deptName: user.deptName,
              phone: user.mobile,
              email: user.email,
            }
          });
        }
      },
      handleChange(item) {
        this.type = item.prop;
        this.handleWitch();
      }
    }
  };
</script>

<style>
</style>
