<template>
    <div class="moments-view">
        <div class="header">
            <h1 class="title">Moments</h1>
            <div class="actions">
                <div class="icon-btn">
                    <svg viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                </div>
            </div>
        </div>
        
        <div class="moments-list">
            <div class="empty-state">
                <p>No Moments</p>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.moments-view {
    padding: 20px;
}

.header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 20px;
}

.title {
    font-size: 34px; font-weight: 800; color: #000;
    margin: 0; letter-spacing: -0.5px;
}

.actions {
    display: flex; gap: 15px;
}

.icon-btn {
    width: 40px; height: 40px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
}
.icon-btn:hover { background: #e0e0e0; }

.icon-btn svg {
    width: 20px; height: 20px; fill: #000;
}

.empty-state {
    text-align: center;
    color: #8e8e93;
    margin-top: 100px;
}
</style>
