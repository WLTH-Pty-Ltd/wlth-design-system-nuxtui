<script setup lang="ts">
const { isVisible } = usePageLoader()
</script>

<template>
  <Transition name="loader-fade">
    <div
      v-if="isVisible"
      class="loader-overlay"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <div class="loader-content">
        <div class="logo-wrapper">
          <div class="ring" aria-hidden="true" />
          <svg
            width="75"
            height="53"
            viewBox="0 0 96 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="loader-logo"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop class="s1-top" offset="0%" />
                <stop class="s1-bot" offset="100%" />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop class="s2-top" offset="0%" />
                <stop class="s2-bot" offset="100%" />
              </linearGradient>
              <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                <stop class="s3-top" offset="0%" />
                <stop class="s3-bot" offset="100%" />
              </linearGradient>
            </defs>
            <path
              class="segment seg-1"
              fill="url(#g1)"
              d="M10.1807 0L25.9531 49.5938L34.1709 23.7627H44.3467L30.2803 68H21.626L0 0H10.1807Z"
            />
            <path
              class="segment seg-2"
              fill="url(#g2)"
              d="M74.0166 68H63.8359L42.2051 0H52.3857L74.0166 68Z"
            />
            <path
              class="segment seg-3"
              fill="url(#g3)"
              d="M81.9287 44.2373H71.748L85.8193 0H96L81.9287 44.2373Z"
            />
          </svg>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.loader-overlay {
  position: absolute;
  inset: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(
    ellipse at center,
    #ffffff  0%,
    #f6f7f8 55%,   /* darkblue-50  */
    #d2d5d8 100%   /* darkblue-200 */
  );
}

.loader-logo {
  filter: drop-shadow(0 8px 24px rgba(20, 69, 199, 0.35));
}

.segment {
  opacity: 1;
}

.seg-1 { animation: seg-pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0s     alternate infinite; }
.seg-2 { animation: seg-pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.125s alternate infinite; }
.seg-3 { animation: seg-pulse 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.25s  alternate infinite; }

/* Top gradient stops — royalblue-500 ↔ royalblue-700 */
.s1-top { stop-color: #1445c7; animation: deepen-top 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0s     alternate infinite; }
.s2-top { stop-color: #1445c7; animation: deepen-top 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.125s alternate infinite; }
.s3-top { stop-color: #1445c7; animation: deepen-top 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.25s  alternate infinite; }

/* Bottom gradient stops — royalblue-700 ↔ royalblue-900 */
.s1-bot { stop-color: #0c2e88; animation: deepen-bot 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0s     alternate infinite; }
.s2-bot { stop-color: #0c2e88; animation: deepen-bot 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.125s alternate infinite; }
.s3-bot { stop-color: #0c2e88; animation: deepen-bot 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.25s  alternate infinite; }

@keyframes seg-pulse {
  from { opacity: 0.45; }
  to   { opacity: 1; }
}

@keyframes deepen-top {
  from { stop-color: #1445c7; } /* royalblue-500 */
  to   { stop-color: #0c2e88; } /* royalblue-700 */
}

@keyframes deepen-bot {
  from { stop-color: #0c2e88; } /* royalblue-700 */
  to   { stop-color: #061d59; } /* royalblue-900 */
}

.loader-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;
}

.ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent  0%,
    #b3c8ff     20%,   /* royalblue-200 */
    #4e78e3     50%,   /* royalblue-400 */
    #1445c7     60%,   /* royalblue-500 */
    transparent 80%
  );
  mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 2.5px), #000 calc(100% - 2.5px));
  animation: ring-spin 1.2s linear infinite;
}

@keyframes ring-spin {
  to { transform: rotate(360deg); }
}

/* Overlay exit */
.loader-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.loader-fade-leave-to {
  opacity: 0;
  transform: scale(1.04);
}
</style>
