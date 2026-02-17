import { reactive, watch, onMounted } from 'vue';

const defaultSettings = {
    apiUrl: '',
    apiKey: '',
    selectedModel: '',
    availableModels: [],
    modelTemperature: 0.7,
    modelPresets: [], // Array of { name, temperature, ... }
    minimaxApiKey: '',
    enableIosNotifications: false
};

const settings = reactive({ ...defaultSettings });

export function useSettings() {

    const initSettings = () => {
        const saved = localStorage.getItem('ai-phone-settings');
        if (saved) {
            Object.assign(settings, JSON.parse(saved));
        }
    };

    const savePreset = (name) => {
        const newPreset = {
            name,
            temperature: settings.modelTemperature,
            // Add other params here if needed
        };
        settings.modelPresets.push(newPreset);
    };

    const loadPreset = (preset) => {
        settings.modelTemperature = preset.temperature;
    };

    const deletePreset = (index) => {
        settings.modelPresets.splice(index, 1);
    };

    const fetchModels = async () => {
        if (!settings.apiUrl || !settings.apiKey) {
            alert("Please enter API URL and Key first.");
            return;
        }
        try {
            // Ensure URL ends with /v1 or similar if needed, but usually user provides base.
            // Assuming user provides e.g. https://api.openai.com/v1
            // We need to append /models
            let baseUrl = settings.apiUrl.replace(/\/+$/, '');
            const response = await fetch(`${baseUrl}/models`, {
                headers: {
                    'Authorization': `Bearer ${settings.apiKey}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch models');
            const data = await response.json();
            settings.availableModels = data.data.map(m => m.id).sort();
            if (settings.availableModels.length > 0 && !settings.selectedModel) {
                settings.selectedModel = settings.availableModels[0];
            }
            alert(`Fetched ${settings.availableModels.length} models.`);
        } catch (e) {
            alert(`Error: ${e.message}`);
        }
    };

    const requestNotificationPermission = async () => {
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
            settings.enableIosNotifications = false;
            return;
        }

        if (Notification.permission === "granted") {
            settings.enableIosNotifications = true;
        } else if (Notification.permission !== "denied") {
            const permission = await Notification.requestPermission();
            if (permission === "granted") {
                settings.enableIosNotifications = true;
            } else {
                settings.enableIosNotifications = false;
            }
        } else {
            settings.enableIosNotifications = false;
        }
    };

    // Watch for changes and save
    watch(settings, (newVal) => {
        localStorage.setItem('ai-phone-settings', JSON.stringify(newVal));
    }, { deep: true });

    return {
        settings,
        initSettings,
        savePreset,
        loadPreset,
        deletePreset,
        fetchModels,
        requestNotificationPermission
    };
}
