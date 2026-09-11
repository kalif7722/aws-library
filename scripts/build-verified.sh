#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
runtime_root="${SITES_RUNTIME_ROOT:-${project_root}/.sites-runtime}"

# Set up the writable project-scoped environment directly here. Cloudflare's
# Git checkout can lose executable bits on helper scripts, so the build must
# not exec another repository shell script.
mkdir -p \
  "${runtime_root}/home" \
  "${runtime_root}/npm-cache" \
  "${runtime_root}/xdg-config" \
  "${runtime_root}/tmp" \
  "${runtime_root}/wrangler/logs"

export SITES_ENV_READY=1
export SITES_PROJECT_ROOT="${project_root}"
export HOME="${runtime_root}/home"
export XDG_CONFIG_HOME="${runtime_root}/xdg-config"
export TMPDIR="${runtime_root}/tmp"
export WRANGLER_WRITE_LOGS=false
export WRANGLER_LOG_PATH="${runtime_root}/wrangler/logs"
export MINIFLARE_REGISTRY_PATH="${runtime_root}/wrangler/registry"

unset NPM_CONFIG_CACHE npm_config_cache || true
export npm_config_cache="${runtime_root}/npm-cache"
export npm_config_audit=false
export npm_config_fund=false
export npm_config_update_notifier=false

unset \
  npm_config_proxy \
  npm_config_http_proxy \
  npm_config_https_proxy \
  NPM_CONFIG_PROXY \
  NPM_CONFIG_HTTP_PROXY \
  NPM_CONFIG_HTTPS_PROXY \
  || true

cd "${project_root}"

command -v timeout >/dev/null 2>&1 || {
  echo "build-verified.sh requires GNU timeout." >&2
  exit 69
}

node scripts/apply-service-catalog.mjs
node scripts/apply-course-viewer-cleanup.mjs
node scripts/apply-aip-service-alignment.mjs
node scripts/apply-service-memory-and-scope-identity.mjs
node scripts/apply-analytics-cost-models.mjs

# AWS architecture icons are synchronized to Cloudflare R2 by the dedicated
# GitHub Actions workflow. Do not download the icon distribution during each
# Cloudflare site build.

vinext="${project_root}/node_modules/.bin/vinext"
if [[ ! -f "${vinext}" ]]; then
  echo "vinext is unavailable after npm install." >&2
  exit 69
fi

echo "Running bounded vinext build..."
timeout \
  --signal=TERM \
  --kill-after="${SITES_BUILD_KILL_AFTER:-10s}" \
  "${SITES_BUILD_TIMEOUT:-3m}" \
  node "${vinext}" build
