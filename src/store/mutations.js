import * as types from './mutation-types'

const mutations = {
	[types.INCREMENT_COUNT](state, index) { // 商品数量+1
		state.cartList[index].count += 1
	},
	[types.ADD_TO_CART](state, goods) { // 将商品添加到购物车
		goods.checked = true // 是否选中
		state.cartList.push(goods)
	},

	[types.OUT_FROM_COUNT](state, indexArray) { // 将商品移出购物车
		for (let i = indexArray.length-1 ; i >= 0 ; i--) { 
			state.cartList.splice(indexArray[i], 1)
		}
	}
}

export default mutations
