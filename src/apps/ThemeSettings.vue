<template>
    <div class="magazine-layout">
        
        <!-- 1. 封面大图 (Wallpaper Cover) -->
        <div class="cover-section" @click="triggerWallpaperUpload">
            <div class="cover-image" :style="{ background: theme.wallpaper.includes('gradient') ? theme.wallpaper : `url(${theme.wallpaper}) center/cover no-repeat` }">
                <div class="cover-overlay">
                    <span class="cover-text">ISSUE 01</span>
                    <h1 class="magazine-title">STYLE<br>EDIT.</h1>
                    <div class="tap-hint">TAP TO CHANGE COVER</div>
                </div>
            </div>
            <input type="file" ref="wallpaperInput" accept="image/*" @change="handleWallpaperUpload" style="display:none">
        </div>

        <!-- 2. 拼贴控制区 (Collage Controls) -->
        <div class="controls-collage">
            
            <!-- 色彩贴纸 -->
            <div class="sticker color-sticker">
                <div class="sticker-label">ACCENT</div>
                <div class="color-row">
                    <div class="color-display" :style="{ background: theme.accentColor }">
                        <input type="color" class="hidden-picker" v-model="theme.accentColorHex" @input="updateThemeColor">
                    </div>
                    <div class="opacity-control">
                        <input type="range" min="0" max="1" step="0.01" v-model.number="theme.accentOpacity" @input="updateThemeColor" class="opacity-slider">
                        <span class="opacity-val">{{ Math.round(theme.accentOpacity * 100) }}%</span>
                    </div>
                </div>
                <div class="sticker-deco">#{{ theme.accentColorHex.slice(1).toUpperCase() }}</div>
            </div>

            <!-- 字体贴纸 -->
            <div class="sticker font-sticker">
                <div class="sticker-header">
                    <span>TYPOGRAPHY</span>
                    <span class="font-size-val">{{ theme.fontSize }}px</span>
                </div>
                <div class="ruler-slider">
                    <input type="range" min="12" max="24" step="1" v-model.number="theme.fontSize" class="minimal-slider">
                    <div class="ruler-marks">
                        <span v-for="i in 7" :key="i">|</span>
                    </div>
                </div>
                <div class="font-actions">
                    <label class="text-btn">
                        IMPORT FONT
                        <input type="file" accept=".ttf,.woff,.woff2" @change="handleFontUpload" style="display:none">
                    </label>
                    <span class="current-font">{{ fontName || 'SYSTEM' }}</span>
                </div>
            </div>

            <!-- 风格开关贴纸 -->
            <div class="sticker style-sticker">
                <div class="sticker-label">EFFECTS</div>
                <div class="toggle-row">
                    <span>GLASS</span>
                    <div class="checkbox-wrapper">
                        <input type="checkbox" v-model="isGlassMode" @change="toggleGlass">
                        <div class="custom-checkbox"></div>
                    </div>
                </div>
                <div class="toggle-row">
                    <span>SOLID</span>
                    <div class="checkbox-wrapper">
                        <input type="checkbox" v-model="isSolidMode" @change="toggleSolid">
                        <div class="custom-checkbox"></div>
                    </div>
                </div>
                <div class="icon-color-row" v-if="isSolidMode">
                    <span>ICON COLOR</span>
                    <input type="color" v-model="theme.customIconColor" class="mini-picker">
                </div>
            </div>

            <!-- 恢复默认 -->
            <div class="sticker reset-sticker" @click="resetWallpaper">
                RESET DEFAULT
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useTheme } from '../composables/useTheme';

const { 
    theme, 
    isGlassMode, 
    isSolidMode, 
    fontName, 
    toggleGlass, 
    toggleSolid, 
    handleWallpaperUpload, 
    resetWallpaper, 
    handleFontUpload,
    updateThemeColor
} = useTheme();

const wallpaperInput = ref(null);
const triggerWallpaperUpload = () => wallpaperInput.value.click();
</script>

<style scoped>
.magazine-layout {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-family: 'Times New Roman', serif; /* 杂志感衬线体 */
}

/* --- 封面区域 --- */
.cover-section {
    width: 100%;
    height: 400px;
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease;
}
.cover-section:active { transform: scale(0.98); }

.cover-image {
    width: 100%; height: 100%;
    border: 1px solid #000; /* 日系细边框 */
    position: relative;
    overflow: hidden;
}

