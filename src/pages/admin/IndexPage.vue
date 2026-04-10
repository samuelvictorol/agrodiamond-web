<template>
  <q-page class="dashboard-page q-pa-md q-pa-lg-xl">
    <div class="page-header q-mb-lg">
      <div class="row items-center justify-between q-col-gutter-md">
        <div class="col-12 col-md">
          <div class="section-kicker">Visão geral</div>
          <h1 class="page-title q-ma-none">Dashboard</h1>
          <p class="page-description q-mt-sm q-mb-none">
            Acompanhe clientes cadastrados, ações enviadas por cliente e as últimas notificações no mesmo padrão visual do painel.
          </p>
        </div>

        <div class="col-12 col-md-auto">
          <q-btn
            unelevated
            rounded
            no-caps
            icon="mdi-bell-plus-outline"
            label="Adicionar notificação"
            class="btn-gold full-width full-width-sm-auto"
            @click="openCreateNotificationDialog"
          />
        </div>
      </div>
    </div>

    <!-- KPIs -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-sm-6 col-lg-3">
        <div class="kpi-card">
          <div class="kpi-icon-wrap">
            <q-icon name="mdi-account-group-outline" size="28px" class="text-gold" />
          </div>
          <div class="kpi-label">Clientes cadastrados</div>
          <div class="kpi-value">{{ clients.length }}</div>
          <div class="kpi-helper">Base mockada pronta para integração</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <div class="kpi-card">
          <div class="kpi-icon-wrap">
            <q-icon name="mdi-send-check-outline" size="28px" class="text-gold" />
          </div>
          <div class="kpi-label">Ações enviadas</div>
          <div class="kpi-value">{{ totalActions }}</div>
          <div class="kpi-helper">Somatório por cliente</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <div class="kpi-card">
          <div class="kpi-icon-wrap">
            <q-icon name="mdi-bell-outline" size="28px" class="text-gold" />
          </div>
          <div class="kpi-label">Notificações</div>
          <div class="kpi-value">{{ notifications.length }}</div>
          <div class="kpi-helper">Listagem local em frontend</div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-3">
        <div class="kpi-card">
          <div class="kpi-icon-wrap">
            <q-icon name="mdi-account-check-outline" size="28px" class="text-gold" />
          </div>
          <div class="kpi-label">Clientes ativos</div>
          <div class="kpi-value">{{ activeClients }}</div>
          <div class="kpi-helper">Status ativo no cadastro</div>
        </div>
      </div>
    </div>

    <!-- CHART + RESUMO -->
    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-12 col-xl-8">
        <div class="panel-card q-pa-md">
          <div class="row items-center justify-between q-mb-md">
            <div>
              <div class="card-kicker">Performance por cliente</div>
              <div class="card-title">Ações enviadas por cliente</div>
            </div>

            <div class="chart-badge">
              <q-icon name="mdi-chart-bar" class="q-mr-xs text-gold" />
              {{ clients.length }} clientes
            </div>
          </div>

          <div class="chart-wrap">
            <apexchart
              type="bar"
              height="360"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-4">
        <div class="panel-card q-pa-md full-height">
          <div class="card-kicker">Resumo rápido</div>
          <div class="card-title q-mb-md">Visão operacional</div>

          <div class="mini-stat-list">
            <div class="mini-stat-item">
              <div class="mini-stat-left">
                <q-icon name="mdi-account-multiple-outline" class="text-gold" />
                <span>Base de clientes</span>
              </div>
              <strong>{{ clients.length }}</strong>
            </div>

            <div class="mini-stat-item">
              <div class="mini-stat-left">
                <q-icon name="mdi-email-fast-outline" class="text-gold" />
                <span>Total de ações</span>
              </div>
              <strong>{{ totalActions }}</strong>
            </div>

            <div class="mini-stat-item">
              <div class="mini-stat-left">
                <q-icon name="mdi-bell-badge-outline" class="text-gold" />
                <span>Última notificação</span>
              </div>
              <strong>{{ latestNotificationTitle }}</strong>
            </div>

            <div class="mini-stat-item">
              <div class="mini-stat-left">
                <q-icon name="mdi-map-marker-outline" class="text-gold" />
                <span>Cidades únicas</span>
              </div>
              <strong>{{ uniqueCities }}</strong>
            </div>
          </div>

          <q-separator dark class="separator-gold q-my-lg" />

          <div class="text-grey-4 text-body2">
            Estrutura pronta para receber dados vindos de API, integrar notificações reais e alimentar métricas de dashboard.
          </div>
        </div>
      </div>
    </div>

    <!-- CRUD NOTIFICAÇÕES -->
    <div class="panel-card q-pa-md">
      <div class="row items-center justify-between q-col-gutter-md q-mb-md">
        <div class="col-12 col-md">
          <div class="card-kicker">Central de notificações</div>
          <div class="card-title">Últimas notificações</div>
        </div>

        <div class="col-12 col-md-auto">
          <q-input
            v-model="notificationSearch"
            dense
            outlined
            clearable
            color="amber-8"
            label="Pesquisar notificação"
            class="search-input search-input-sm"
          >
            <template #prepend>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </div>
      </div>

      <q-table
        flat
        bordered
        dark
        row-key="id"
        :rows="filteredNotifications"
        :columns="notificationColumns"
        :pagination="notificationsPagination"
        class="notifications-table"
      >
        <template #body-cell-clientName="props">
          <q-td :props="props">
            <div class="text-weight-medium">{{ props.row.clientName }}</div>
            <div class="text-caption text-grey-5">{{ props.row.clientEmail }}</div>
          </q-td>
        </template>

        <template #body-cell-createdAt="props">
          <q-td :props="props">
            {{ formatDateTime(props.row.createdAt) }}
          </q-td>
        </template>

        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              rounded
              :class="props.row.status === 'Enviada' ? 'badge-success' : 'badge-warning'"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="row no-wrap q-gutter-sm justify-end">
              <q-btn
                flat
                round
                dense
                icon="mdi-eye-outline"
                class="action-btn"
                @click="viewNotification(props.row)"
              >
                <q-tooltip>Visualizar</q-tooltip>
              </q-btn>

              <q-btn
                flat
                round
                dense
                icon="mdi-pencil-outline"
                class="action-btn"
                @click="editNotification(props.row)"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>

              <q-btn
                flat
                round
                dense
                icon="mdi-delete-outline"
                class="action-btn action-btn-danger"
                @click="confirmDeleteNotification(props.row)"
              >
                <q-tooltip>Deletar</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <template #no-data>
          <div class="full-width row flex-center q-pa-xl text-grey-5">
            <q-icon name="mdi-bell-off-outline" size="34px" class="q-mr-sm" />
            Nenhuma notificação encontrada.
          </div>
        </template>
      </q-table>
    </div>

    <!-- DIALOG VISUALIZAR NOTIFICAÇÃO -->
    <q-dialog v-model="viewDialog">
      <q-card class="custom-dialog">
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="dialog-kicker">Detalhes da notificação</div>
            <div class="text-h6 text-white">{{ selectedNotification?.title || 'Notificação' }}</div>
          </div>

          <q-btn flat round dense icon="mdi-close" color="grey-5" v-close-popup />
        </q-card-section>

        <q-separator dark />

        <q-card-section v-if="selectedNotification" class="q-gutter-md">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Cliente</span>
              <span class="detail-value">{{ selectedNotification.clientName }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">E-mail</span>
              <span class="detail-value">{{ selectedNotification.clientEmail }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Título</span>
              <span class="detail-value">{{ selectedNotification.title }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Status</span>
              <span class="detail-value">{{ selectedNotification.status }}</span>
            </div>

            <div class="detail-item full-span">
              <span class="detail-label">Mensagem</span>
              <span class="detail-value">{{ selectedNotification.message }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Criado em</span>
              <span class="detail-value">{{ formatDateTime(selectedNotification.createdAt) }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat no-caps label="Fechar" color="grey-4" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DIALOG NOVA / EDITAR NOTIFICAÇÃO -->
    <q-dialog v-model="notificationDialog" persistent>
      <q-card class="custom-dialog custom-dialog-lg">
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="dialog-kicker">
              {{ formMode === 'edit' ? 'Editar notificação' : 'Nova notificação' }}
            </div>
            <div class="text-h6 text-white">
              {{ formMode === 'edit' ? 'Atualizar notificação' : 'Adicionar notificação' }}
            </div>
          </div>

          <q-btn flat round dense icon="mdi-close" color="grey-5" @click="closeNotificationDialog" />
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-select
                v-model="notificationForm.clientId"
                :options="clientOptions"
                emit-value
                map-options
                outlined
                dense
                label="Selecionar cliente"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                v-model="notificationForm.status"
                :options="notificationStatusOptions"
                outlined
                dense
                label="Status"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="notificationForm.title"
                outlined
                dense
                label="Título da notificação"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="notificationForm.message"
                outlined
                dense
                type="textarea"
                autogrow
                label="Mensagem"
                color="amber-8"
                class="form-input"
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn
            flat
            no-caps
            label="Cancelar"
            color="grey-4"
            @click="closeNotificationDialog"
          />

          <q-btn
            unelevated
            rounded
            no-caps
            icon="mdi-content-save-outline"
            :label="formMode === 'edit' ? 'Salvar alterações' : 'Salvar notificação'"
            class="btn-gold"
            @click="saveNotification"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Dialog, Notify } from 'quasar'
import VueApexCharts from 'vue3-apexcharts'

// registrar localmente no <script setup>
const apexchart = VueApexCharts

const clients = ref([
  {
    id: 1,
    name: 'Samuel Victor',
    email: 'samuel@agrodiamond.com',
    city: 'Brasília - DF',
    status: 'Ativo',
    actionsSent: 18
  },
  {
    id: 2,
    name: 'Mariana Alves',
    email: 'mariana.alves@email.com',
    city: 'Uberaba - MG',
    status: 'Ativo',
    actionsSent: 12
  },
  {
    id: 3,
    name: 'Rafael Nogueira',
    email: 'rafael.nogueira@email.com',
    city: 'Ribeirão Preto - SP',
    status: 'Inativo',
    actionsSent: 5
  },
  {
    id: 4,
    name: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    city: 'Goiânia - GO',
    status: 'Ativo',
    actionsSent: 9
  },
  {
    id: 5,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    city: 'Belo Horizonte - MG',
    status: 'Ativo',
    actionsSent: 14
  },
  {
    id: 6,
    name: 'Juliana Prado',
    email: 'juliana.prado@email.com',
    city: 'Rio Verde - GO',
    status: 'Inativo',
    actionsSent: 4
  }
])

const notifications = ref([
  {
    id: 1,
    clientId: 1,
    clientName: 'Samuel Victor',
    clientEmail: 'samuel@agrodiamond.com',
    title: 'Campanha aprovada',
    message: 'Sua campanha premium foi aprovada e está pronta para publicação.',
    status: 'Enviada',
    createdAt: '2026-04-09T18:40:00'
  },
  {
    id: 2,
    clientId: 2,
    clientName: 'Mariana Alves',
    clientEmail: 'mariana.alves@email.com',
    title: 'Confirmação de evento',
    message: 'A programação do evento foi confirmada para publicação no painel.',
    status: 'Rascunho',
    createdAt: '2026-04-09T17:30:00'
  },
  {
    id: 3,
    clientId: 4,
    clientName: 'Fernanda Costa',
    clientEmail: 'fernanda.costa@email.com',
    title: 'Atualização de materiais',
    message: 'Os materiais de divulgação foram atualizados com a nova identidade visual.',
    status: 'Enviada',
    createdAt: '2026-04-09T15:10:00'
  },
  {
    id: 4,
    clientId: 5,
    clientName: 'Carlos Mendes',
    clientEmail: 'carlos.mendes@email.com',
    title: 'Lembrete comercial',
    message: 'Entraremos em contato para alinhamento da próxima ação promocional.',
    status: 'Enviada',
    createdAt: '2026-04-08T21:20:00'
  }
])

const notificationSearch = ref('')
const viewDialog = ref(false)
const notificationDialog = ref(false)
const selectedNotification = ref(null)
const editingNotificationId = ref(null)
const formMode = ref('create')

const notificationStatusOptions = ['Enviada', 'Rascunho']

const createNotificationInitialState = () => ({
  clientId: null,
  title: '',
  message: '',
  status: 'Rascunho'
})

const notificationForm = ref(createNotificationInitialState())

const notificationColumns = [
  {
    name: 'title',
    label: 'Título',
    align: 'left',
    field: 'title',
    sortable: true
  },
  {
    name: 'clientName',
    label: 'Cliente',
    align: 'left',
    field: 'clientName',
    sortable: true
  },
  {
    name: 'status',
    label: 'Status',
    align: 'center',
    field: 'status',
    sortable: true
  },
  {
    name: 'createdAt',
    label: 'Criado em',
    align: 'center',
    field: 'createdAt',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'right',
    field: 'actions'
  }
]

const notificationsPagination = ref({
  sortBy: 'createdAt',
  descending: true,
  page: 1,
  rowsPerPage: 5
})

const clientOptions = computed(() =>
  clients.value.map(client => ({
    label: `${client.name} - ${client.email}`,
    value: client.id
  }))
)

const filteredNotifications = computed(() => {
  const term = notificationSearch.value.trim().toLowerCase()
  if (!term) return notifications.value

  return notifications.value.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.clientName.toLowerCase().includes(term) ||
    item.clientEmail.toLowerCase().includes(term) ||
    item.status.toLowerCase().includes(term) ||
    item.message.toLowerCase().includes(term)
  )
})

const totalActions = computed(() =>
  clients.value.reduce((total, client) => total + (client.actionsSent || 0), 0)
)

const activeClients = computed(() =>
  clients.value.filter(client => client.status === 'Ativo').length
)

const uniqueCities = computed(() =>
  new Set(clients.value.map(client => client.city)).size
)

const latestNotificationTitle = computed(() =>
  notifications.value.length ? notifications.value[0].title : '-'
)

const chartSeries = computed(() => [
  {
    name: 'Ações enviadas',
    data: clients.value.map(client => client.actionsSent)
  }
])

const chartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    background: 'transparent',
    foreColor: '#d7d7d7'
  },
  theme: {
    mode: 'dark'
  },
  plotOptions: {
    bar: {
      borderRadius: 6,
      horizontal: false,
      columnWidth: '48%'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: false
  },
  xaxis: {
    categories: clients.value.map(client => client.name),
    labels: {
      style: {
        colors: '#bcbcbc',
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#bcbcbc'
      }
    }
  },
  grid: {
    borderColor: 'rgba(255,255,255,0.08)'
  },
  legend: {
    labels: {
      colors: '#d7d7d7'
    }
  },
  tooltip: {
    theme: 'dark'
  },
  colors: ['#d4af37']
}))

