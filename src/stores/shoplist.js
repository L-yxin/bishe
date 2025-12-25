import { ref } from 'vue'
import { defineStore } from 'pinia'
import img from "../../public/img/img.json"
export const useShopListStore = defineStore('shopList', () => {
  const shops = ref([])
  shops.value.push(...img)
  if (localStorage.getItem('shopList')) {
    shops.value = JSON.parse(localStorage.getItem('shopList'))
  }
  watch(shops, (newShops) => {
    if (newShops.length === 0) {
      localStorage.removeItem('shopList')
    }else {
      localStorage.setItem('shopList', JSON.stringify(newShops))
    }
  }, { deep: true })

  const clearShopList = () => {
    shops.value = []
  }
  const resetShopList = () => {
    shops.value = img
  }
  return {
    shops, clearShopList,resetShopList
  }
})