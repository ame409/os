<template>
    <div class="chat-list-view">
        <div class="header">
            <h1 class="title">Chats</h1>
            <div class="actions">
                <div class="icon-btn">
                    <svg viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                </div>
                <div class="icon-btn">
                    <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
                </div>
            </div>
        </div>
        
        <div class="chat-items">
            <div class="empty-state">
                <p>No Messages</p>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.chat-list-view {
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