function formatDateTime(date) {
  if (!date) return '-'
  return new Date(date).toLocaleString('pt-BR')
}

function getClientById(clientId) {
  return clients.value.find(client => client.id === clientId) || null
}

function openCreateNotificationDialog() {
  formMode.value = 'create'
  editingNotificationId.value = null
  notificationForm.value = createNotificationInitialState()
  notificationDialog.value = true
}

function closeNotificationDialog() {
  notificationDialog.value = false
  editingNotificationId.value = null
  formMode.value = 'create'
  notificationForm.value = createNotificationInitialState()
}

function viewNotification(notification) {
  selectedNotification.value = notification
  viewDialog.value = true
}

function editNotification(notification) {
  formMode.value = 'edit'
  editingNotificationId.value = notification.id
  notificationForm.value = {
    clientId: notification.clientId,
    title: notification.title,
    message: notification.message,
    status: notification.status
  }
  notificationDialog.value = true
}

function saveNotification() {
  const { clientId, title, message, status } = notificationForm.value

  if (!clientId || !title || !message) {
    Notify.create({
      type: 'warning',
      message: 'Preencha cliente, título e mensagem.',
      position: 'top-right'
    })
    return
  }

  const client = getClientById(clientId)
  if (!client) {
    Notify.create({
      type: 'negative',
      message: 'Cliente selecionado não encontrado.',
      position: 'top-right'
    })
    return
  }

  if (formMode.value === 'edit' && editingNotificationId.value) {
    notifications.value = notifications.value.map(item =>
      item.id === editingNotificationId.value
        ? {
            ...item,
            clientId: client.id,
            clientName: client.name,
            clientEmail: client.email,
            title,
            message,
            status
          }
        : item
    )

    Notify.create({
      type: 'positive',
      message: 'Notificação atualizada com sucesso.',
      position: 'top-right'
    })
  } else {
    const newNotification = {
      id: Date.now(),
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email,
      title,
      message,
      status,
      createdAt: new Date().toISOString()
    }

    notifications.value = [newNotification, ...notifications.value]

    Notify.create({
      type: 'positive',
      message: 'Notificação adicionada com sucesso.',
      position: 'top-right'
    })
  }

  closeNotificationDialog()
}

