<script setup>
const shoplist = useShopListStore()
const shoppingCart = useShoppingCartStore().cart
const resetCart = () => {
    while (shoppingCart.length > 0) {
        let shop = shoppingCart.pop();
        let index = shoplist.shops.findIndex(item => item.id === shop.id);
        if (index !== -1) {
            shoplist.shops[index].total += shop.quantity;
        }
    }
}
const totalPrice = computed(() => {
    return shoppingCart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
});
const settlement = () => {
    if (totalPrice.value <= 0) {
        ElMessage({
            message: '请选择商品！',
            type: 'warning',
        });
        return;
    }
    ElMessage.closeAll()
    router.push({
        path: '/settlement',
    });
}
const handleBeforeUnload = (event) => {
  if (shoppingCart.length > 0) {
    event.preventDefault()
    event.returnValue = '购物车中有商品，刷新页面将自动退货。确定要刷新吗？'
  }
}

const handleUnload = () => {
  // 在页面卸载时，如果购物车不为空，则执行退货
  if (shoppingCart.length > 0) {
    resetCart()
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('unload', handleUnload)
})

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
  window.removeEventListener('unload', handleUnload)
})
</script>
<template>
    <el-container class="base">
        <el-container class="left-main">
            <el-header class="header">
                    <router-link to="/admin">管理员登录</router-link>
                </el-header>
            <el-main class="main">
                <Shopmain v-model="shoppingCart" />
            </el-main>
        </el-container>
        <el-aside class="aside">
            <Shopcart class="shopcart" v-model="shoppingCart" />
            <el-footer class="footer">
                <el-button type="default" class="reset" @click="resetCart">重选</el-button>
                <el-button type="primary" class="settlement" @click="settlement">去结算¥{{ totalPrice }}</el-button>
            </el-footer>
        </el-aside>
    </el-container>
</template>

<style scoped>
.header{
    height: 24px;
    text-align: right;
    font-size: 16px;
    border-bottom: 1px solid #c9c9c9;
    padding: 0;
}
.base {
    height: 100vh;
}

.left-main {
    width: 30%;
}

.main {
    height: 100%;
}

.shopcart {
    height: 90%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: scroll;
}

.footer {
    height: 10%;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    gap: 10px;
    justify-content: center;
    align-items: center;
    border-top: 1px solid #6b6b6b;
}

.aside {
    width: 30%;
    min-width: 240px;
    background-color: #d3dce6;
    position: relative;

}

.reset {
    width: 20%;
    height: 55%;
    min-width: 70px;
    min-height: 40px;

}

.settlement {
    width: 60%;
    height: 55%;
    min-width: 150px;
    min-height: 40px;
}

</style>
