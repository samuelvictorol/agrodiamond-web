<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark-page text-grey-2">
    <!-- HEADER -->
    <q-header class="header-glass text-white">
      <q-toolbar class="container-xl q-px-md q-py-sm">
        <div class="row items-center no-wrap full-width justify-between">
          <div class="row items-center no-wrap">

            <div class="brand-wrap row items-center no-wrap">
              <q-icon name="mdi-diamond-stone" size="28px" class="text-gold q-mr-sm" />
              <div>
                <div class="brand-name">agrodiamond</div>
                <div v-if="!isMobile" class="brand-subtitle">Método que transforma marketing em faturamento</div>
              </div>
            </div>
          </div>
          <q-btn flat dense round icon="mdi-menu" class="lt-md q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen" />

          <div class="gt-sm row items-center no-wrap nav-desktop">
            <a href="#inicio" class="nav-link">Início</a>
            <a href="#sobre" class="nav-link">Sobre</a>
            <a href="#evento" class="nav-link">Evento</a>
            <a href="#videos" class="nav-link">Vídeos</a>
            <a href="#localizacao" class="nav-link">Localização</a>

            <q-btn unelevated rounded outlined no-caps icon="mdi-shield-account" class="btn-gold q-ml-xs" to="/admin" />
            <q-btn unelevated rounded no-caps label="Fazer login" icon="mdi-login" class="btn-gold" to="/app" />
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <!-- DRAWER MOBILE -->
    <q-drawer v-model="leftDrawerOpen" side="right" overlay bordered class="bg-carbon text-white">
      <div class="q-pa-md">
        <div class="row items-center q-mb-lg">
          <q-icon name="mdi-diamond-stone" size="26px" class="text-gold q-mr-sm" />
          <div>
            <div class="brand-name">agrodiamond</div>
            <div class="brand-subtitle">Marketing de Elite para o Agronegócio</div>
          </div>
        </div>

        <div class="column q-gutter-sm">
          <a href="#inicio" class="drawer-link" @click="leftDrawerOpen = false">Início</a>
          <a href="#sobre" class="drawer-link" @click="leftDrawerOpen = false">Sobre</a>
          <a href="#evento" class="drawer-link" @click="leftDrawerOpen = false">Evento</a>
          <a href="#videos" class="drawer-link" @click="leftDrawerOpen = false">Vídeos</a>
          <a href="#localizacao" class="drawer-link" @click="leftDrawerOpen = false">Localização</a>

          <q-btn unelevated rounded no-caps label="Fazer login" icon="mdi-login" class="btn-gold q-mt-md"
            @click="goToLogin" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <q-page class="landing-page">

        <!-- 1. HERO -->
        <section id="inicio" class="hero-section parallax-hero">
          <div class="hero-overlay"></div>

          <div class="container-xl hero-content relative-position">
            <div class="hero-grid">
              <div class="hero-text animate__animated animate__fadeInUp">
                <div class="hero-chip">
                  <q-icon name="mdi-diamond-stone" class="q-mr-xs" />
                  Marketing de Elite para Agropecuária.
                </div>

                <h1 class="hero-title">
                  agrodiamond
                </h1>

                <p class="hero-subtitle">
                  Método que transforma marketing em faturamento.
                </p>

                <div class="hero-highlight">
                  <span class="text-gold">Estaremos na TJG Experience - Edição Especial de 20 anos</span>
                </div>

                <p class="hero-description">
                  A agrodiamond é a solução premium de marketing para leilões, marcas e eventos do agronegócio.
                  Posicionamento estratégico, design de elite e comunicação voltada para resultados.
                </p>

                <div class="hero-actions row q-col-gutter-sm q-mt-lg">
                  <div class="col-auto">
                    <q-btn unelevated rounded no-caps label="Quero conhecer" icon-right="mdi-arrow-right"
                      class="btn-gold btn-hero" href="#evento" />
                  </div>

                  <div class="col-auto">
                    <q-btn outline rounded no-caps label="Fazer login" icon="mdi-login"
                      class="btn-outline-light btn-hero" @click="goToLogin" />
                  </div>
                </div>

                <div class="hero-mini-info row q-col-gutter-md q-mt-xl">
                  <div class="col-12 col-sm-4">
                    <div class="info-card-mini">
                      <q-icon name="mdi-calendar-star" size="22px" class="text-gold q-mb-sm" />
                      <div class="mini-title">Escala</div>
                      <div class="mini-text">Campanhas, eventos e experiências comerciais</div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="info-card-mini">
                      <q-icon name="mdi-map-marker-radius" size="22px" class="text-gold q-mb-sm" />
                      <div class="mini-title">Posicionamento</div>
                      <div class="mini-text">Especialização em leilões e eventos agro</div>
                    </div>
                  </div>

                  <div class="col-12 col-sm-4">
                    <div class="info-card-mini">
                      <q-icon name="mdi-bullhorn" size="22px" class="text-gold q-mb-sm" />
                      <div class="mini-title">Resultados</div>
                      <div class="mini-text">Comunicação voltada para geração de faturamento</div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="hero-side animate__animated animate__fadeIn animate__delay-1s">
                <div class="hero-side-card">
                  <div class="side-badge">Campanha Premium</div>
                  <h3>Presença digital com autoridade</h3>
                  <p>
                    Posicione sua marca, valorize genética, tradição e credibilidade
                    com uma apresentação visual de alto impacto.
                  </p>

                  <ul class="feature-list">
                    <li>
                      <q-icon name="mdi-check-circle" class="text-gold q-mr-sm" />
                      Estratégia para leilões agro
                    </li>
                    <li>
                      <q-icon name="mdi-check-circle" class="text-gold q-mr-sm" />
                      Design responsivo e premium
                    </li>
                    <li>
                      <q-icon name="mdi-check-circle" class="text-gold q-mr-sm" />
                      Comunicação voltada a faturamento
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 2. SOBRE -->
        <section id="sobre" class="section-dark section-spacing">
          <div class="container-xl">
            <div class="section-header text-center animate__animated animate__fadeInUp">
              <div class="section-kicker">Sobre a agrodiamond</div>
              <h2 class="section-title">Estratégia, sofisticação e resultado para o agro</h2>
              <p class="section-description">
                A agrodiamond nasce com proposta premium para elevar a comunicação de leilões,
                marcas agropecuárias e experiências comerciais que exigem credibilidade visual e conversão.
              </p>
            </div>

            <div class="row q-col-gutter-lg q-mt-lg">
              <div class="col-12 col-md-4">
                <div class="glass-card h-100 animate__animated animate__fadeInUp">
                  <q-icon name="mdi-chart-line" size="34px" class="text-gold q-mb-md" />
                  <h3>Marketing que vende</h3>
                  <p>
                    Posicionamento focado em autoridade, desejo, percepção de valor e geração
                    de faturamento para negócios do agronegócio.
                  </p>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="glass-card h-100 animate__animated animate__fadeInUp animate__delay-1s">
                  <q-icon name="mdi-account-tie-hat" size="34px" class="text-gold q-mb-md" />
                  <h3>Imagem de elite</h3>
                  <p>
                    Layout escuro, elegante e responsivo, com identidade forte para campanhas,
                    eventos, convites especiais e páginas de apresentação.
                  </p>
                </div>
              </div>

              <div class="col-12 col-md-4">
                <div class="glass-card h-100 animate__animated animate__fadeInUp animate__delay-2s">
                  <q-icon name="mdi-barn" size="34px" class="text-gold q-mb-md" />
                  <h3>Especialização no agro</h3>
                  <p>
                    Comunicação pensada para leilões, genética, pecuária de valor,
                    lançamentos e eventos do setor agropecuário.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 3. EVENTO -->
        <section id="evento" class="section-carbon section-spacing">
          <div class="container-xl">
            <div class="row q-col-gutter-xl items-center">
              <div class="col-12 col-md-6">
                <div class="section-kicker">Evento em destaque</div>
                <h2 class="section-title text-left">TJG Experience - Edição Especial de 20 anos</h2>

                <p class="event-text">
                  No dia <strong>28 de Abril</strong>, durante a <strong>Expozebu 2026</strong>,
                  acontecerá o leilão <strong>TJG Experience - Edição Especial de 20 anos</strong>.
                  Um evento que traz consigo toda a credibilidade, constância e ofertas do criterioso
                  trabalho de seleção do <strong>Tabapuã TJG</strong>.
                </p>

                <p class="event-text">
                  Serão apresentados lotes de doadoras, bezerras, novilhas e reprodutores que carregam
                  a genética das melhores famílias da raça tabapuã.
                </p>

                <p class="event-text">
                  Você é o nosso convidado especial para participar de uma noite única, que representa
                  a continuidade destes 20 anos de trajetória. Será um prazer recebê-los neste evento.
                </p>

                <div class="row q-col-gutter-md q-mt-lg">
                  <div class="col-12 col-sm-6">
                    <div class="event-info-box">
                      <q-icon name="mdi-map-marker" class="text-gold q-mr-sm" />
                      <span>Tatersal Rubico de Carvalho</span>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="event-info-box">
                      <q-icon name="mdi-earth" class="text-gold q-mr-sm" />
                      <span>Parque Fernando Costa</span>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="event-info-box">
                      <q-icon name="mdi-city" class="text-gold q-mr-sm" />
                      <span>Uberaba - Minas Gerais</span>
                    </div>
                  </div>

                  <div class="col-12 col-sm-6">
                    <div class="event-info-box">
                      <q-icon name="mdi-star-four-points-circle" class="text-gold q-mr-sm" />
                      <span>Noite única e exclusiva</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="event-highlight-card animate__animated animate__fadeInRight">
                  <div class="event-badge">Convite Especial</div>
                  <h3>Marketing de leilões para o agro</h3>
                  <p>
                    A agrodiamond também atua com estratégia visual e posicionamento
                    para eventos, campanhas e experiências comerciais no agronegócio.
                  </p>

                  <div class="stats-grid">
                    <div class="stat-item">
                      <div class="stat-number">20 anos</div>
                      <div class="stat-label">de trajetória</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-number">2026</div>
                      <div class="stat-label">edição especial</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-number">Dark</div>
                      <div class="stat-label">visual premium</div>
                    </div>
                    <div class="stat-item">
                      <div class="stat-number">Elite</div>
                      <div class="stat-label">marketing estratégico</div>
                    </div>
                  </div>

                  <q-btn unelevated rounded no-caps label="Ver localização" icon="mdi-map-search"
                    class="btn-gold q-mt-lg" href="#localizacao" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 4. VÍDEOS -->
        <section id="videos" class="section-dark section-spacing">
          <div class="container-xl">
            <div class="section-header text-center">
              <div class="section-kicker">CASES E DESTAQUES</div>
              <h2 class="section-title">Agrodiamond em movimento</h2>
              <p class="section-description">
                Espaço reservado para dois vídeos do YouTube da agrodiamond.
              </p>
            </div>

            <div class="row q-col-gutter-lg q-mt-lg">
              <div class="col-12 col-md-6">
                <div class="video-card animate__animated animate__fadeInUp">
                  <div class="video-frame">
                    <iframe :src="videoOne" title="Vídeo 1 Agrodiamond" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen></iframe>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="video-card animate__animated animate__fadeInUp animate__delay-1s">
                  <div class="video-frame">
                    <iframe :src="videoTwo" title="Vídeo 2 Agrodiamond" frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 5. LOCALIZAÇÃO -->
        <section id="localizacao" class="section-carbon section-spacing">
          <div class="container-xl">
            <div class="section-header text-center">
              <div class="section-kicker">Onde Estamos</div>
              <h2 class="section-title">Localização</h2>
              <p class="section-description">
                Em frente ao condomínio Vila do Sol I - Valparaíso de Goiás, GO.
              </p>
            </div>

            <div class="row q-col-gutter-lg q-mt-lg">
              <div class="col-12 col-md-5">
                <div class="glass-card h-100">
                  <h3 class="q-mb-md">Informações do local</h3>

                  <div class="location-item">
                    <q-icon name="mdi-map-marker" class="text-gold q-mr-sm" />
                    <span>Quadra 2 Rua 2 - Etapa A, Valparaiso I</span>
                  </div>

                  <div class="location-item">
                    <q-icon name="mdi-pine-tree" class="text-gold q-mr-sm" />
                    <span>Valparaíso de Goiás - GO</span>
                  </div>

                  <div class="location-item">
                    <q-icon name="mdi-city-variant-outline" class="text-gold q-mr-sm" />
                    <span>AgroDiamond</span>
                  </div>

                  <div class="location-item">
                    <q-icon name="mdi-calendar-month" class="text-gold q-mr-sm" />
                    <span>das 8h às 18h</span>
                  </div>

                  <q-separator dark class="q-my-lg separator-gold" />

                  <p class="location-text">
                    Empresa especializada em marketing de elite para o agronegócio, com foco em leilões,
                  </p>

                  <q-btn unelevated rounded no-caps label="Fazer login" icon="mdi-login" class="btn-gold q-mt-md"
                    @click="goToLogin" />
                </div>
              </div>

              <div class="col-12 col-md-7">
                <div class="map-wrapper">
                  <iframe :src="mapSrc" style="border:0;" allowfullscreen loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- FOOTER -->
        <footer class="footer-section">
          <div class="container-xl footer-content">
            <div>
              <div class="brand-wrap row items-center no-wrap">
                <q-icon name="mdi-diamond-stone" size="24px" class="text-gold q-mr-sm" />
                <div>
                  <div class="brand-name">agrodiamond</div>
                  <div class="brand-subtitle">Método que transforma marketing em faturamento</div>
                </div>
              </div>
            </div>

            <div class="footer-actions">
              <q-btn flat no-caps icon="mdi-chevron-up" label="Voltar ao topo" class="text-grey-3" href="#inicio" />
            </div>
          </div>
        </footer>

        <!-- BOTÃO FLUTUANTE CHAT -->
        <q-page-sticky position="bottom-right" :offset="[20, 20]">
          <q-btn round size="18px" icon="mdi-robot-happy-outline" class="chat-fab" @click="chatDialog = true" />
        </q-page-sticky>

        <!-- DIALOG CHAT FUTURO -->
        <q-dialog v-model="chatDialog" persistent>
          <q-card class="chat-dialog-card">
            <q-card-section class="row items-center justify-between">
              <div class="row items-center">
                <q-icon name="mdi-robot-outline" size="24px" class="text-gold q-mr-sm" />
                <div>
                  <div class="text-h6">Chat Agrodiamond</div>
                  <div class="text-caption text-grey-5">Espaço reservado para o chatbot</div>
                </div>
              </div>

              <q-btn flat round dense icon="mdi-close" color="grey-5" v-close-popup />
            </q-card-section>

            <q-separator dark />

            <q-card-section>
              <div class="chat-placeholder">
                <q-icon name="mdi-message-processing-outline" size="42px" class="text-gold q-mb-md" />
                <p>
                  Aqui ficará o chatbot da agrodiamond futuramente, para atendimento,
                  qualificação e suporte aos visitantes.
                </p>
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat no-caps label="Fechar" color="grey-4" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const leftDrawerOpen = ref(false)
const chatDialog = ref(false)
const isMobile = ref(window.innerWidth < 768)
const videoOne = 'https://www.youtube.com/embed/IRRgYD2RD6M?si=bLlcEQZMVQLyS_ax'
const videoTwo = 'https://www.youtube.com/embed/lJZ7txmtEWY?si=_ZvcyqGUz1kM-fDQ'

