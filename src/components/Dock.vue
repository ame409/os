<template>
    <div class="dock-container">
        <div class="dock">
            <div class="app-item" v-for="app in apps" :key="app.name" @click="$emit('open-app', app)">
                <div class="app-icon" :class="{ 'glass-mode': theme.iconEffect === 'glass' }" :style="getIconStyle(app)">
                    <span v-html="app.icon"></span>
                </div>
            </div>
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
.dock-container { margin: 0 15px 10px 15px; z-index: 10; }
.dock {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(35px); -webkit-backdrop-filter: blur(35px);
    border-radius: 35px; padding: 18px 20px;
    display: flex; justify-content: space-around; align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

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
.app-name { display: none; }
</style>
