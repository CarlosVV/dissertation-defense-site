const encoder = new TextEncoder();
const decoder = new TextDecoder();

const unlockScreen = document.querySelector("#unlock-screen");
const unlockForm = document.querySelector("#unlock-form");
const unlockButton = document.querySelector("#unlock-button");
const unlockStatus = document.querySelector("#unlock-status");
const passphraseInput = document.querySelector("#passphrase");
const togglePassword = document.querySelector("#toggle-password");
const publicProfileButton = document.querySelector("#public-profile-button");
const publicScreen = document.querySelector("#public-screen");
const publicProfileRoot = document.querySelector("#public-profile-root");
const publicBackButton = document.querySelector("#public-back-button");
const portal = document.querySelector("#portal");

const state = {
  publicProfile: { enabled: false },
  privateReady: false,
  privateModuleUrl: null,
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fromBase64Url(value) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function deriveKey(passphrase, config) {
  const material = await crypto.subtle.importKey(
    "raw",
    encoder.encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: fromBase64Url(config.salt),
      iterations: config.iterations,
    },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

async function decryptBytes(cipherBytes, key, iv, aad) {
  return crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: fromBase64Url(iv),
      additionalData: encoder.encode(aad),
    },
    key,
    cipherBytes,
  );
}

async function fetchBinary(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Unable to load ${url}`);
  return response.arrayBuffer();
}

async function unlockPrivatePortal(passphrase) {
  const configResponse = await fetch("vault/config.json", { cache: "no-store" });
  if (!configResponse.ok) throw new Error("Portal configuration is unavailable.");
  const config = await configResponse.json();
  if (!config.manifest || !config.privateApp) throw new Error("The encrypted portal package is incomplete.");

  const key = await deriveKey(passphrase, config);
  const encryptedManifest = await fetchBinary(config.manifest.url);
  const decryptedManifest = await decryptBytes(
    encryptedManifest,
    key,
    config.manifest.iv,
    config.manifest.aad,
  );
  const manifest = JSON.parse(decoder.decode(decryptedManifest));
  if (manifest.schema !== 1 || !manifest.content || !Array.isArray(manifest.assets)) {
    throw new Error("The decrypted portal package is invalid.");
  }

  const encryptedPrivateApp = await fetchBinary(config.privateApp.url);
  const privateAppSource = await decryptBytes(
    encryptedPrivateApp,
    key,
    config.privateApp.iv,
    config.privateApp.aad,
  );
  const privateModuleUrl = URL.createObjectURL(
    new Blob([privateAppSource], { type: "text/javascript" }),
  );

  window.__PRIVATE_BOOTSTRAP__ = {
    key,
    manifest,
    publicProfile: state.publicProfile,
  };
  state.privateModuleUrl = privateModuleUrl;
  passphraseInput.value = "";
  await import(privateModuleUrl);
  state.privateReady = true;
}

async function loadPublicProfile() {
  try {
    const response = await fetch("public-profile.json", { cache: "no-store" });
    if (!response.ok) return;
    const profile = await response.json();
    if (!profile?.enabled) return;
    state.publicProfile = profile;
    publicProfileButton.hidden = false;
    if (new URLSearchParams(window.location.search).get("public") === "1") showPublicProfile();
  } catch {
    state.publicProfile = { enabled: false };
  }
}

function showPublicProfile() {
  if (!state.publicProfile.enabled) return;
  unlockScreen.hidden = true;
  portal.hidden = true;
  publicScreen.hidden = false;
  publicProfileRoot.innerHTML = renderPublicProfile();
  document.title = state.publicProfile.identity?.title || "Public Research Profile";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hidePublicProfile() {
  publicScreen.hidden = true;
  if (state.privateReady) {
    portal.hidden = false;
  } else {
    unlockScreen.hidden = false;
    document.title = "Private Defense Portal";
  }
}

function renderPublicProfile() {
  const profile = state.publicProfile;
  const identity = profile.identity ? `
    <header class="public-identity">
      <p class="section-kicker">RESEARCH PROFILE</p>
      <h1>${escapeHtml(profile.identity.title)}</h1>
      <p class="subtitle">${escapeHtml(profile.identity.subtitle)}</p>
      <div class="public-byline">
        <span>${escapeHtml(profile.identity.researcher)}</span>
        <span>${escapeHtml(profile.identity.program)}</span>
        <span>${escapeHtml(profile.identity.institution)}</span>
        <span>${escapeHtml(profile.identity.date)}</span>
      </div>
    </header>` : "";
  const summary = profile.summary
    ? `<section class="public-section full"><h2>${escapeHtml(profile.summary.heading)}</h2><p>${escapeHtml(profile.summary.body)}</p></section>`
    : "";
  const architecture = profile.architecture ? `
    <section class="public-section full">
      <h2>${escapeHtml(profile.architecture.heading)}</h2>
      <div class="public-architecture">
        ${(profile.architecture.items || []).map((item) => `<div><strong>${escapeHtml(item.label)}</strong><p>${escapeHtml(item.body)}</p></div>`).join("")}
      </div>
    </section>` : "";
  const methods = profile.methods
    ? `<section class="public-section"><h2>${escapeHtml(profile.methods.heading)}</h2><ul>${(profile.methods.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`
    : "";
  const boundary = profile.pilotBoundary
    ? `<section class="public-section"><h2>${escapeHtml(profile.pilotBoundary.heading)}</h2><p>${escapeHtml(profile.pilotBoundary.body)}</p></section>`
    : "";
  const status = profile.status
    ? `<section class="public-section"><h2>${escapeHtml(profile.status.heading)}</h2><ul>${(profile.status.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>`
    : "";
  const references = profile.references
    ? `<section class="public-section"><h2>${escapeHtml(profile.references.heading)}</h2><p>${escapeHtml(profile.references.body)}</p></section>`
    : "";
  const results = profile.selectedResults ? `
    <section class="public-section full">
      <h2>${escapeHtml(profile.selectedResults.heading)}</h2>
      <p>${escapeHtml(profile.selectedResults.warning)}</p>
      <div class="public-result-list">
        ${(profile.selectedResults.items || []).map((item) => `<article class="public-result"><span>${escapeHtml(item.label)}</span><strong>${escapeHtml(item.value)}</strong><span>${escapeHtml(item.detail)}</span></article>`).join("")}
      </div>
    </section>` : "";
  return `${identity}<div class="public-grid">${summary}${architecture}${methods}${boundary}${status}${references}${results}</div>`;
}

unlockForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  unlockButton.disabled = true;
  unlockButton.textContent = "Decrypting…";
  unlockStatus.textContent = "";
  try {
    await unlockPrivatePortal(passphraseInput.value);
  } catch (error) {
    unlockStatus.textContent = "The passphrase is incorrect or the encrypted package is unavailable.";
    console.error(error);
    passphraseInput.select();
  } finally {
    unlockButton.disabled = false;
    unlockButton.textContent = "Unlock portal";
  }
});

togglePassword.addEventListener("click", () => {
  const visible = passphraseInput.type === "text";
  passphraseInput.type = visible ? "password" : "text";
  togglePassword.setAttribute("aria-label", visible ? "Show passphrase" : "Hide passphrase");
  passphraseInput.focus();
});

publicProfileButton.addEventListener("click", showPublicProfile);
publicBackButton.addEventListener("click", hidePublicProfile);
window.addEventListener("beforeunload", () => {
  if (state.privateModuleUrl) URL.revokeObjectURL(state.privateModuleUrl);
});

loadPublicProfile();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch((error) => console.warn("Service worker registration failed", error)));
}