const mapSrc = 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d239.61668874914636!2d-47.98452631467591!3d-16.07238900921839!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93598419304fa38b%3A0xd1952e4d16ff4a96!2sCondom%C3%ADnio%20Residencial%20Villa%20Do%20Sol%20I!5e0!3m2!1spt-BR!2sbr!4v1775786241952!5m2!1spt-BR!2sbr'

function goToLogin() {
  router.push('/admin')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

:global(html) {
  scroll-behavior: smooth;
}

:global(body) {
  font-family: 'Inter', sans-serif;
  background: #0d0d0d;
  color: #f4f4f4;
}

.bg-dark-page {
  background:
    radial-gradient(circle at top right, rgba(190, 149, 59, 0.12), transparent 22%),
    radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.03), transparent 18%),
    #0d0d0d;
}

.container-xl {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
}

.landing-page {
  background: transparent;
}

.header-glass {
  background: rgba(14, 14, 14, 0.72);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(255, 215, 128, 0.12);
}

.brand-name {
  font-family: 'Cinzel', serif;
  font-size: 1.1rem;
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

.bg-carbon {
  background: linear-gradient(180deg, #171717 0%, #111111 100%);
}

.nav-desktop {
  gap: 18px;
}

.nav-link,
.drawer-link {
  color: #d7d7d7;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.25s ease;
}

.nav-link:hover,
.drawer-link:hover {
  color: #d4af37;
}

.drawer-link {
  padding: 12px 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
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

.btn-outline-light {
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #f2f2f2;
}

.btn-hero {
  min-width: 170px;
  height: 48px;
}

.section-spacing {
  padding: 88px 20px;
}

.section-dark {
  background: linear-gradient(180deg, #101010 0%, #131313 100%);
}

.section-carbon {
  background: linear-gradient(180deg, #171717 0%, #101010 100%);
}

.section-header {
  max-width: 880px;
  margin: 0 auto;
}

.section-kicker {
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.section-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.15;
  color: #fff;
  margin: 0 0 14px;
}

.section-description {
  color: #b8b8b8;
  font-size: 1.02rem;
  line-height: 1.8;
}

/* HERO */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 120px 20px 80px;
}

.parallax-hero {
  background-image: url('/gado.jpg');
  background-size: cover;
  background-position: center center;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 10, 10, 0.88) 0%, rgba(10, 10, 10, 0.7) 45%, rgba(10, 10, 10, 0.48) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.55) 100%);
}

.hero-content {
  z-index: 2;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 36px;
  align-items: center;
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  padding: 10px 16px;
  border: 1px solid rgba(212, 175, 55, 0.24);
  background: rgba(255, 255, 255, 0.04);
  color: #e7d39b;
  border-radius: 999px;
  font-size: 0.92rem;
  margin-bottom: 18px;
}

.hero-title {
  font-family: 'Cinzel', serif;
  font-size: clamp(2.6rem, 7vw, 5.5rem);
  line-height: 0.95;
  margin: 0;
  color: #fff;
  text-transform: lowercase;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.2vw, 1.45rem);
  color: #dedede;
  margin: 16px 0 8px;
  font-weight: 600;
}

