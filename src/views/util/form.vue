<template>
  <basic-container>
    <h3>表单例子</h3>
    <el-row>
      <el-col :span="12">
        <el-form :model="form" ref="formRef1" label-width="110px">
          <el-form-item label="用户名" prop="username" :rules="[{required: true, message: '请输入用户名', trigger: 'blur'}]">
            <el-input type="text" v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
           <el-form-item label="密码" prop="password" :rules="[{required: true, message: '请输入密码', trigger: 'blur'}]">
            <el-input type="text" v-model="form.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
           <el-form-item label="再次输入密码" prop="newpassword" :rules="[{required: true, message: '请再次输入密码', trigger: 'blur'}]">
            <el-input type="text" v-model="form.newpassword" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item label="申请日期" prop="date" :rules="[{required: true, message: '请选择日期', trigger: 'blur'}]">
            <el-date-picker type="date" v-model="form.date" placeholder="请选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
          <el-form-item label="分组" prop="select" :rules="[{required: true, message: '请选择分组', trigger: 'blur'}]">
            <el-select  v-model="form.select" placeholder="请选择分组" style="width:100%">
              <el-option label="分组1" value="1"></el-option>
              <el-option label="分组2" value="2"></el-option>
              <el-option label="分组3" value="3"></el-option>
              <el-option label="分组4" value="4"></el-option>
              <el-option label="分组5" value="5"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="个性签名" prop="textarea">
            <el-input type="textarea" v-model="form.textarea" :rows="4" placeholder="请输入个性签名"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" icon="el-icon-check" size="small" @click="submitForm('formRef1')">提交</el-button>
            <el-button size="small" icon="el-icon-delete" @click="resetForm('formRef1')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <h3>表单例子2</h3>
    <el-form :model="form2"  ref="formRef2" label-width="110px" label-position="top">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="用户名" prop="username" :rules="[{required: true, message: '请输入用户名', trigger: 'blur'}]">
            <el-input type="text" v-model="form.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="密码" prop="password" :rules="[{required: true, message: '请输入密码', trigger: 'blur'}]">
            <el-input type="text" v-model="form.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="16">
        <el-col :span="6">
          <el-form-item label="再次输入密码" prop="newpassword" :rules="[{required: true, message: '请再次输入密码', trigger: 'blur'}]">
            <el-input type="text" v-model="form.newpassword" placeholder="请再次输入密码" show-password></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请日期" prop="date" :rules="[{required: true, message: '请选择日期', trigger: 'blur'}]">
            <el-date-picker type="date" v-model="form.date" placeholder="请选择日期" style="width:100%"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="分组" prop="select" :rules="[{required: true, message: '请选择分组', trigger: 'blur'}]">
            <el-select  v-model="form.select" placeholder="请选择分组" style="width:100%">
              <el-option label="分组1" value="1"></el-option>
              <el-option label="分组2" value="2"></el-option>
              <el-option label="分组3" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="个性签名" prop="textarea">
            <el-input type="textarea" v-model="form.textarea" :rows="4" placeholder="请输入个性签名"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item >
            <el-button type="primary" icon="el-icon-check" size="small" @click="submitForm('formRef2')">提交</el-button>
            <el-button size="small" icon="el-icon-delete" @click="resetForm('formRef2')">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </basic-container>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        form2:{}
      }
    },
    methods:{
      // 清除表单数据，移除校验
      resetForm(formName){
        if(this.$refs[formName]){
          this.$refs[formName].resetFields()
          this.$refs[formName].clearValidate()
        }
      },
      // 提交表单并验证表单数据
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  };
</script>

<style>
</style>
