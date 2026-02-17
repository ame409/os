<template>
    <div class="music-widget">
        <div class="album-art">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
        </div>
        <div class="music-info">
            <div class="music-title">Cyber Dreams</div>
            <div class="music-artist">AI Composer</div>
        </div>
        <div style="opacity: 0.5">
            <svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5v14l11-7z"/></svg>
        </div>
        <div class="music-progress-container">
            <div class="music-progress-bar"></div>
        </div>
    </div>
</template>

<style scoped>
.music-widget {
    margin: 0 20px 20px 20px;
    padding: 12px 15px;
    background: var(--glass-bg);
    backdrop-filter: var(--glass-blur); -webkit-backdrop-filter: var(--glass-blur);
    border-radius: 20px; border: var(--glass-border);
    display: flex; align-items: center; flex-wrap: wrap;
    box-shadow: var(--glass-shadow);
}
.album-art {
    width: 42px; height: 42px;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4);
    border-radius: 10px; display: flex; align-items: center; justify-content: center;
    margin-right: 12px; color: white;
}
.music-info { flex: 1; overflow: hidden; }
.music-title { font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.music-artist { font-size: 11px; opacity: 0.6; }

.music-progress-container {
    width: 100%; height: 3px; background: rgba(0,0,0,0.05);
    margin-top: 10px; border-radius: 2px; overflow: hidden;
}
.music-progress-bar {
    width: 40%; height: 100%;
    background: var(--accent-color);
    border-radius: 2px; transition: background 0.3s;
}
</style>
