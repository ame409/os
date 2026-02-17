<template>
    <div class="profile-view">
        <div class="header">
            <h1 class="title">Profile</h1>
            <div class="actions">
                <div class="icon-btn">
                    <svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.22-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L3.16 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
                </div>
            </div>
        </div>
        
        <div class="profile-content">
            <div class="user-card">
                <div class="avatar"></div>
                <div class="info">
                    <div class="name">User Name</div>
                    <div class="id">ID: user_123456</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.profile-view {
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

.user-card {
    display: flex; align-items: center;
    background: #fff;
    padding: 20px;
    border-radius: 16px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.avatar {
    width: 60px; height: 60px;
    border-radius: 50%;
    background: #e0e0e0;
    margin-right: 15px;
}

.info {
    flex: 1;
}

.name {
    font-size: 18px; font-weight: 600; color: #000;
    margin-bottom: 4px;
}

.id {
    font-size: 14px; color: #8e8e93;
}
</style>
