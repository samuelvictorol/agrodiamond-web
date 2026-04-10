<template>
    <q-layout view="hHh lpR fFf" class="admin-layout">
        <q-header class="admin-header text-white">
            <q-toolbar class="q-px-md q-py-sm">
                <div class="row items-center justify-between full-width no-wrap">
                    <div class="row items-center no-wrap">
                        <div class="brand-wrap row items-center no-wrap">
                            <q-icon name="mdi-diamond-stone" size="28px" class="text-gold q-mr-sm" />
                            <div>
                                <div class="brand-name">agrodiamond</div>
                                <div class="brand-subtitle">Painel administrativo</div>
                            </div>
                        </div>
                    </div>

                    <div class="row items-center no-wrap q-gutter-sm">
                        <q-btn flat round dense icon="mdi-menu" class="text-white" @click="toggleRightDrawer" />
                    </div>
                </div>
            </q-toolbar>
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" :width="290"
            class="admin-drawer text-white bg-dark">
            <div class="drawer-content column fit">
                <div class="drawer-top q-pa-md">
                    <div class="drawer-brand row items-center no-wrap q-mb-lg">
                        <q-icon name="mdi-diamond-stone" size="26px" class="text-gold q-mr-sm" />
                        <div>
                            <div class="brand-name">agrodiamond</div>
                            <div class="brand-subtitle">Gestão interna</div>
                        </div>
                    </div>

                    <q-list padding class="menu-list">
                        <q-item clickable v-ripple class="menu-item" :active="isActive('/admin')"
                            active-class="menu-item-active" @click="goTo('/admin')">
                            <q-item-section avatar>
                                <q-icon name="mdi-bell-outline" />
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>Início</q-item-label>
                                <q-item-label caption class="text-grey-5">
                                    Central de ações
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item clickable v-ripple class="menu-item" :active="isActive('/admin/clientes')"
                            active-class="menu-item-active" @click="goTo('/admin/clientes')">
                            <q-item-section avatar>
                                <q-icon name="mdi-account-group-outline" />
                            </q-item-section>

                            <q-item-section>
                                <q-item-label>Cliente</q-item-label>
                                <q-item-label caption class="text-grey-5">
                                    Gestão de clientes
                                </q-item-label>
                            </q-item-section>
                        </q-item>


                    </q-list>
                </div>

                <div class="drawer-bottom q-pa-md">
                    <q-separator dark class="separator-gold q-mb-md" />

                    <q-btn unelevated no-caps rounded icon="mdi-logout" label="Logout" class="btn-gold full-width"
                        @click="logout" />
                </div>
            </div>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const rightDrawerOpen = ref(false)

const router = useRouter()
const route = useRoute()

function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value
}

function goTo(path) {
    router.push(path)
    rightDrawerOpen.value = false
}

function isActive(path) {
    return route.path === path || route.path.startsWith(`${path}/`)
}

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

.admin-layout {
    background:
        radial-gradient(circle at top right, rgba(190, 149, 59, 0.12), transparent 22%),
        radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.03), transparent 18%),
        #0d0d0d;
    color: #f4f4f4;
    font-family: 'Inter', sans-serif;
}

.admin-header {
    background: rgba(14, 14, 14, 0.78);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(255, 215, 128, 0.12);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.24);
}

.admin-drawer, .bg-dark {
    background: linear-gradient(180deg, #171717 0%, #101010 100%)!important;
    border-left: 1px solid rgba(255, 255, 255, 0.06);
}

.drawer-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
}

.drawer-top {
    flex: 1;
}

.brand-wrap,
.drawer-brand {
    min-width: 0;
}

.brand-name {
    font-family: 'Cinzel', serif;
    font-size: 1.08rem;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: lowercase;
    color: #fff;
}

.brand-subtitle {
    font-size: 0.72rem;
    color: #b9b9b9;
    line-height: 1.2;
}

.text-gold {
    color: #d4af37 !important;
}

.menu-list {
    padding-top: 0;
}

.menu-item {
    border-radius: 16px;
    margin-bottom: 8px;
    color: #dddddd;
    transition: all 0.25s ease;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.02);
}

.menu-item:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(212, 175, 55, 0.12);
}

.menu-item-active {
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.14) 0%, rgba(184, 138, 28, 0.08) 100%);
    border: 1px solid rgba(212, 175, 55, 0.24);
    color: #fff;
}

.btn-gold {
    background: linear-gradient(135deg, #d4af37 0%, #b88a1c 100%);
    color: #141414;
    font-weight: 800;
    letter-spacing: 0.2px;
    box-shadow: 0 12px 28px rgba(212, 175, 55, 0.22);
}

.btn-gold:hover {
    filter: brightness(1.05);
}

.separator-gold {
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent);
    height: 1px;
    border: none;
}

@media (max-width: 768px) {
    .brand-subtitle {
        max-width: 160px;
    }
}
</style>