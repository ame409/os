<template>
    <div id="wallpaper-layer" :style="{ background: theme.wallpaper.includes('gradient') ? theme.wallpaper : `url(${theme.wallpaper}) center/cover no-repeat` }"></div>

    <!-- 1. 资料卡/天气小组件 -->
    <ProfileWidget />

    <!-- 2. 音乐组件 -->
    <MusicWidget />

    <!-- 3. 应用网格 -->
    <AppGrid :apps="gridApps" @open-app="openApp" />

    <!-- 4. Dock -->
    <Dock :apps="dockApps" @open-app="openApp" />

    <!-- 5. 主题 App 弹窗 -->
    <AppWindow 
        :is-open="currentOpenApp === '主题美化'" 
        title="主题商店" 
        :icon="icons.theme"
        @close="closeApp"
    >
        <ThemeSettings />
    </AppWindow>

    <!-- 6. 设置 App 弹窗 -->
    <AppWindow 
        :is-open="currentOpenApp === '设置'" 
        title="系统设置" 
        :icon="icons.settings"
        @close="closeApp"
    >
        <Settings />
    </AppWindow>

    <!-- 7. 世界书 App 弹窗 -->
    <AppWindow 
        :is-open="currentOpenApp === '世界书'" 
        title="世界书" 
        :icon="icons.book"
        @close="closeApp"
    >
        <WorldBook />
    </AppWindow>

    <!-- 8. Line App 弹窗 -->
    <AppWindow 
        :is-open="currentOpenApp === 'Line'" 
        title="Line" 
        :icon="icons.line"
        :hide-header="true"
        @close="closeApp"
    >
        <LineApp @close="closeApp" />
    </AppWindow>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useTheme } from './composables/useTheme';
import ProfileWidget from './components/ProfileWidget.vue';
import MusicWidget from './components/MusicWidget.vue';
import AppGrid from './components/AppGrid.vue';
import Dock from './components/Dock.vue';
import AppWindow from './components/AppWindow.vue';
import ThemeSettings from './apps/ThemeSettings.vue';
import Settings from './apps/Settings.vue';
import WorldBook from './apps/WorldBook.vue';
import LineApp from './apps/Line/LineApp.vue';

// --- 图标 ---
const icons = {
    game: `<svg viewBox="0 0 24 24"><path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
    x: `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    meetup: `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
    line: `<svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>`,
    book: `<svg viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>`,
    theme: `<svg viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>`,
    settings: `<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.22-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.16 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>`
};

const gridApps = ref([
    { name: '游戏中心', icon: icons.game, color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)' },
    { name: 'X', icon: icons.x, color: '#000000' },
    { name: '线下见面', icon: icons.meetup, color: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)' },
]);

const dockApps = ref([
    { name: 'Line', icon: icons.line, color: '#06c755' },
    { name: '世界书', icon: icons.book, color: 'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)' },
    { name: '主题美化', icon: icons.theme, color: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)' },
    { name: '设置', icon: icons.settings, color: 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)' },
]);

const currentOpenApp = ref(null);
const { theme, initTheme } = useTheme();

const openApp = (app) => {
    if (app.name === '主题美化' || app.name === '设置' || app.name === '世界书' || app.name === 'Line') currentOpenApp.value = app.name;
    else alert(`打开: ${app.name}`);
};

const closeApp = () => currentOpenApp.value = null;

onMounted(() => {
    initTheme();
});
</script>