.cover-overlay {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.1);
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    color: white;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.cover-text {
    font-size: 12px;
    letter-spacing: 2px;
    border-bottom: 1px solid white;
    padding-bottom: 5px;
    align-self: flex-start;
}

.magazine-title {
    font-size: 64px;
    line-height: 0.9;
    font-weight: 900;
    font-style: italic;
    margin: 0;
    position: absolute;
    bottom: 60px; left: 10px;
    mix-blend-mode: overlay; /* 混合模式增强时尚感 */
}

.tap-hint {
    position: absolute;
    bottom: 20px; right: 20px;
    font-size: 10px;
    border: 1px solid white;
    padding: 4px 8px;
    border-radius: 20px;
    background: rgba(255,255,255,0.2);
    backdrop-filter: blur(5px);
}

/* --- 拼贴控制区 --- */
.controls-collage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    padding-bottom: 40px;
}

/* 通用贴纸样式 */
.sticker {
    background: white;
    border: 1px solid #000;
    padding: 15px;
    position: relative;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.1);
    transition: transform 0.2s;
}
.sticker:hover { transform: translateY(-2px); }

.sticker-label {
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 1px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
}

/* 色彩贴纸 */
.color-sticker {
    grid-column: 1 / 2;
    display: flex; flex-direction: column; align-items: center;
    transform: rotate(-2deg); /* 不对称美学 */
}
.color-row {
    display: flex; align-items: center; gap: 10px; width: 100%;
}
.color-display {
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 1px solid #000;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    flex-shrink: 0;
}
.hidden-picker {
    position: absolute; top: -10px; left: -10px; width: 200%; height: 200%;
    opacity: 0; cursor: pointer;
}
.opacity-control {
    flex: 1; display: flex; flex-direction: column; align-items: center;
}
.opacity-slider {
    width: 100%; height: 2px; background: #000; -webkit-appearance: none; outline: none;
}
.opacity-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 10px; height: 10px; background: #000; border-radius: 50%; cursor: pointer;
}
.opacity-val { font-size: 8px; margin-top: 2px; }

.sticker-deco {
    margin-top: 8px;
    font-family: monospace;
    font-size: 12px;
}

/* 字体贴纸 */
.font-sticker {
    grid-column: 1 / 3; /* 跨两列 */
    background: #f5f5f5;
}
.sticker-header {
    display: flex; justify-content: space-between;
    margin-bottom: 15px;
    font-size: 12px; font-weight: bold;
}
.ruler-slider {
    position: relative;
    margin: 20px 0;
}
.minimal-slider {
    width: 100%;
    -webkit-appearance: none;
    height: 1px;
    background: #000;
    outline: none;
}
.minimal-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px; height: 20px;
    background: #000;
    cursor: pointer;
}
.ruler-marks {
    display: flex; justify-content: space-between;
    margin-top: 5px;
    color: #999;
    font-size: 8px;
}
.font-actions {
    display: flex; justify-content: space-between; align-items: center;
    margin-top: 15px;
}
.text-btn {
    font-size: 10px;
    text-decoration: underline;
    cursor: pointer;
}
.current-font {
    font-size: 10px;
    font-style: italic;
    color: #666;
}

/* 风格贴纸 */
.style-sticker {
    grid-column: 2 / 3;
    transform: rotate(1deg);
}
.toggle-row {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 10px;
    font-size: 12px;
}
.checkbox-wrapper {
    position: relative;
    width: 16px; height: 16px;
}
.checkbox-wrapper input {
    position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer;
    z-index: 2;
}
.custom-checkbox {
    width: 100%; height: 100%;
    border: 1px solid #000;
    transition: background 0.2s;
}
.checkbox-wrapper input:checked + .custom-checkbox {
    background: #000;
}
.icon-color-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 10px; margin-top: 10px; border-top: 1px dashed #ccc; padding-top: 5px;
}
.mini-picker {
    width: 20px; height: 20px; border: 1px solid #000; padding: 0;
}

/* 重置贴纸 */
.reset-sticker {
    grid-column: 1 / 3;
    text-align: center;
    background: #000;
    color: white;
    font-size: 12px;
    letter-spacing: 3px;
    cursor: pointer;
    border: none;
}
.reset-sticker:active { opacity: 0.8; }

</style>
