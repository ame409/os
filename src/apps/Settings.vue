<template>
    <div class="settings-app">
        
        <!-- API Configuration -->
        <div class="section-title">AI CORE</div>
        <div class="settings-group">
            <div class="setting-item">
                <div class="setting-info">
                    <span class="setting-label">API Endpoint</span>
                </div>
                <input type="text" v-model="settings.apiUrl" placeholder="https://api.openai.com/v1" class="text-input">
            </div>
            <div class="setting-item">
                <div class="setting-info">
                    <span class="setting-label">API Key</span>
                </div>
                <input type="password" v-model="settings.apiKey" placeholder="sk-..." class="text-input">
            </div>
            <div class="setting-item">
                <div class="setting-info">
                    <span class="setting-label">Model</span>
                </div>
                <div class="model-actions">
                    <select v-model="settings.selectedModel" class="model-select" v-if="settings.availableModels.length > 0">
                        <option v-for="model in settings.availableModels" :key="model" :value="model">{{ model }}</option>
                    </select>
                    <button class="fetch-btn" @click="fetchModels">Fetch</button>
                </div>
            </div>
        </div>

        <!-- Model Parameters -->
        <div class="section-title">PARAMETERS</div>
        <div class="settings-group">
            <div class="setting-item">
                <div class="setting-info">
                    <span class="setting-label">Temperature</span>
                    <span class="setting-desc">{{ settings.modelTemperature }}</span>
                </div>
                <div class="slider-container">
                    <input type="range" min="0" max="1" step="0.1" v-model.number="settings.modelTemperature" class="minimal-slider">
                </div>
            </div>
            
            <!-- Presets -->
            <div class="setting-item column">
                <div class="preset-header">
                    <span class="setting-label">Presets</span>
                    <div class="add-preset" @click="promptSavePreset">+</div>
                </div>
                <div class="preset-list" v-if="settings.modelPresets.length > 0">
                    <div class="preset-tag" v-for="(preset, index) in settings.modelPresets" :key="index" @click="loadPreset(preset)">
                        {{ preset.name }}
                        <span class="delete-x" @click.stop="deletePreset(index)">×</span>
                    </div>
                </div>
                <div class="empty-hint" v-else>No presets saved</div>
            </div>
        </div>

        <!-- Voice Service -->
        <div class="section-title">VOICE SERVICE</div>
        <div class="settings-group">
            <div class="setting-item">
                <div class="setting-info">
                    <span class="setting-label">Minimax API Key</span>
                </div>
                <input type="password" v-model="settings.minimaxApiKey" placeholder="Enter key..." class="text-input">
            </div>
        </div>

        <!-- System Integration -->
        <div class="section-title">SYSTEM</div>
        <div class="settings-group">
            <div class="setting-item">
                <div class="setting-info">
                    <span class="setting-label">iOS Notifications</span>
                    <span class="setting-desc">Allow system alerts</span>
                </div>
                <div class="checkbox-wrapper">
                    <input type="checkbox" v-model="settings.enableIosNotifications" @change="handleNotificationToggle">
                    <div class="custom-checkbox"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useSettings } from '../composables/useSettings';

const { 
    settings, 
    initSettings, 
    savePreset, 
    loadPreset, 
    deletePreset,
    fetchModels,
    requestNotificationPermission 
} = useSettings();

const promptSavePreset = () => {
    const name = prompt("Enter preset name:");
    if (name) savePreset(name);
};

const handleNotificationToggle = (e) => {
    if (settings.enableIosNotifications) {
        requestNotificationPermission();
    }
};

onMounted(() => {
    initSettings();
});
</script>

<style scoped>
.settings-app {
    padding: 10px;
    font-family: 'Times New Roman', serif;
}

.section-title {
    margin: 25px 0 10px 10px;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    border-bottom: 1px solid #000;
    padding-bottom: 5px;
    display: inline-block;
}

.settings-group {
    background: white;
    border: 1px solid #000;
    padding: 0 15px;
    box-shadow: 4px 4px 0 rgba(0,0,0,0.05);
    margin-bottom: 20px;
}

.setting-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 15px 0;
    border-bottom: 1px dashed #eee;
}
.setting-item:last-child { border-bottom: none; }
.setting-item.column { flex-direction: column; align-items: flex-start; gap: 10px; }

.setting-info { display: flex; flex-direction: column; }
.setting-label { font-size: 14px; font-weight: bold; }
.setting-desc { font-size: 10px; color: #666; margin-top: 2px; }

.text-input {
    border: none; border-bottom: 1px solid #ccc;
    padding: 5px; font-family: monospace; font-size: 12px;
    width: 150px; outline: none; text-align: right;
    background: transparent;
}
.text-input:focus { border-bottom-color: #000; }

/* Model Actions */
.model-actions { display: flex; align-items: center; gap: 10px; }
.model-select {
    border: 1px solid #ccc; padding: 4px; font-size: 12px; outline: none;
    max-width: 120px;
}
.fetch-btn {
    background: #000; color: white; border: none; padding: 4px 8px;
    font-size: 10px; cursor: pointer;
}
.fetch-btn:active { opacity: 0.8; }

/* Slider */
.slider-container { width: 120px; }
.minimal-slider {
    width: 100%; -webkit-appearance: none; height: 1px; background: #000; outline: none;
}
.minimal-slider::-webkit-slider-thumb {
    -webkit-appearance: none; width: 12px; height: 12px; background: #000; cursor: pointer; border-radius: 50%;
}

/* Presets */
.preset-header { display: flex; justify-content: space-between; width: 100%; align-items: center; }
.add-preset { 
    width: 20px; height: 20px; border: 1px solid #000; 
    display: flex; align-items: center; justify-content: center; 
    cursor: pointer; font-size: 14px; 
}
.preset-list { display: flex; flex-wrap: wrap; gap: 8px; width: 100%; }
.preset-tag {
    border: 1px solid #000; padding: 4px 8px; font-size: 10px;
    cursor: pointer; display: flex; align-items: center; gap: 5px;
    transition: background 0.2s;
}
.preset-tag:hover { background: #f0f0f0; }
.delete-x { font-weight: bold; color: #999; }
.delete-x:hover { color: red; }
.empty-hint { font-size: 10px; color: #999; font-style: italic; }

/* Checkbox */
.checkbox-wrapper { position: relative; width: 16px; height: 16px; }
.checkbox-wrapper input { position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer; z-index: 2; }
.custom-checkbox { width: 100%; height: 100%; border: 1px solid #000; transition: background 0.2s; }
.checkbox-wrapper input:checked + .custom-checkbox { background: #000; }

</style>
