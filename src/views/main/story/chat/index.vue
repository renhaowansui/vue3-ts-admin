<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="resetForm()">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { addStory } from '@/service/main/story'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const form = ref({
  title: '',
  content: ''
})
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
})

const onSubmit = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: any, fields: any) => {
    if (valid) {
      console.log('onSubmit')
      const { code } = await addStory(form.value)
      if (code === 0) {
        ElMessage.success('创建成功')
        resetForm()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>

<style scoped></style>
