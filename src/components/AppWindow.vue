<template>
    <div class="app-window" :class="{ open: isOpen }">
        <div class="app-header" v-if="!hideHeader">
            <div class="tab-shape">
                <div class="tab-content">
                    <div class="app-icon" v-if="icon" v-html="icon"></div>
                    <span class="app-title">{{ title }}</span>
                    <div class="close-btn" @click="$emit('close')">
                        <svg viewBox="0 0 24 24" width="12" height="12"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="app-content" :class="{ 'full-height': hideHeader }">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '应用'
    },
    icon: {
        type: String,
        default: ''
    },
    hideHeader: {
        type: Boolean,
        default: false
    }
});

defineEmits(['close']);
</script>

<style scoped>
.app-window {
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: #ffffff; z-index: 100;
    display: flex; flex-direction: column;
    transform: translateY(100%); transition: transform 0.4s cubic-bezier(0.32, 0.72, 0, 1);
}
.app-window.open { transform: translateY(0); }

.app-header {
    padding: max(10px, var(--safe-top)) 10px 0 10px;
    background: #e0e0e0; /* 浏览器顶部背景色 */
    display: flex; align-items: flex-end;
    height: calc(40px + max(10px, var(--safe-top)));
    border-bottom: 1px solid var(--color-border);
}

.tab-shape {
    background: #ffffff;
    border-radius: 10px 10px 0 0;
    padding: 8px 15px;
    display: inline-flex;
    align-items: center;
    min-width: 150px;
    max-width: 240px;
    height: 36px;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.05);
    position: relative;
    margin-bottom: -1px; /* 盖住底边框 */
    border: 1px solid var(--color-border);
    border-bottom: none;
}

.tab-content {
    display: flex; align-items: center; width: 100%; gap: 10px;
}

.app-icon {
    width: 16px; height: 16px;
    display: flex; align-items: center; justify-content: center;
    color: var(--color-text-primary);
}
.app-icon :deep(svg) { width: 100%; height: 100%; fill: currentColor; }

.app-title {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-text-primary);
    flex: 1;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}

.close-btn {
    width: 16px; height: 16px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    color: var(--color-text-secondary);
    transition: all 0.2s;
}
.close-btn:hover {
    background: #ff5f57;
    color: white;
}

.app-content { flex: 1; overflow-y: auto; padding: 20px; padding-bottom: max(40px, var(--safe-bottom)); }
.app-content.full-height { padding: 0; height: 100%; }
</style>
