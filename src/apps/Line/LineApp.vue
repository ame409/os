<template>
    <div class="line-app" :class="themeClass">
        <!-- 顶部状态栏占位 (适配刘海屏) -->
        <div class="status-bar-placeholder"></div>

        <!-- 内容区域 -->
        <div class="content-area">
            <component :is="currentTabComponent" />
        </div>

        <!-- 底部导航栏 -->
        <div class="bottom-nav">
            <div class="nav-capsule">
                <div 
                    v-for="tab in tabs" 
                    :key="tab.id" 
                    class="nav-item" 
                    :class="{ active: currentTab === tab.id, 'center-item': tab.id === 'moments' }"
                    @click="currentTab = tab.id"
                >
                    <div class="icon" v-html="tab.icon"></div>
                </div>
            </div>
        </div>

        <!-- 底部小白条 -->
        <div class="home-indicator-area" @click="$emit('close')">
            <div class="home-indicator"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ChatList from './views/ChatList.vue';
import Moments from './views/Moments.vue';
import Profile from './views/Profile.vue';

const currentTab = ref('chats');
const themeClass = ref('theme-light'); // 默认浅色主题

const tabs = [
    { 
        id: 'chats', 
        icon: `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>` // 实心聊天气泡
    },
    { 
        id: 'moments', 
        icon: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>` // 实心圆圈加号
    },
    { 
        id: 'profile', 
        icon: `<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` // 实心爱心
    }
];

const currentTabComponent = computed(() => {
    switch (currentTab.value) {
        case 'chats': return ChatList;
        case 'moments': return Moments;
        case 'profile': return Profile;
        default: return ChatList;
    }
});

defineEmits(['close']);
</script>

<style scoped>
.line-app {
    width: 100%; height: 100%;
    background: #ffffff;
    display: flex; flex-direction: column;
    position: relative;
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #000000;
}

.status-bar-placeholder {
    height: max(20px, var(--safe-top));
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(20px);
    position: sticky; top: 0; z-index: 10;
}

.content-area {
    flex: 1;
    overflow-y: auto;
    padding-bottom: calc(90px + max(20px, var(--safe-bottom))); /* 为底部导航留出更多空间 */
}

.bottom-nav {
    position: absolute; bottom: max(30px, var(--safe-bottom));
    left: 0; width: 100%;
    display: flex; justify-content: center;
    pointer-events: none;
    z-index: 100;
}

.nav-capsule {
    pointer-events: auto;
    background: rgba(255, 255, 255, 0.65); /* 增加透明度 */
    backdrop-filter: blur(25px) saturate(180%); /* 增强毛玻璃效果 */
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    border-radius: 40px;
    padding: 12px 30px;
    display: flex; align-items: center; gap: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15); /* 更柔和的阴影 */
    border: 1px solid rgba(255, 255, 255, 0.4);
}

.nav-item {
    display: flex; align-items: center; justify-content: center;
    color: #b0b0b0; /* 未选中颜色 */
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* 弹性动画 */
}

.nav-item.active {
    color: #000000; /* 选中颜色：纯黑 */
    transform: scale(1.1);
}

.nav-item .icon {
    width: 28px; height: 28px;
}

.nav-item.center-item .icon {
    width: 42px; height: 42px; /* 中间图标更大 */
}

.nav-item .icon :deep(svg) {
    width: 100%; height: 100%; fill: currentColor;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.home-indicator-area {
    position: absolute; bottom: 0; left: 0; width: 100%;
    height: max(20px, var(--safe-bottom));
    display: flex; justify-content: center; align-items: flex-end;
    padding-bottom: 8px;
    z-index: 101;
    cursor: pointer;
}

.home-indicator {
    width: 130px; height: 5px;
    background: #000000;
    border-radius: 100px;
    opacity: 0.2;
    transition: opacity 0.3s;
}

.home-indicator-area:hover .home-indicator {
    opacity: 0.5;
}
</style>