function confirmDeleteNotification(notification) {
  Dialog.create({
    title: 'Confirmar exclusão',
    message: `Deseja realmente deletar a notificação "${notification.title}"?`,
    cancel: {
      flat: true,
      label: 'Cancelar',
      color: 'grey-5',
      noCaps: true
    },
    ok: {
      unelevated: true,
      label: 'Deletar',
      color: 'negative',
      noCaps: true
    },
    persistent: true
  }).onOk(() => {
    notifications.value = notifications.value.filter(item => item.id !== notification.id)

    Notify.create({
      type: 'positive',
      message: 'Notificação deletada com sucesso.',
      position: 'top-right'
    })
  })
}
</script>

<style scoped>
.dashboard-page {
  min-height: 100%;
  background:
    radial-gradient(circle at top right, rgba(190, 149, 59, 0.12), transparent 22%),
    radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.03), transparent 18%),
    #0d0d0d;
  color: #f4f4f4;
}

.section-kicker,
.card-kicker,
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
  max-width: 760px;
}

.card-title {
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
}

.kpi-card,
.panel-card {
  background: linear-gradient(180deg, rgba(30,30,30,0.92) 0%, rgba(17,17,17,0.96) 100%);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 22px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.24);
}

.kpi-card {
  padding: 20px;
  height: 100%;
}

