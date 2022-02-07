<template>
	<div v-if="address.length === 0">
		<button @click="connectToMetamask">Connect To Metamask</button>
	</div>
	<div v-else>
		<p>
			Your Address: <b>{{ address }}</b>
			<br />
			Contract Address: <b>{{ nftAddress }}</b>
		</p>

		<br />
		<br />

		<h2>NFT METADATA</h2>
		<hr />

		<br />

		<ul>
			<li>NFT NAME: {{ name }}</li>
			<li>NFT SYMBOL: {{ symbol }}</li>
			<li>NFT SUPPLY: {{ supply }}</li>
		</ul>
		<br />
		<hr />
		<br />
		<button @click="mint">Mint NFT</button>
		<input
			:value="value"
			@input="(event) => (this.value = event.target.value)"
		/>

		<br />
		<br />

		<button @click="getData">Get Contract Metadata</button>

		<br />
		<br />

		<button @click="fetchNFT">Refresh NFTS</button>
		<br />
		<br />
		<hr />
		<br />
		<br />

		<div v-if="nfts.length > 0">
			<div v-for="(nft, key) in nfts" :key="key" class="box">
				<img :src="nft.link" class="boxImage" />
				owner:
				<h3>{{ nft.owner }}</h3>
			</div>
		</div>
		<div v-else>
			<p>0 NFT's minted</p>
		</div>
	</div>
</template>

<script>
import variables from './variables';

import { fetchContractMetadata, mint, fetchNFTS } from './utils';

export default {
	data() {
		return {
			address: '',
			symbol: '',
			name: '',
			supply: '',
			nfts: [],
			value: '',
		};
	},
	methods: {
		async connectToMetamask() {
			const { ethereum } = window;
			if (typeof window.ethereum !== 'undefined') {
				this.address = (
					await ethereum.request({
						method: 'eth_requestAccounts',
					})
				)[0];
			}
		},

		async getData() {
			[this.symbol, this.name, this.supply] =
				await fetchContractMetadata();
		},

		mint() {
			mint(this.address, this.value);
		},

		async fetchNFT() {
			const nfts = await fetchNFTS();
			this.nfts = [...nfts];
		},
	},
	computed: {
		nftAddress() {
			return variables.contractAddress;
		},
	},
};
</script>

<style scoped>
* {
	padding: 0;
	margin: 0;
}

.box {
	width: 750px;
	height: 300px;
	padding: 10px;
	margin: 10px;
}

.boxImage {
	max-width: 300px;
	max-height: 300px;
	float: left;
	padding-right: 20px;
}
</style>
