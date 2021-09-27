<template>
  <div>
    <ChangeDetail :is-edit="true" />
  </div>
</template>
<script>
import ChangeDetail from '@/views/changeResult/components/ChangeDetail'
export default {
  components: { ChangeDetail }
}
</script>
