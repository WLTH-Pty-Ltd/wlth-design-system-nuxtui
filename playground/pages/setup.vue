<script setup lang="ts">
definePageMeta({ layout: 'docs' })
</script>

<template>
  <div class="max-w-7xl mx-auto px-10 py-12 space-y-10">

    <div class="space-y-1">
      <h1 class="text-2xl font-semibold text-default">Getting Started</h1>
      <p class="text-sm text-toned">How to install, consume, and release updates to the WLTH Design System.</p>
    </div>

    <USeparator />

    <!-- Overview -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-muted">Overview</p>
      <div class="rounded-xl border border-muted bg-elevated p-5 space-y-2">
        <p class="text-sm font-semibold text-default">@wlth/design-system</p>
        <p class="text-sm text-toned">A Nuxt layer providing the complete WLTH brand design system — custom color palettes, SuisseIntl fonts, semantic UI variables, Nuxt UI component defaults, and bespoke navigation components. Consumed by extending this layer in any Nuxt project.</p>
        <div class="flex flex-wrap gap-2 pt-1">
          <UBadge variant="subtle" color="neutral" size="xs" label="Nuxt 4" />
          <UBadge variant="subtle" color="neutral" size="xs" label="Nuxt UI v4" />
          <UBadge variant="subtle" color="neutral" size="xs" label="Tailwind v4" />
          <UBadge variant="subtle" color="primary" size="xs" label="v1.0.0" />
        </div>
      </div>
    </div>

    <USeparator />

    <!-- Repository -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-muted">Repository</p>
      <div class="rounded-xl border border-muted bg-elevated p-5 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3 min-w-0">
          <UIcon name="i-lucide-github" class="text-lg shrink-0 text-toned" />
          <span class="font-mono text-sm text-highlighted truncate">github.com/rhyeezus/wlth-design-system</span>
        </div>
        <UButton
          size="xs"
          variant="outline"
          color="neutral"
          label="Open"
          icon="i-lucide-external-link"
          trailing
          to="https://github.com/rhyeezus/wlth-design-system"
          target="_blank"
        />
      </div>
    </div>

    <USeparator />

    <!-- Installation -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-muted">Installation</p>
      <p class="text-sm text-toned">Add the design system to any Nuxt project as a git dependency, then extend it in your Nuxt config.</p>

      <div class="space-y-2">
        <p class="text-xs text-dimmed font-mono">1. package.json</p>
        <pre class="rounded-xl bg-darkblue-900 text-lightgrey-100 text-xs font-mono p-5 overflow-x-auto leading-relaxed">{
  "dependencies": {
    "@wlth/design-system": "github:rhyeezus/wlth-design-system#v1.0.0"
  }
}</pre>
      </div>

      <div class="space-y-2">
        <p class="text-xs text-dimmed font-mono">2. nuxt.config.ts</p>
        <pre class="rounded-xl bg-darkblue-900 text-lightgrey-100 text-xs font-mono p-5 overflow-x-auto leading-relaxed">export default defineNuxtConfig({
  extends: ['@wlth/design-system']
})</pre>
      </div>

      <div class="space-y-2">
        <p class="text-xs text-dimmed font-mono">3. Install</p>
        <pre class="rounded-xl bg-darkblue-900 text-lightgrey-100 text-xs font-mono p-5 overflow-x-auto leading-relaxed">npm install</pre>
      </div>

      <UAlert
        icon="i-lucide-info"
        color="info"
        variant="subtle"
        title="Pinned versions"
        description="Consuming apps pin to a specific git tag (e.g. #v1.0.0). The layer is immutable at that tag — upgrade by bumping the tag in your package.json."
      />
    </div>

    <USeparator />

    <!-- What ships -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-muted">What ships to consumers</p>
      <p class="text-sm text-toned">Only these files are included when a project installs this layer. The <span class="font-mono text-xs">playground/</span> directory is excluded.</p>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div
          v-for="(file, i) in [
            { path: 'nuxt.config.ts', desc: 'Layer entry point — what consuming apps extend' },
            { path: 'app.config.ts', desc: 'Semantic color mapping + Nuxt UI component defaults' },
            { path: 'assets/css/tokens.css', desc: 'Custom color palettes, SuisseIntl fonts, --ui-* semantic variables' },
            { path: 'app/components/', desc: 'AppHeader, ProductSwitcher, ProductNav, EntitySelector and more' },
            { path: 'app/composables/', desc: 'useHeader, useDashboard, usePageLoader' },
          ]"
          :key="file.path"
          class="flex items-start gap-4 px-5 py-3.5"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <UIcon name="i-lucide-file" class="mt-0.5 shrink-0 text-toned" />
          <div class="min-w-0">
            <p class="font-mono text-xs text-highlighted">{{ file.path }}</p>
            <p class="text-xs text-toned mt-0.5">{{ file.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- Release workflow -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-muted">Release workflow</p>
      <p class="text-sm text-toned">All changes go through a pull request on GitHub. Once merged to <span class="font-mono text-xs">main</span>, a new version tag is created — consuming apps stay on their pinned version until they choose to upgrade.</p>
      <div class="rounded-xl border border-muted overflow-hidden">
        <div
          v-for="(step, i) in [
            { n: '1', label: 'Feature branch', desc: 'Create a branch from main for your changes' },
            { n: '2', label: 'Pull request', desc: 'Open a PR → review → merge to main' },
            { n: '3', label: 'Bump version', desc: 'Update version in package.json (semver: patch / minor / major)' },
            { n: '4', label: 'Tag the release', desc: 'git tag vX.Y.Z && git push origin vX.Y.Z' },
            { n: '5', label: 'Consumers upgrade', desc: 'Update the pinned tag in their package.json and run npm install' },
          ]"
          :key="step.n"
          class="flex items-start gap-4 px-5 py-3.5"
          :class="i !== 0 ? 'border-t border-muted' : ''"
        >
          <div class="w-6 h-6 rounded-full bg-royalblue-500 text-white flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5">
            {{ step.n }}
          </div>
          <div class="min-w-0">
            <p class="text-sm font-medium text-default">{{ step.label }}</p>
            <p class="text-xs text-toned font-mono mt-0.5">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <USeparator />

    <!-- Local dev -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-muted">Local development</p>
      <p class="text-sm text-toned">Run the playground to preview and test design system changes before publishing.</p>
      <pre class="rounded-xl bg-darkblue-900 text-lightgrey-100 text-xs font-mono p-5 overflow-x-auto leading-relaxed"># From the design system root
npm run dev
# → opens playground at localhost:3000</pre>
    </div>

    <USeparator />

    <!-- Docs site -->
    <div class="space-y-3">
      <p class="text-xs font-semibold uppercase tracking-widest text-muted">Docs site</p>
      <p class="text-sm text-toned">The playground (this site) is deployed automatically to Vercel on every push to <span class="font-mono text-xs">main</span>. No extra steps required — your normal commit and push workflow is all you need.</p>
      <pre class="rounded-xl bg-darkblue-900 text-lightgrey-100 text-xs font-mono p-5 overflow-x-auto leading-relaxed">git add .
git commit -m "your message"
git push
# → Vercel detects the push and redeploys the docs site automatically</pre>
      <UAlert
        icon="i-lucide-info"
        color="neutral"
        variant="subtle"
        title="Static build"
        description="Vercel runs npm run generate, which produces a fully static site. No server required."
      />
    </div>

  </div>
</template>
