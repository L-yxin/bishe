export const useShoppingCartStore = defineStore('shoppingCart', () => { 
    const cart = ref([])
    return { cart }
})