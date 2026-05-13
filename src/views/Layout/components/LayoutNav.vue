<template>
   <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="userInfo.token">
          <li><a href="javascript:;"><el-icon style="margin-right: 5px;"><User /></el-icon>{{userInfo.nickname}}</a></li>
          <li>
            <a href="javascript:;" @click="logout">退出登录</a>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore} from '@/stores/userStore'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const { userInfo, clearUserInfo } = useUserStore()
const user = localStorage.getItem('user')
if(user){
  userInfo.value = JSON.parse(user)
}

const logout = () => {
  ElMessageBox.confirm('确认要退出登录吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 清空用户信息
    clearUserInfo()
    // 跳转登录页
    router.push('/login')
  })
}
</script>

<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>