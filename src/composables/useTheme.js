import { reactive, ref, watch, onMounted } from 'vue';

const defaultTheme = {
    wallpaper: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    iconEffect: 'flat',
    iconStyle: 'original',
    customIconColor: '#007aff',
    accentColor: '#007aff', 
    accentColorHex: '#007aff',
    accentOpacity: 1,
    fontData: null,
    fontSize: 16
};

const theme = reactive({ ...defaultTheme });
const isGlassMode = ref(false);
const isSolidMode = ref(false);
const fontName = ref('');

export function useTheme() {
    
    const updateAccentColor = (color) => {
        document.documentElement.style.setProperty('--accent-color', color);
    };

    const updateThemeColor = () => {
        // Combine hex and opacity
        const hex = theme.accentColorHex;
        const alpha = Math.round(theme.accentOpacity * 255).toString(16).padStart(2, '0');
        const finalColor = `${hex}${alpha}`;
        theme.accentColor = finalColor;
        updateAccentColor(finalColor);
    };

    const updateFontSize = (size) => {
        document.documentElement.style.fontSize = `${size}px`;
    };

    const applyFont = (data) => {
        if(!data) return;
        let styleEl = document.getElementById('custom-font-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'custom-font-style';
            document.head.appendChild(styleEl);
        }
        styleEl.innerHTML = `@font-face { font-family: 'CustomFont'; src: url('${data}'); } :root { --global-font: 'CustomFont', sans-serif !important; }`;
    };

    const toggleGlass = () => theme.iconEffect = isGlassMode.value ? 'glass' : 'flat';
    const toggleSolid = () => theme.iconStyle = isSolidMode.value ? 'solid' : 'original';

    const handleWallpaperUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => theme.wallpaper = evt.target.result;
            reader.readAsDataURL(file);
        }
    };

    const resetWallpaper = () => theme.wallpaper = defaultTheme.wallpaper;

    const handleFontUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                theme.fontData = evt.target.result;
                fontName.value = file.name;
                applyFont(theme.fontData);
            };
            reader.readAsDataURL(file);
        }
    };

    const initTheme = () => {
        const savedTheme = localStorage.getItem('ai-phone-theme');
        if (savedTheme) {
            Object.assign(theme, JSON.parse(savedTheme));
            isGlassMode.value = theme.iconEffect === 'glass';
            isSolidMode.value = theme.iconStyle === 'solid';
            if (theme.fontData) {
                applyFont(theme.fontData);
                fontName.value = "已加载自定义字体";
            }
        }
        // Initialize accent color
        if (!theme.accentColorHex) theme.accentColorHex = theme.accentColor.substring(0, 7);
        if (theme.accentOpacity === undefined) theme.accentOpacity = 1;
        
        updateThemeColor();
        if (theme.fontSize) updateFontSize(theme.fontSize);
    };

    // Watch for theme changes
    watch(theme, (newVal) => {
        localStorage.setItem('ai-phone-theme', JSON.stringify(newVal));
        // updateAccentColor is called inside updateThemeColor if needed, 
        // but here we just ensure it's synced if changed directly?
        // Actually, let's just rely on the component calling updateThemeColor or watching specific fields.
        // But for simplicity, let's just update everything.
        updateAccentColor(newVal.accentColor);
        if (newVal.fontSize) updateFontSize(newVal.fontSize);
    }, { deep: true });

    return {
        theme,
        isGlassMode,
        isSolidMode,
        fontName,
        toggleGlass,
        toggleSolid,
        handleWallpaperUpload,
        resetWallpaper,
        handleFontUpload,
        initTheme,
        updateFontSize,
        updateThemeColor
    };
}
