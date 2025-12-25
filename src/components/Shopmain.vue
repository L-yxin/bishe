<template>
    <el-container class="side">
        <el-card class="card" v-for="shop, index in shoplist.shops" :key="index" shadow="hover">
            <el-image :src="shop.path" class="image" :key="index" style="width: 200px; height: 230px"
                alt="Shop Image" />
            <div>
                <p>商品名称: {{ shop.name }}</p>
                <p>价格: ¥{{ shop.price }}</p>
                <p>剩余数量：{{ shop.total }}</p>
            </div>
            <el-icon class="icon" @click="addToCart(shop, index)">
                <CirclePlusFilled />
            </el-icon>
        </el-card>
    </el-container>
</template>
<script setup>
import { CirclePlusFilled } from '@element-plus/icons-vue';
import { useShopListStore } from '../stores/shoplist.js';
const shoplist = useShopListStore()
const model = defineModel({
    type: Array,
    required: true
})

const addToCart = (shop, index) => {

    for (let i = 0; i < shoplist.shops.length; i++) {
        if (shoplist.shops[i].id === shop.id) {
            if (shoplist.shops[i].total <= 0) {
                ElMessage({
                    message: '该商品库存不足！',
                    type: 'warning',
                });
                return
            }else{
                shoplist.shops[i].total -= 1;
            }
        }

    }
    let t = true
    for (let i = 0; i < model.value.length; i++) {
        if (model.value[i].id === shop.id) {
            model.value[i].quantity += 1;
            t = false;
            return;
        }
    }
    if (t) {
        model.value.push({
            ...shop,
            quantity: 1,
        });
        delete model.value[model.value.length-1].total;
    }
}

</script>
<style scoped>
.side {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 5px;
    justify-content: space-around;
    user-select: none;
}

.card {
    width: 230px;
    height: 360px;
    min-width: 230px;
    min-height: 360px;
    position: relative;
    overflow: hidden;
}

:deep(.el-card__body) {
    padding: 10px;
}

p {
    margin: 2px;
}

.icon {
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-size: 28px;
    color: #409EFF;
    cursor: pointer;
}
</style>