<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

interface Bot {
	_id: string;
	name: string;
	templateMessage?: string; // Cho phép templateMessage là string hoặc undefined
}

interface UseBot {
	_id: string; // <-- ID của bản ghi use-bot
	bot: {
		_id: string;
		name: string;
		templateMessage?: string;
	};
	templateMessage: string;
	user: string;
}
const toast = useToast();
const maxLength = 15500;
const text = ref('');
const charCount = computed(() => `${text.value.length}/${maxLength}`);

const bots = ref<Bot[]>([]);
const selectedBotId = ref<string>(''); // Khởi tạo rỗng
const useBotDataRaw = ref<UseBot[]>([]);
const urlServer = import.meta.env.VITE_URL_SERVER

onMounted(async () => {
	const role = localStorage.getItem('role');
	const email = localStorage.getItem('email');
	if (!email) return;

	if (role === 'admin') {
		let useBotData: UseBot[] = [];
		let adminBotData: Bot[] = [];

		// Gọi API lấy list-use-bot
		try {
			const response = await axios.post(`http://${urlServer}/list-use-bot`, { email });
			useBotData = Array.isArray(response.data.data) ? response.data.data : [];
			useBotDataRaw.value = useBotData;
		} catch (error) {
			console.warn('Lỗi khi gọi list-use-bot');
		}

		// Gọi API lấy list-bot-admin
		try {
			const response = await axios.get(`http://${urlServer}/list-bot-admin`);
			adminBotData = Array.isArray(response.data) ? response.data : [];
		} catch (error) {
			console.warn('Lỗi khi gọi list-bot-admin');
		}

		// Lấy danh sách bots đã sử dụng từ UseBot, lấy template từ UseBot
		const usedBots: Bot[] = useBotData.map(u => {
			// Kiểm tra sự tồn tại của u.bot và lấy dữ liệu
			const bot = u.bot ? {
				_id: u.bot._id,
				name: u.bot.name,
				templateMessage: u.templateMessage || u.bot.templateMessage, // Nếu không có template trong UseBot thì lấy từ bot
			} : null;

			return bot;
		}).filter(bot => bot !== null); // Lọc bỏ những bot không hợp lệ (null)

		// Lọc bot admin mà chưa có trong useBotData
		const usedBotIds = useBotData.map(u => u.bot._id);
		const newBots = adminBotData.filter(adminBot => !usedBotIds.includes(adminBot._id));

		// Cập nhật danh sách bots
		bots.value = [...usedBots, ...newBots];
	} else {
		// Người dùng bình thường, lấy danh sách use-bot
		try {
			const response = await axios.post(`http://${urlServer}/list-use-bot`, { email });
			const useBotData: UseBot[] = Array.isArray(response.data) ? response.data : [];
			useBotDataRaw.value = useBotData;
			bots.value = useBotData.map(u => ({
				_id: u.bot._id,
				name: u.bot.name,
				templateMessage: u.templateMessage || u.bot.templateMessage, // Nếu không có template trong UseBot thì lấy từ bot
			}));
		} catch (error) {
			console.error('Lỗi khi lấy dữ liệu:', error);
		}
	}
});

const addTemplate = async () => {
	const email = localStorage.getItem('email');
	if (!selectedBotId.value) return alert('Vui lòng chọn một Bot!');

	// Tìm bản ghi useBot theo bot._id
	const existingUseBot = useBotDataRaw.value.find(u => u.bot._id === selectedBotId.value);
	try {
		if (existingUseBot && existingUseBot._id) {
			// Nếu đã tồn tại bản ghi => cập nhật
			const respone = await axios.put(`http://${urlServer}/update-use-bot/` + existingUseBot._id, {
				templateMessage: text.value,
			});
			const findData = useBotDataRaw.value.findIndex(x => x._id === respone.data._id)

			useBotDataRaw.value[findData] = respone.data
			toast.success('Cập nhật thành công!', {
				position: 'top-right',
				duration: 3000
			});
		} else {
			// Nếu chưa có => thêm mới
			const respone = await axios.post(`http://${urlServer}/registerUseBot`, {
				botId: selectedBotId.value,
				templateMessage: text.value,
				email
			});

			const findData = useBotDataRaw.value.findIndex(x => x.bot._id === respone.data._id)
			// Cập nhật lại danh sách bots sau khi thêm mới
			useBotDataRaw.value[findData] = respone.data
			toast.success('Thêm mới thành công và đang training AI!', {
				position: 'top-right',
				duration: 3000
			});
		}
	} catch (error) {
		toast.error('Lỗi khi lưu dữ liệu!', {
			position: 'top-right',
			duration: 3000
		});
	}
};

// Cập nhật templateMessage khi người dùng chọn bot
watch(selectedBotId, (newId) => {
	const selectedBot = bots.value.find(bot => bot._id === newId);
	if (selectedBot) {
		text.value = selectedBot.templateMessage || ''; // Nếu templateMessage là undefined, gán là chuỗi rỗng
	} else {
		text.value = ''; // Nếu không tìm thấy bot, gán là chuỗi rỗng
	}
});
</script>

<template>
	<div class="pb-10 pt-10 min-h-[calc(100vh-5rem)]">
		<div class="lg:px-10">
			<div class="bg-white p-8 flex flex-col rounded-md shadow gap-3">
				<h1 class="card-title">Cấu hình nội dung</h1>

				<select class="select" v-model="selectedBotId">
					<option disabled value="">Chọn 1 Bot AI</option>
					<!-- Duyệt qua danh sách bots và hiển thị tên bot -->
					<option v-for="bot in bots" :key="bot._id" :value="bot._id">
						{{ bot.name }}
					</option>
				</select>

				<div class="form-control">
					<label class="label mb-3">
						<span>Số ký tự : </span>
						<span class="text-sm opacity-80">{{ charCount }}</span>
					</label>
					<textarea class="textarea textarea-bordered w-full" rows="9" v-model="text"></textarea>
				</div>

				<div class="border-t border-dashed space-x-5 flex px-2 py-5 mt-3">
					<button class="btn btn-success" @click="addTemplate">
						Lưu và training AI
					</button>
				</div>
			</div>
		</div>
	</div>
</template>




<style>
.select {
	color: black;
	width: fit-content !important;
}

.textarea {
	background-color: var(--color-white);
	border: var(--border) solid #0000;
	border-color: #1A1A20;
	color: black;
}
</style>