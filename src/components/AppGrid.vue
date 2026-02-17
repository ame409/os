<template>
    <div class="app-grid">
        <div class="app-item" v-for="app in apps" :key="app.name" @click="$emit('open-app', app)">
            <div class="app-icon" :class="{ 'glass-mode': theme.iconEffect === 'glass' }" :style="getIconStyle(app)">
                <span v-html="app.icon"></span>
            </div>
            <span class="app-name">{{ app.name }}</span>
        </div>
    </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme';

const props = defineProps({
    apps: {
        type: Array,
        required: true
    }
});

const { theme } = useTheme();

const getIconStyle = (app) => {
    if (theme.iconEffect === 'glass') return { color: theme.iconStyle === 'solid' ? theme.customIconColor : 'white' };
    if (theme.iconStyle === 'solid') return { background: theme.customIconColor, color: 'white' };
    return { background: app.color, color: 'white' };
};
</script>

<style scoped>
.app-grid {
    flex: 1; display: grid; grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: min-content; gap: 20px; padding: 0 20px;
    align-content: start; overflow-y: auto; scrollbar-width: none; 
}
.app-grid::-webkit-scrollbar { display: none; }

.app-item { display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.1s; }
.app-item:active { transform: scale(0.92); opacity: 0.8; }

.app-icon {
    width: var(--icon-size); height: var(--icon-size); border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    color: white; margin-bottom: 6px; position: relative; overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); transition: all 0.3s ease;
}
.app-icon :deep(svg) { width: 30px; height: 30px; fill: currentColor; z-index: 2; }
.app-icon.glass-mode {
    background: rgba(255, 255, 255, 0.25) !important;
    backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.4); box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.app-name {
    font-size: 11px; color: var(--text-color); text-align: center; font-weight: 500;
    text-shadow: 0 1px 4px rgba(255,255,255,0.6);
}
</style>
