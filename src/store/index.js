// @ts-ignore
import { createStore } from 'vuex';

export const store =  createStore({
	state() {
		return {
			pageLoading: false
		}
	},
	mutations: {
		/**
		 * 
		 * @param {any} state 
		 * @param {boolean} status 
		 */
		setPageLoading(state, status) {
			state.pageLoading = status;
		}
	},
	getters: {
		/**
		  * 
		  * @param {any} state 
		  * @returns 
		  */
		getPageLoading(state) {
			return state.pageLoading;
		}
	}
});