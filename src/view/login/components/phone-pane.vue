<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="手机号" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="验证码" prop="password">
      <el-input v-model="ruleForm.password" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useUserStore } from '@/store/user'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    let ruleFormRef = ref()
    let ruleForm = reactive({
      username: '',
      password: ''
    })
    let rules = reactive({
      username: [
        {
          required: true,
          message: '请输入账号',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 10,
          message: 'Length should be 6 to 10',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        },
        {
          min: 6,
          max: 10,
          message: 'Length should be 6 to 10',
          trigger: 'blur'
        }
      ]
    })

    const submitForm = () => {
      ruleFormRef.value.validate((valid: any, fields: any) => {
        if (valid) {
          console.log('submit!', ruleForm)
          userStore.accountLogin(ruleForm)
        } else {
          console.log('error submit!', fields)
        }
      })
    }
    return {
      ruleForm,
      rules,
      ruleFormRef,
      submitForm
    }
  }
})
</script>

<style scoped></style>
