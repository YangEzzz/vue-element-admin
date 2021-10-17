<template>
  <div>
    <detail :is-edit="false" :is-data="true" />
  </div>
</template>

<script>
import Detail from '@/views/changeResult/components/detail'
export default {
  components: { Detail }
}
</script>

<style scoped>

</style>
