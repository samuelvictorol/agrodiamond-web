<template>
  <q-page class="user-index-page q-pa-md q-pa-lg-xl">
    <div class="page-header q-mb-lg">
      <div class="section-kicker">Área do cliente</div>
      <h1 class="page-title q-ma-none">Minhas notificações</h1>
      <p class="page-description q-mt-sm q-mb-none">
        Aqui o usuário visualiza as notificações enviadas pelo administrador.
      </p>
    </div>

    <div class="notifications-wrapper">
      <div class="row q-col-gutter-lg">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="col-12 col-md-6 col-xl-4"
        >
          <div class="notification-card">
            <div class="notification-top row items-start justify-between no-wrap q-mb-md">
              <div class="notification-meta">
                <div class="notification-category">
                  <q-icon name="mdi-tag-outline" class="q-mr-xs text-gold" />
                  {{ notification.category }}
                </div>
              </div>

              <q-badge rounded class="badge-soft">
                {{ formatDate(notification.updatedAt) }}
              </q-badge>
            </div>

            <h3 class="notification-title">
              {{ notification.title }}
            </h3>

            <p class="notification-preview">
              {{ truncate(notification.description, 100) }}
            </p>

            <div class="q-mt-lg">
              <q-btn
                unelevated
                rounded
                no-caps
                icon="mdi-eye-outline"
                label="Ver detalhes"
                class="btn-gold"
                @click="openDetails(notification)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <q-dialog v-model="detailsDialog">
      <q-card class="custom-dialog">
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="dialog-kicker">Detalhes da notificação</div>
            <div class="text-h6 text-white">
              {{ selectedNotification?.title || 'Notificação' }}
            </div>
          </div>

          <q-btn flat round dense icon="mdi-close" color="grey-5" v-close-popup />
        </q-card-section>

        <q-separator dark />

        <q-card-section v-if="selectedNotification" class="q-gutter-md">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Título</span>
              <span class="detail-value">{{ selectedNotification.title }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Categoria</span>
              <span class="detail-value">{{ selectedNotification.category }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Data de atualização</span>
              <span class="detail-value">{{ formatDate(selectedNotification.updatedAt) }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Origem</span>
              <span class="detail-value">Administração</span>
            </div>

            <div class="detail-item full-span">
              <span class="detail-label">Descrição</span>
              <span class="detail-value">{{ selectedNotification.description }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat no-caps label="Fechar" color="grey-4" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const detailsDialog = ref(false)
const selectedNotification = ref(null)

const notifications = ref([
  {
    id: 1,
    title: 'Campanha aprovada',
    category: 'Marketing',
    updatedAt: '2026-04-09T18:30:00',
    description: 'Sua campanha foi aprovada pelo time administrativo e já está pronta para a próxima etapa de publicação e distribuição.'
  },
  {
    id: 2,
    title: 'Atualização no cronograma do evento',
    category: 'Evento',
    updatedAt: '2026-04-08T15:10:00',
    description: 'O cronograma do evento foi atualizado com novos horários e ajustes operacionais. Confira as informações completas antes da próxima ação.'
  },
  {
    id: 3,
    title: 'Novos materiais disponíveis',
    category: 'Materiais',
    updatedAt: '2026-04-07T11:45:00',
    description: 'Foram disponibilizados novos materiais de apoio, identidade visual e peças promocionais para utilização na campanha ativa.'
  },
  {
    id: 4,
    title: 'Lembrete de alinhamento comercial',
    category: 'Comercial',
    updatedAt: '2026-04-06T09:20:00',
    description: 'Este é um lembrete para revisar os pontos de alinhamento comercial e acompanhar o andamento das próximas estratégias do projeto.'
  }
])

function openDetails(notification) {
  selectedNotification.value = notification
  detailsDialog.value = true
}

function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleString('pt-BR')
}

function truncate(text, limit = 100) {
  if (!text) return ''
  return text.length > limit ? `${text.slice(0, limit)}...` : text
}
</script>

<style scoped>
.user-index-page {
  min-height: 100%;
  background:
    radial-gradient(circle at top right, rgba(190, 149, 59, 0.12), transparent 22%),
    radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.03), transparent 18%),
    #0d0d0d;
  color: #f4f4f4;
}

.section-kicker,
.dialog-kicker {
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.page-title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.1;
  color: #fff;
  font-weight: 800;
}

.page-description {
  color: #b8b8b8;
  line-height: 1.8;
  max-width: 720px;
}

.notification-card {
  height: 100%;
  background: linear-gradient(180deg, rgba(30,30,30,0.92) 0%, rgba(17,17,17,0.96) 100%);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 22px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.24);
  padding: 22px;
  transition: transform 0.25s ease, border-color 0.25s ease;
}

.notification-card:hover {
  transform: translateY(-4px);
  border-color: rgba(212, 175, 55, 0.18);
}

.notification-category {
  display: inline-flex;
  align-items: center;
  color: #d4af37;
  font-size: 0.85rem;
  font-weight: 700;
}

.notification-title {
  color: #fff;
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 10px;
}

.notification-preview {
  color: #bdbdbd;
  line-height: 1.8;
  margin: 0;
}

.badge-soft {
  background: rgba(255,255,255,0.06);
  color: #dcdcdc;
  border: 1px solid rgba(255,255,255,0.08);
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

.text-gold {
  color: #d4af37 !important;
}

.custom-dialog {
  width: min(92vw, 760px);
  background: linear-gradient(180deg, #1c1c1c 0%, #111111 100%);
  color: #fff;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.06);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 14px;
}

.full-span {
  grid-column: 1 / -1;
}

.detail-label {
  color: #d4af37;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.detail-value {
  color: #e6e6e6;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>