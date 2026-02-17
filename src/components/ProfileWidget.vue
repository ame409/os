<template>
    <div class="profile-widget">
        <div class="profile-info">
            <div class="time-display">{{ currentTime }}</div>
            <div class="date-location">
                <span>{{ currentDate }}</span>
                <span style="opacity: 0.5">|</span>
                <span>{{ location }}</span>
            </div>
            <div class="weather-pill">
                <svg width="16" height="16" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path stroke-width="2" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41"/></svg>
                <span>24°C 晴</span>
            </div>
        </div>
        
        <div class="avatar-container" @click="triggerAvatarUpload">
            <img :src="userAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'" class="avatar-img">
            <div class="avatar-add-icon">+</div>
            <input type="file" ref="avatarInput" accept="image/*" @change="handleAvatarUpload">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const currentTime = ref('12:00');
const currentDate = ref('MON, 1 JAN');
const location = ref('SHANGHAI'); 
const userAvatar = ref(null);
const avatarInput = ref(null);
let timer = null;

const triggerAvatarUpload = () => avatarInput.value.click();

const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
            userAvatar.value = evt.target.result;
            localStorage.setItem('ai-phone-avatar', evt.target.result);
        };
        reader.readAsDataURL(file);
    }
};

const updateTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    currentTime.value = `${hours}:${minutes}`;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    currentDate.value = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`;
};

onMounted(() => {
    const savedAvatar = localStorage.getItem('ai-phone-avatar');
    if (savedAvatar) userAvatar.value = savedAvatar;
    updateTime();
    timer = setInterval(updateTime, 1000);
});

onUnmounted(() => { if (timer) clearInterval(timer); });
</script>

<style scoped>
.profile-widget {
    margin: 10px 20px 15px 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(30px); -webkit-backdrop-filter: blur(30px);
    border-radius: 28px;
    border: 1px solid rgba(255, 255, 255, 0.6);
    box-shadow: 0 10px 40px -10px rgba(0,0,0,0.1);
    display: flex; align-items: center; justify-content: space-between;
    position: relative; overflow: hidden;
}

.profile-info { display: flex; flex-direction: column; justify-content: center; z-index: 2; }

.time-display {
    font-size: 42px; font-weight: 800; line-height: 1; letter-spacing: -1px;
    background: linear-gradient(45deg, #333, #666);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
}

.date-location {
    font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px;
    color: #666; margin-bottom: 12px; display: flex; align-items: center; gap: 5px;
}

.weather-pill {
    display: inline-flex; align-items: center;
    background: #fff; padding: 6px 12px; border-radius: 20px;
    font-size: 13px; font-weight: 600; color: #333;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05); width: fit-content;
}
/* 强制使用 CSS 变量 */
.weather-pill svg { fill: var(--accent-color) !important; stroke: var(--accent-color) !important; transition: fill 0.3s; }
.weather-pill span { margin-left: 5px; }

.avatar-container {
    position: relative; width: 85px; height: 85px; flex-shrink: 0; cursor: pointer;
}
.avatar-img {
    width: 100%; height: 100%; border-radius: 50%; object-fit: cover;
    border: 4px solid rgba(255,255,255,0.8);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15); transition: transform 0.2s;
}
.avatar-container:active .avatar-img { transform: scale(0.95); }

/* 修复：始终显示加号，并使用 CSS 变量 */
.avatar-add-icon {
    position: absolute; bottom: 0; right: 0;
    background: var(--accent-color);
    color: white;
    width: 24px; height: 24px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px; border: 2px solid white;
    pointer-events: none; box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 5; transition: background 0.3s;
}
input[type="file"] { display: none; }
</style>