.hero-highlight {
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 16px;
}

.hero-description {
  max-width: 700px;
  color: #c0c0c0;
  line-height: 1.9;
  font-size: 1.02rem;
}

.hero-mini-info .info-card-mini {
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 18px;
  backdrop-filter: blur(10px);
}

.mini-title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 6px;
}

.mini-text {
  color: #bbbbbb;
  font-size: 0.95rem;
}

.hero-side-card,
.event-highlight-card,
.glass-card {
  background: linear-gradient(180deg, rgba(30, 30, 30, 0.9) 0%, rgba(17, 17, 17, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.28);
}

.hero-side-card h3,
.event-highlight-card h3,
.glass-card h3 {
  color: #fff;
  font-size: 1.35rem;
  margin: 0 0 12px;
}

.hero-side-card p,
.event-highlight-card p,
.glass-card p {
  color: #bdbdbd;
  line-height: 1.8;
  margin-bottom: 0;
}

.side-badge,
.event-badge {
  display: inline-block;
  background: rgba(212, 175, 55, 0.12);
  color: #e0bd5d;
  border: 1px solid rgba(212, 175, 55, 0.22);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 14px;
}

.feature-list {
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.feature-list li {
  display: flex;
  align-items: center;
  color: #d6d6d6;
  margin-bottom: 12px;
}

/* EVENT */
.event-text {
  color: #c2c2c2;
  line-height: 1.95;
  font-size: 1rem;
  margin-bottom: 14px;
}

.event-info-box {
  display: flex;
  align-items: center;
  min-height: 54px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  padding: 14px 16px;
  color: #e7e7e7;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  margin-top: 22px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.04);
  border-radius: 18px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-number {
  color: #d4af37;
  font-size: 1.35rem;
  font-weight: 800;
}

.stat-label {
  color: #c2c2c2;
  font-size: 0.92rem;
  margin-top: 4px;
}

/* VIDEO */
.video-card {
  background: linear-gradient(180deg, rgba(28, 28, 28, 0.9) 0%, rgba(18, 18, 18, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 22px;
  padding: 14px;
  overflow: hidden;
}

.video-frame {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  border-radius: 18px;
  overflow: hidden;
}

.video-frame iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

/* MAP */
.map-wrapper {
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  min-height: 420px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.24);
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  min-height: 420px;
  display: block;
  filter: grayscale(0.2) contrast(1.05) brightness(0.9);
}

.location-item {
  display: flex;
  align-items: center;
  color: #dadada;
  margin-bottom: 14px;
  line-height: 1.6;
}

.location-text {
  color: #bcbcbc;
  line-height: 1.9;
}

.separator-gold {
  background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent);
  height: 1px;
}

/* FOOTER */
.footer-section {
  padding: 28px 20px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: #0d0d0d;
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* CHAT */
.chat-fab {
  background: linear-gradient(135deg, #d4af37 0%, #b58517 100%);
  color: #171717;
  box-shadow: 0 16px 40px rgba(212, 175, 55, 0.28);
}

.chat-dialog-card {
  width: min(92vw, 520px);
  background: linear-gradient(180deg, #1c1c1c 0%, #111111 100%);
  color: #fff;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.chat-placeholder {
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #c1c1c1;
  line-height: 1.8;
}

/* HELPERS */
.h-100 {
  height: 100%;
}

/* RESPONSIVO */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero-side {
    max-width: 720px;
  }

  .parallax-hero {
    background-attachment: scroll;
  }
}

@media (max-width: 768px) {
  .section-spacing {
    padding: 72px 18px;
  }

  .hero-section {
    min-height: auto;
    padding: 110px 18px 60px;
  }

  .parallax-hero {
    background-image: url('/gadoMobile.jpg');
    background-position: center top;
    background-size: cover;
  }

  .hero-overlay {
    background:
      linear-gradient(180deg, rgba(8, 8, 8, 0.83) 0%, rgba(8, 8, 8, 0.62) 40%, rgba(8, 8, 8, 0.86) 100%);
  }

  .hero-description,
  .section-description,
  .event-text,
  .location-text {
    font-size: 0.97rem;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-content {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .brand-subtitle {
    max-width: 180px;
  }

  .hero-chip {
    font-size: 0.8rem;
    line-height: 1.4;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .hero-mini-info .info-card-mini,
  .glass-card,
  .hero-side-card,
  .event-highlight-card {
    padding: 20px;
  }
}
</style>