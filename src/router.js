import Goods from './components/Goods.vue'
import Ratings from './components/Ratings.vue'
import Seller from './components/Seller.vue'

export default[
	{
		path:'/goods',
		component:Goods
	},
	{
		path:'/ratings',
		component:Ratings
	},
	{
		path:'/seller',
		component:Seller
	},
	{
		path:'/',
		redirect:'/goods'
	}
]