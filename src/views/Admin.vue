<template>
    <el-container class="base">
        <el-header class="header">
            <div></div>
            <h1>管理员</h1>
            <div class="links">
                <el-link class="back" type="primary" @click="shopListStore.resetShopList()">重置商品列表</el-link>
                <el-link class="back" type="primary" @click="shopListStore.clearShopList()">清空浏览器缓存（H5）</el-link>
                <router-link class="back" type="primary" to="/">退出</router-link>
            </div>
            
        </el-header>
        <el-main class="main">
            <el-row class="shops" v-for="shop in shopList" :key="shop.name">
                <el-col :span="5">
                    <el-image class="shopImg" :src="shop.path" :alt="shop.path"></el-image>
                </el-col>
                <el-col :span="10">
                    <h3>{{ shop.name }}</h3>
                    <el-form class="shopForm">
                         <el-form-item label="价格修改">
                            <el-input type="number" v-model.number="shop.price" min="0" placeholder="请输入价格" @input="val => shop.price = val < 0.1 ? 0.1 : val ==''? 0.1 : val"></el-input>
                        </el-form-item>
                        <el-form-item label="库存修改">
                            <el-input type="number" v-model.number="shop.total" min="0" placeholder="请输入库存" @input="val => shop.total = val < 0 ? 0 : val ==''? 0 : val"></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script setup>
const shopListStore = useShopListStore()
const shopList = computed(() => shopListStore.shops)
</script>
<style scoped>
.shops {
    margin: 10px;
    padding: 5px;
    border: 1px solid #c9c9c9;
    height: 200px;
}

.shopImg {
    height: 170px;
}

.header {
    height: 70px;
    padding: 5px;
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    align-items: center;
    padding: 0 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #c9c9c9;
}

.header>h1 {
    text-align: center;
}

.header>.back {
    text-align: right;
}
.links{
    display: flex;
    flex-direction: row;
    gap: 20px;
}
</style>