.kpi-icon-wrap {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(212, 175, 55, 0.08);
  border: 1px solid rgba(212, 175, 55, 0.15);
  margin-bottom: 16px;
}

.kpi-label {
  color: #bcbcbc;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

.kpi-value {
  color: #fff;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
}

.kpi-helper {
  color: #8f8f8f;
  font-size: 0.85rem;
}

.panel-card {
  overflow: hidden;
}

.full-height {
  height: 100%;
}

.chart-wrap {
  width: 100%;
}

.chart-badge {
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  border-radius: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  color: #d6d6d6;
}

.mini-stat-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mini-stat-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 14px 16px;
  color: #dfdfdf;
}

.mini-stat-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.separator-gold {
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent);
  height: 1px;
  border: none;
}

.notifications-table {
  background: transparent;
  color: #f1f1f1;
}

.notifications-table :deep(.q-table) {
  background: transparent;
}

.notifications-table :deep(thead tr th) {
  background: rgba(255,255,255,0.03);
  color: #d4af37;
  font-weight: 700;
  border-color: rgba(255,255,255,0.05);
}

.notifications-table :deep(tbody tr:hover) {
  background: rgba(255,255,255,0.03);
}

.notifications-table :deep(td),
.notifications-table :deep(th) {
  border-color: rgba(255,255,255,0.05);
}

.notifications-table :deep(.q-table__bottom) {
  background: transparent;
  color: #d0d0d0;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.search-input :deep(.q-field__control),
.form-input :deep(.q-field__control) {
  background: rgba(255,255,255,0.03);
  border-radius: 14px;
}

.search-input-sm {
  min-width: 280px;
}

.badge-success {
  background: rgba(46, 125, 50, 0.18);
  color: #8be28f;
  border: 1px solid rgba(76, 175, 80, 0.25);
}

.badge-warning {
  background: rgba(255, 193, 7, 0.14);
  color: #f2cd62;
  border: 1px solid rgba(255, 193, 7, 0.24);
}

.action-btn {
  color: #d4af37;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
}

.action-btn-danger {
  color: #ff8a80;
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

.custom-dialog {
  width: min(92vw, 720px);
  background: linear-gradient(180deg, #1c1c1c 0%, #111111 100%);
  color: #fff;
  border-radius: 22px;
  border: 1px solid rgba(255,255,255,0.06);
}

.custom-dialog-lg {
  width: min(94vw, 900px);
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

.text-gold {
  color: #d4af37 !important;
}

@media (max-width: 1024px) {
  .search-input-sm {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }

  .full-width-sm-auto {
    width: 100%;
  }
}
</style>