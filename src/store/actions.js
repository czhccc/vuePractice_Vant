import * as types from './mutation-types'

const actions = {
	// 将商品加入购物车
	addToCart({state, commit}, info) {
		return new Promise((resolve) => {
			// 1.查看该商品是否已经添加到cartList中
			const oldInfo = state.cartList.find(item => item.iid === info.iid)

			// 2.如果该商品已经在购物车中存在, 那么商品数量加1
			if (oldInfo) { // 商品数量+1
				const index = state.cartList.indexOf(oldInfo)
				commit(types.INCREMENT_COUNT, index)
				resolve('当前的商品数量+1')
			} else { // 将商品添加到购物车
				info.count = 1
				info.checked = true
				commit(types.ADD_TO_CART, info)
				resolve('成功添加到购物车')
			}

			resolve()
		})
	},

	// 将商品从购物车移除
	outFromCart({state, commit}, selectedGoodsiid) {
		return new Promise((resolve) => {
			let indexArray = []
			for(let iid of selectedGoodsiid) {
				for (let i in state.cartList) {
					if(state.cartList[i].iid == iid) {
						indexArray.push(i)
					}
				}
			}
			commit(types.OUT_FROM_COUNT, indexArray)
			resolve('已将商品从购物车删除')
		})
		
	}

}

export default actions
