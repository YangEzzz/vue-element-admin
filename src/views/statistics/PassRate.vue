<template>
  <div>
    {{ number1 }}
  </div>
</template>
<script>
import { passRate } from '@/api/student'

export default {
  data() {
    return {
      number1: ''
    }
  },
  mounted() {
    this.getPassRate()
  },
  methods: {
    getPassRate() {
      passRate(1).then(response => {
        const passResult = response.data
        console.log('res', passResult)
        this.number1 = passResult['Math']
      })
    }
  }
}
</script>
