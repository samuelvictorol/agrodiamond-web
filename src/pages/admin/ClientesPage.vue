<template>
  <q-page class="clients-page q-pa-md q-pa-lg-xl">
    <div class="page-header q-mb-lg">
      <div class="row items-center justify-between q-col-gutter-md">
        <div class="col-12 col-md">
          <div class="section-kicker">Gestão de clientes</div>
          <h1 class="page-title q-ma-none">Clientes</h1>
          <p class="page-description q-mt-sm q-mb-none">
            Gerencie seus clientes, visualize detalhes e prepare o fluxo para integração com o backend.
          </p>
        </div>

        <div class="col-12 col-md-auto">
          <q-btn
            unelevated
            rounded
            no-caps
            icon="mdi-plus"
            label="Adicionar novo cliente"
            class="btn-gold full-width full-width-sm-auto"
            @click="openCreateDialog"
          />
        </div>
      </div>
    </div>

    <div class="filters-card q-mb-md">
      <div class="row q-col-gutter-md items-center">
        <div class="col-12 col-md-8">
          <q-input
            v-model="search"
            dense
            outlined
            clearable
            color="amber-8"
            label="Pesquisar cliente por nome, e-mail, telefone ou cidade"
            bg-color="transparent"
            class="search-input"
          >
            <template #prepend>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-4">
          <div class="results-badge">
            <q-icon name="mdi-account-group-outline" class="q-mr-sm text-gold" />
            {{ filteredClients.length }} cliente(s) encontrado(s)
          </div>
        </div>
      </div>
    </div>

    <div class="table-card">
      <q-table
        flat
        bordered
        :rows="filteredClients"
        :columns="columns"
        row-key="id"
        :pagination="pagination"
        class="clients-table"
        dark
        separator="horizontal"
      >
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-badge
              rounded
              :class="props.row.status === 'Ativo' ? 'badge-success' : 'badge-warning'"
            >
              {{ props.row.status }}
            </q-badge>
          </q-td>
        </template>

        <template #body-cell-createdAt="props">
          <q-td :props="props">
            {{ formatDate(props.row.createdAt) }}
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <div class="row no-wrap q-gutter-sm">
              <q-btn
                flat
                round
                dense
                icon="mdi-eye-outline"
                class="action-btn"
                @click="viewClient(props.row)"
              >
                <q-tooltip>Visualizar cliente</q-tooltip>
              </q-btn>

              <q-btn
                flat
                round
                dense
                icon="mdi-delete-outline"
                class="action-btn action-btn-danger"
                @click="confirmDelete(props.row)"
              >
                <q-tooltip>Deletar cliente</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>

        <template #no-data>
          <div class="full-width row flex-center q-pa-xl text-grey-5">
            <q-icon name="mdi-database-search-outline" size="34px" class="q-mr-sm" />
            Nenhum cliente encontrado.
          </div>
        </template>
      </q-table>
    </div>

    <!-- DIALOG VISUALIZAR -->
    <q-dialog v-model="viewDialog">
      <q-card class="custom-dialog">
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="dialog-kicker">Detalhes do cliente</div>
            <div class="text-h6 text-white">{{ selectedClient?.name || 'Cliente' }}</div>
          </div>

          <q-btn flat round dense icon="mdi-close" color="grey-5" v-close-popup />
        </q-card-section>

        <q-separator dark />

        <q-card-section v-if="selectedClient" class="q-gutter-md">
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Nome</span>
              <span class="detail-value">{{ selectedClient.name }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">E-mail</span>
              <span class="detail-value">{{ selectedClient.email }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Telefone</span>
              <span class="detail-value">{{ selectedClient.phone }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Empresa</span>
              <span class="detail-value">{{ selectedClient.company }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Cidade</span>
              <span class="detail-value">{{ selectedClient.city }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Status</span>
              <span class="detail-value">{{ selectedClient.status }}</span>
            </div>

            <div class="detail-item full-span">
              <span class="detail-label">Observações</span>
              <span class="detail-value">{{ selectedClient.notes }}</span>
            </div>

            <div class="detail-item">
              <span class="detail-label">Criado em</span>
              <span class="detail-value">{{ formatDate(selectedClient.createdAt) }}</span>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat no-caps label="Fechar" color="grey-4" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- DIALOG NOVO CLIENTE -->
    <q-dialog v-model="createDialog" persistent>
      <q-card class="custom-dialog custom-dialog-lg">
        <q-card-section class="row items-center justify-between">
          <div>
            <div class="dialog-kicker">Novo cliente</div>
            <div class="text-h6 text-white">Cadastrar cliente</div>
          </div>

          <q-btn flat round dense icon="mdi-close" color="grey-5" @click="closeCreateDialog" />
        </q-card-section>

        <q-separator dark />

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-input
                v-model="form.name"
                outlined
                dense
                label="Nome"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.email"
                outlined
                dense
                label="E-mail"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.phone"
                outlined
                dense
                label="Telefone"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.company"
                outlined
                dense
                label="Empresa"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-input
                v-model="form.city"
                outlined
                dense
                label="Cidade"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12 col-md-6">
              <q-select
                v-model="form.status"
                :options="statusOptions"
                outlined
                dense
                label="Status"
                color="amber-8"
                class="form-input"
              />
            </div>

            <div class="col-12">
              <q-input
                v-model="form.notes"
                outlined
                dense
                type="textarea"
                autogrow
                label="Observações"
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
            @click="closeCreateDialog"
          />

          <q-btn
            unelevated
            rounded
            no-caps
            icon="mdi-content-save-outline"
            label="Salvar cliente"
            class="btn-gold"
            @click="saveClient"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Dialog, Notify } from 'quasar'

const search = ref('')
const viewDialog = ref(false)
const createDialog = ref(false)
const selectedClient = ref(null)

const statusOptions = ['Ativo', 'Inativo']

const formInitialState = () => ({
  name: '',
  email: '',
  phone: '',
  company: '',
  city: '',
  status: 'Ativo',
  notes: ''
})

const form = ref(formInitialState())

const clients = ref([
  {
    id: 1,
    name: 'Samuel Victor',
    email: 'samuel@agrodiamond.com',
    phone: '(61) 98174-8795',
    company: 'AgroDiamond',
    city: 'Brasília - DF',
    status: 'Ativo',
    notes: 'Cliente premium com foco em marketing de leilão.',
    createdAt: '2026-04-01'
  },
  {
    id: 2,
    name: 'Mariana Alves',
    email: 'mariana.alves@email.com',
    phone: '(34) 99911-2233',
    company: 'Tabapuã Select',
    city: 'Uberaba - MG',
    status: 'Ativo',
    notes: 'Interessada em campanhas para Expozebu.',
    createdAt: '2026-04-03'
  },
  {
    id: 3,
    name: 'Rafael Nogueira',
    email: 'rafael.nogueira@email.com',
    phone: '(11) 98888-7766',
    company: 'Nogueira Rural',
    city: 'Ribeirão Preto - SP',
    status: 'Inativo',
    notes: 'Aguardando retorno comercial.',
    createdAt: '2026-04-04'
  },
  {
    id: 4,
    name: 'Fernanda Costa',
    email: 'fernanda.costa@email.com',
    phone: '(62) 99123-5555',
    company: 'Elite Agro',
    city: 'Goiânia - GO',
    status: 'Ativo',
    notes: 'Cliente recorrente de ações digitais.',
    createdAt: '2026-04-06'
  },
  {
    id: 5,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@email.com',
    phone: '(31) 99777-1212',
    company: 'Mendes Pecuária',
    city: 'Belo Horizonte - MG',
    status: 'Ativo',
    notes: 'Solicitou proposta para branding.',
    createdAt: '2026-04-07'
  },
  {
    id: 6,
    name: 'Juliana Prado',
    email: 'juliana.prado@email.com',
    phone: '(64) 99222-7878',
    company: 'Prado Genetics',
    city: 'Rio Verde - GO',
    status: 'Inativo',
    notes: 'Lead em pausa.',
    createdAt: '2026-04-08'
  }
])

const columns = [
  {
    name: 'name',
    label: 'Cliente',
    align: 'left',
    field: 'name',
    sortable: true
  },
  {
    name: 'email',
    label: 'E-mail',
    align: 'left',
    field: 'email',
    sortable: true
  },
  {
    name: 'phone',
    label: 'Telefone',
    align: 'left',
    field: 'phone',
    sortable: false
  },
  {
    name: 'company',
    label: 'Empresa',
    align: 'left',
    field: 'company',
    sortable: true
  },
  {
    name: 'city',
    label: 'Cidade',
    align: 'left',
    field: 'city',
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

const pagination = ref({
  sortBy: 'createdAt',
  descending: true,
  page: 1,
  rowsPerPage: 5
})

const filteredClients = computed(() => {
  const term = search.value.trim().toLowerCase()

  if (!term) return clients.value

  return clients.value.filter(client =>
    client.name.toLowerCase().includes(term) ||
    client.email.toLowerCase().includes(term) ||
    client.phone.toLowerCase().includes(term) ||
    client.company.toLowerCase().includes(term) ||
    client.city.toLowerCase().includes(term)
  )
})

function formatDate(date) {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('pt-BR')
}

function viewClient(client) {
  selectedClient.value = client
  viewDialog.value = true
}

function confirmDelete(client) {
  Dialog.create({
    title: 'Confirmar exclusão',
    message: `Deseja realmente deletar o cliente "${client.name}"?`,
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
    clients.value = clients.value.filter(item => item.id !== client.id)

    Notify.create({
      type: 'positive',
      message: 'Cliente deletado com sucesso.',
      position: 'top-right'
    })
  })
}

function openCreateDialog() {
  form.value = formInitialState()
  createDialog.value = true
}

function closeCreateDialog() {
  createDialog.value = false
  form.value = formInitialState()
}

function saveClient() {
  if (!form.value.name || !form.value.email) {
    Notify.create({
      type: 'warning',
      message: 'Preencha pelo menos nome e e-mail do cliente.',
      position: 'top-right'
    })
    return
  }

  const newClient = {
    id: Date.now(),
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone || '(00) 00000-0000',
    company: form.value.company || 'Empresa não informada',
    city: form.value.city || 'Cidade não informada',
    status: form.value.status || 'Ativo',
    notes: form.value.notes || 'Sem observações.',
    createdAt: new Date().toISOString().slice(0, 10)
  }

  clients.value = [newClient, ...clients.value]
  createDialog.value = false

  Notify.create({
    type: 'positive',
    message: 'Cliente adicionado com sucesso. Fluxo pronto para integração.',
    position: 'top-right'
  })

  form.value = formInitialState()
}
</script>

<style scoped>
.clients-page {
  min-height: 100%;
  background:
    radial-gradient(circle at top right, rgba(190, 149, 59, 0.12), transparent 22%),
    radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.03), transparent 18%),
    #0d0d0d;
  color: #f4f4f4;
}

.section-kicker {
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

.filters-card,
.table-card {
  background: linear-gradient(180deg, rgba(30,30,30,0.92) 0%, rgba(17,17,17,0.96) 100%);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 22px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.24);
}

.filters-card {
  padding: 18px;
}

.table-card {
  padding: 8px;
  overflow: hidden;
}

.search-input :deep(.q-field__control) {
  background: rgba(255,255,255,0.03);
  border-radius: 14px;
}

.results-badge {
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  color: #d7d7d7;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 0 14px;
}

.clients-table {
  background: transparent;
  color: #f1f1f1;
}

.clients-table :deep(.q-table) {
  background: transparent;
}

.clients-table :deep(thead tr th) {
  background: rgba(255,255,255,0.03);
  color: #d4af37;
  font-weight: 700;
  border-color: rgba(255,255,255,0.05);
}

.clients-table :deep(tbody tr) {
  background: transparent;
}

.clients-table :deep(tbody tr:hover) {
  background: rgba(255,255,255,0.03);
}

.clients-table :deep(td),
.clients-table :deep(th) {
  border-color: rgba(255,255,255,0.05);
}

.clients-table :deep(.q-table__bottom) {
  background: transparent;
  color: #d0d0d0;
  border-top: 1px solid rgba(255,255,255,0.05);
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

.dialog-kicker {
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 6px;
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

.form-input :deep(.q-field__control) {
  background: rgba(255,255,255,0.03);
  border-radius: 14px;
}

.text-gold {
  color: #d4af37 !important;
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