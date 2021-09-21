<template>
  <div>
    <div class="roleText1">
      <span v-for="item in roles" :key="item" style="line-height: 150px" class="pan-info-roles">你的角色是：{{ item }}</span>
    </div>
    <div class="roleText2">
      <span style="line-height: 150px">功能介绍</span>
    </div>
  </div>

<!--<span style="font-size: 1px;bottom: 0px;right: 0;position: absolute;">-->
<!--  @YangEzzz制作 有问题添加微信YangEzzzz-->
<!--</span>-->

<!--  <div class="dashboard-editor-container">-->
<!--    <div class=" clearfix">-->
<!--      <pan-thumb :image="avatar" style="float: left">-->
<!--        Your roles:-->
<!--        <span v-for="item in roles" :key="item" class="pan-info-roles">{{ item }}</span>-->
<!--      </pan-thumb>-->
<!--      <github-corner style="position: absolute; top: 0px; border: 0; right: 0;" />-->
<!--      <div class="info-container">-->
<!--        <span class="display_name">{{ name }}</span>-->
<!--        <span style="font-size:20px;padding-top:20px;display:inline-block;">Editor's Dashboard</span>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
  <!--    <div>-->
  <!--      <img :src="emptyGif" class="emptyGif">-->
  <!--    </div>-->
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'
/*eslint-disable*/
export default {
  name: 'DashboardEditor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .roleText1 {
    border: #8887 outset 3px ;
    border-radius: 5px;
    text-align: center;
    position: absolute;
    left: 20%;
    top: 20px;
    height: 150px;
    width: 200px;
  }
  .roleText1:hover {
    box-shadow: 6px 6px 5px #8888;
  }

  .roleText2 {
    border: #8887 outset 3px ;
    border-radius: 5px;
    text-align: center;
    position: absolute;
    right: 20%;
    top: 20px;
    height: 150px;
    width: 200px;
  }
  .roleText2:hover {
    box-shadow: 6px 6px 5px #8888;
  }

  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
