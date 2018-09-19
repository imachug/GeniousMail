import "./sass/main.sass";

import Vue from "vue/dist/vue.min.js";

import AsyncComputed from "vue-async-computed";
Vue.use(AsyncComputed);

// Components

import Icon from "vue-awesome/components/Icon.vue";
Vue.component("icon", Icon);

import MessageList from "@/vue_components/message-list/message-list.vue";
Vue.component("MessageList", MessageList);

import Message from "@/vue_components/message-list/message.vue";
Vue.component("Message", Message);

import Sidebar from "@/vue_components/sidebar/sidebar.vue";
Vue.component("Sidebar", Sidebar);

import Clearfix from "@/vue_components/clearfix/clearfix.vue";
Vue.component("Clearfix", Clearfix);

Vue.prototype.$eventBus = new Vue();

import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
	state: {
		siteInfo: {
			settings: {
				own: false
			}
		}
	},
	mutations: {
		setSiteInfo(state, siteInfo) {
			state.siteInfo = siteInfo;
		}
	}
});

import root from "./vue_components/root.vue";
var app = new Vue({
	el: "#app",
	render: h => h(root),
	data: {
		currentView: null
	},
	store
});

import {route} from "./route.js";
import {zeroPage} from "./zero";

Vue.prototype.$zeroPage = zeroPage;

(async function() {
	const siteInfo = await zeroPage.getSiteInfo();
	store.commit("setSiteInfo", siteInfo);
	route(app);
	app.$eventBus.$emit("setSiteInfo", siteInfo);
})();
zeroPage.on("setSiteInfo", msg => {
	store.commit("setSiteInfo", msg.params);
	app.$eventBus.$emit("setSiteInfo", msg.params);
});