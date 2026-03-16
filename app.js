const DEFAULT_RMS_THRESHOLD = 0.025;
const SPEECH_THRESHOLD = 0.05;
const DEFAULT_SILENCE_DURATION_MS = 800;
const STORAGE_KEYS = {
  silenceDurationMs: "sentence-recorder.silence-duration-ms",
  rmsThreshold: "sentence-recorder.rms-threshold",
  locale: "sentence-recorder.locale",
  fileNameTemplate: "sentence-recorder.file-name-template",
  sampleRate: "sentence-recorder.sample-rate"
};

const TRANSLATIONS = {
  cs: {
    appEyebrow: "Sentence Recording App",
    appTitle: "Nahrávání vět",
    totalLabel: "Celkem",
    downloadZip: "Stáhnout ZIP",
    settingsOpen: "Otevřít nastavení",
    themeLabel: "Světlý motiv",
    themeAria: "Přepnout světlý motiv",
    progressLabel: "Postup",
    setupEyebrow: "Vyber sadu vět",
    setupTitle: "Nejdřív zvol zdroj vět pro nahrávání",
    setupCopy: "Můžeš použít připravenou českou nebo HDS sadu, případně nahrát vlastní `.txt` soubor. Jedna věta odpovídá jednomu řádku.",
    defaultEyebrow: "Výchozí sada",
    defaultCsDescription: "Sada 400 českých vět.",
    defaultEnDescription: "HDS věty.",
    customFileEyebrow: "Vlastní soubor",
    customFileTitle: "Nahrát .txt",
    customFileDescription: "Vyber vlastní textový soubor z počítače.",
    previewHeading: "Náhled vět",
    previewEmpty: "Po načtení sady se tady objeví náhled vět.",
    reshuffle: "Reshuffle",
    beginSession: "Začít nahrávat",
    currentSentenceLabel: "Aktuální věta",
    waveformHeading: "Live waveform",
    start: "START",
    skip: "Přeskočit",
    play: "Přehrát",
    save: "Uložit",
    retry: "Nahrát znovu",
    settingsEyebrow: "Nastavení",
    settingsHeading: "Detekce ticha",
    settingsClose: "Zavřít nastavení",
    silenceDurationLabel: "Délka ticha pro auto-stop",
    rmsThresholdLabel: "RMS threshold hlasitosti",
    fileNameTemplateLabel: "Šablona názvu souboru",
    fileNameTemplateHint: "Použij placeholdery: {id}, {index}, {index5}, {index6}, {sentence}, {date}, {time}, {lang}.",
    sampleRateLabel: "Vzorkovací frekvence exportu",
    settingsNote: "Hodnoty se ukládají do prohlížeče a zůstanou zachované i po reloadu stránky.",
    statusIdle: "Klikni na START a aplikace začne poslouchat mikrofon.",
    statusRecording: (ms) => `Nahrávání běží. Jakmile po řeči nastane ${ms} ms ticha, záznam se automaticky zastaví.`,
    statusReview: "Nahrávka je připravena. Můžeš ji přehrát, uložit nebo nahrát znovu.",
    noSetLoaded: "Zatím není načtena žádná sada vět.",
    loadedSet: (count, source) => `Načteno vět: ${count}. Zdroj: ${source}.`,
    reshuffledSet: (count, source) => `Načteno vět: ${count}. Zdroj: ${source}. Pořadí bylo znovu promícháno.`,
    loadingSet: "Načítám vybranou sadu vět...",
    loadingCustomSet: "Načítám vlastní soubor vět...",
    failedSet: "Sadu vět se nepodařilo načíst. Zkus jinou možnost.",
    emptySet: "Soubor neobsahuje žádné platné věty.",
    failedFile: "Vlastní soubor se nepodařilo přečíst.",
    chooseSetFirst: "Před nahráváním nejdřív vyber sadu vět.",
    mediaUnsupported: "Tento prohlížeč nepodporuje MediaRecorder nebo přístup k mikrofonu.",
    micFailed: "Nepodařilo se přistoupit k mikrofonu. Zkontroluj oprávnění v prohlížeči.",
    playbackFailed: "Přehrání nahrávky se nepodařilo spustit.",
    preparingWav: "Připravuji WAV záznam do session ZIP archivu.",
    savingFailed: "Uložení nahrávky do ZIP session selhalo.",
    generatingZip: "Generuji ZIP archiv ke stažení.",
    zipReady: (count) => `ZIP archiv je připravený. Uloženo nahrávek: ${count}.`,
    zipFailed: "Generování ZIP archivu selhalo.",
    loadSetFirst: "Nejdřív načti aspoň jednu sadu vět.",
    currentSentencePlaceholder: "Vyber sadu vět pro nahrávání.",
    previewMeta: (count) => `${count} vět`
  },
  en: {
    appEyebrow: "Sentence Recording App",
    appTitle: "Sentence Recording",
    totalLabel: "Total",
    downloadZip: "Download ZIP",
    settingsOpen: "Open settings",
    themeLabel: "Light theme",
    themeAria: "Toggle light theme",
    progressLabel: "Progress",
    setupEyebrow: "Choose sentence set",
    setupTitle: "First, choose the sentence source for recording",
    setupCopy: "You can use the prepared Czech or HDS set, or upload your own `.txt` file. One sentence should be placed on each line.",
    defaultEyebrow: "Default set",
    defaultCsDescription: "Set of 400 Czech sentences.",
    defaultEnDescription: "HDS sentences.",
    customFileEyebrow: "Custom file",
    customFileTitle: "Upload .txt",
    customFileDescription: "Choose your own text file from your computer.",
    previewHeading: "Sentence preview",
    previewEmpty: "A preview of the sentence set will appear here after loading.",
    reshuffle: "Reshuffle",
    beginSession: "Start recording",
    currentSentenceLabel: "Current sentence",
    waveformHeading: "Live waveform",
    start: "START",
    skip: "Skip",
    play: "Play",
    save: "Save",
    retry: "Record again",
    settingsEyebrow: "Settings",
    settingsHeading: "Silence detection",
    settingsClose: "Close settings",
    silenceDurationLabel: "Silence duration for auto-stop",
    rmsThresholdLabel: "RMS loudness threshold",
    fileNameTemplateLabel: "File name template",
    fileNameTemplateHint: "Use placeholders: {id}, {index}, {index5}, {index6}, {sentence}, {date}, {time}, {lang}.",
    sampleRateLabel: "Export sample rate",
    settingsNote: "Values are stored in the browser and will stay saved after a page reload.",
    statusIdle: "Click START and the app will begin listening to your microphone.",
    statusRecording: (ms) => `Recording is active. Once ${ms} ms of silence follows speech, the recording will stop automatically.`,
    statusReview: "The recording is ready. You can play it, save it, or record it again.",
    noSetLoaded: "No sentence set has been loaded yet.",
    loadedSet: (count, source) => `Loaded sentences: ${count}. Source: ${source}.`,
    reshuffledSet: (count, source) => `Loaded sentences: ${count}. Source: ${source}. Order has been reshuffled.`,
    loadingSet: "Loading selected sentence set...",
    loadingCustomSet: "Loading custom sentence file...",
    failedSet: "The sentence set could not be loaded. Try another option.",
    emptySet: "The file does not contain any valid sentences.",
    failedFile: "The custom file could not be read.",
    chooseSetFirst: "Before recording, choose a sentence set first.",
    mediaUnsupported: "This browser does not support MediaRecorder or microphone access.",
    micFailed: "Could not access the microphone. Check browser permissions.",
    playbackFailed: "Playback could not be started.",
    preparingWav: "Preparing WAV recording for the ZIP session archive.",
    savingFailed: "Saving the recording to the ZIP session failed.",
    generatingZip: "Generating ZIP archive for download.",
    zipReady: (count) => `ZIP archive is ready. Saved recordings: ${count}.`,
    zipFailed: "ZIP archive generation failed.",
    loadSetFirst: "Load at least one sentence set first.",
    currentSentencePlaceholder: "Choose a sentence set for recording.",
    previewMeta: (count) => `${count} sentences`
  }
};

const state = {
  sentences: [],
  sourceSentences: [],
  selectedSource: null,
  locale: "cs",
  currentSentenceIndex: 0,
  theme: "dark",
  uiState: "idle",
  appMode: "setup",
  audioContext: null,
  mediaRecorder: null,
  mediaStream: null,
  analyser: null,
  sourceNode: null,
  waveformFrameId: null,
  silenceStartedAt: null,
  hasDetectedSpeech: false,
  chunks: [],
  currentRecording: null,
  savedRecordings: [],
  zipEntries: new Map(),
  zipFileCount: 0,
  isZipGenerating: false,
  settingsOpen: false,
  settings: {
    silenceDurationMs: DEFAULT_SILENCE_DURATION_MS,
    rmsThreshold: DEFAULT_RMS_THRESHOLD,
    fileNameTemplate: "Sentence{index5}.wav",
    sampleRate: 48000
  },
  resizeObserver: null
};

const sentenceHeading = document.getElementById("sentenceHeading");
const sentenceCounter = document.getElementById("sentenceCounter");
const progressFill = document.getElementById("progressFill");
const themeToggle = document.getElementById("themeToggle");
const statusPill = document.getElementById("statusPill");
const statusMessage = document.getElementById("statusMessage");
const startButton = document.getElementById("startButton");
const skipButton = document.getElementById("skipButton");
const playButton = document.getElementById("playButton");
const saveButton = document.getElementById("saveButton");
const retryButton = document.getElementById("retryButton");
const downloadZipButton = document.getElementById("downloadZipButton");
const waveformCanvas = document.getElementById("waveformCanvas");
const canvasContext = waveformCanvas.getContext("2d");
const setupPanel = document.getElementById("setupPanel");
const sentencePanel = document.querySelector(".sentence-panel");
const waveformPanel = document.querySelector(".waveform-panel");
const controlPanel = document.querySelector(".control-panel");
const loadDefaultCsButton = document.getElementById("loadDefaultCsButton");
const loadDefaultEnButton = document.getElementById("loadDefaultEnButton");
const customSentenceFile = document.getElementById("customSentenceFile");
const sentenceSetStatus = document.getElementById("sentenceSetStatus");
const beginSessionButton = document.getElementById("beginSessionButton");
const reshuffleButton = document.getElementById("reshuffleButton");
const sentencePreviewList = document.getElementById("sentencePreviewList");
const previewMeta = document.getElementById("previewMeta");
const totalDurationLabel = document.getElementById("totalDurationLabel");
const settingsButton = document.getElementById("settingsButton");
const settingsPanel = document.getElementById("settingsPanel");
const settingsBackdrop = document.getElementById("settingsBackdrop");
const closeSettingsButton = document.getElementById("closeSettingsButton");
const silenceDurationRange = document.getElementById("silenceDurationRange");
const silenceDurationValue = document.getElementById("silenceDurationValue");
const rmsThresholdRange = document.getElementById("rmsThresholdRange");
const rmsThresholdValue = document.getElementById("rmsThresholdValue");
const fileNameTemplateInput = document.getElementById("fileNameTemplateInput");
const sampleRateSelect = document.getElementById("sampleRateSelect");
const localeCsButton = document.getElementById("localeCsButton");
const localeEnButton = document.getElementById("localeEnButton");

function t(key, ...args) {
  const entry = TRANSLATIONS[state.locale][key];
  return typeof entry === "function" ? entry(...args) : entry;
}

function formatFileName(index) {
  return `Sentence${String(index + 1).padStart(5, "0")}.wav`;
}

function slugifySentence(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 48);
}

function buildFileName(index, sentence) {
  const now = new Date();
  let fileName = state.settings.fileNameTemplate || "Sentence{index5}.wav";

  fileName = fileName.replace(/\{index(\d+)?\}/g, (_, width) => {
    const padWidth = width ? Number.parseInt(width, 10) : 5;
    const safeWidth = Number.isFinite(padWidth) ? Math.min(Math.max(padWidth, 1), 12) : 5;
    return String(index + 1).padStart(safeWidth, "0");
  });

  const replacements = {
    "{id}": sentence.id || formatFileName(index).replace(/\.wav$/i, ""),
    "{sentence}": slugifySentence(sentence.text) || "sentence",
    "{date}": now.toISOString().slice(0, 10),
    "{time}": now.toTimeString().slice(0, 8).replace(/:/g, "-"),
    "{lang}": "cs"
  };

  for (const [token, value] of Object.entries(replacements)) {
    fileName = fileName.split(token).join(value);
  }

  fileName = fileName
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "_")
    .replace(/\s+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");

  if (!fileName.toLowerCase().endsWith(".wav")) {
    fileName = `${fileName}.wav`;
  }

  if (fileName === ".wav" || fileName.length === 0) {
    return formatFileName(index);
  }

  return fileName;
}

function resampleAudioBuffer(audioBuffer, targetSampleRate) {
  if (audioBuffer.sampleRate === targetSampleRate) {
    return audioBuffer;
  }

  const duration = audioBuffer.length / audioBuffer.sampleRate;
  const targetLength = Math.max(1, Math.round(duration * targetSampleRate));
  const offlineContext = new OfflineAudioContext(
    audioBuffer.numberOfChannels,
    targetLength,
    targetSampleRate
  );

  const source = offlineContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(offlineContext.destination);
  source.start(0);

  return offlineContext.startRendering();
}

function escapeCsvValue(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function parseSentenceText(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const separatorIndex = line.indexOf("|");
      if (separatorIndex === -1) {
        return { id: null, text: line };
      }

      const id = line.slice(0, separatorIndex).trim();
      const sentenceText = line.slice(separatorIndex + 1).trim();
      return {
        id: id || null,
        text: sentenceText
      };
    })
    .filter((entry) => entry.text);
}

function shuffleArray(items) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

function highlightSelectedSource(source) {
  const cards = [loadDefaultCsButton, loadDefaultEnButton, customSentenceFile.closest(".setup-card")];
  cards.forEach((card) => {
    card.classList.toggle("is-selected", card.dataset.source === source);
  });
}

function updateSetupStatus(message, isReady = false) {
  sentenceSetStatus.textContent = message;
  beginSessionButton.disabled = !isReady || state.isZipGenerating;
  reshuffleButton.disabled = !isReady || state.isZipGenerating;
}

function updateDownloadButton() {
  state.zipFileCount = state.zipEntries.size;
  downloadZipButton.textContent = `${t("downloadZip")} (${state.zipFileCount})`;
  downloadZipButton.classList.toggle("is-hidden", state.zipFileCount === 0);
  downloadZipButton.disabled = state.zipFileCount === 0 || state.isZipGenerating;
  beginSessionButton.disabled = state.sentences.length === 0 || state.isZipGenerating;
  reshuffleButton.disabled = state.sentences.length === 0 || state.isZipGenerating;
  settingsButton.disabled = state.isZipGenerating;
}

function updateTotalDuration() {
  const totalDuration = [...state.zipEntries.values()].reduce((sum, entry) => sum + entry.durationSeconds, 0);
  totalDurationLabel.textContent = `${totalDuration.toFixed(1)} s`;
}

function syncSettingsUI() {
  silenceDurationRange.value = String(state.settings.silenceDurationMs);
  silenceDurationValue.textContent = `${state.settings.silenceDurationMs} ms`;
  rmsThresholdRange.value = String(state.settings.rmsThreshold);
  rmsThresholdValue.textContent = state.settings.rmsThreshold.toFixed(3);
  fileNameTemplateInput.value = state.settings.fileNameTemplate;
  sampleRateSelect.value = String(state.settings.sampleRate);
}

function loadSettings() {
  const storedSilenceDuration = Number.parseInt(localStorage.getItem(STORAGE_KEYS.silenceDurationMs) || "", 10);
  const storedRmsThreshold = Number.parseFloat(localStorage.getItem(STORAGE_KEYS.rmsThreshold) || "");

  if (Number.isFinite(storedSilenceDuration)) {
    state.settings.silenceDurationMs = Math.min(2000, Math.max(400, storedSilenceDuration));
  }

  if (Number.isFinite(storedRmsThreshold)) {
    state.settings.rmsThreshold = Math.min(0.1, Math.max(0.01, storedRmsThreshold));
  }

  const storedTemplate = localStorage.getItem(STORAGE_KEYS.fileNameTemplate);
  if (storedTemplate && storedTemplate.trim()) {
    state.settings.fileNameTemplate = storedTemplate.trim();
  }

  const storedSampleRate = Number.parseInt(localStorage.getItem(STORAGE_KEYS.sampleRate) || "", 10);
  if (storedSampleRate === 24000 || storedSampleRate === 48000) {
    state.settings.sampleRate = storedSampleRate;
  }

  const storedLocale = localStorage.getItem(STORAGE_KEYS.locale);
  if (storedLocale === "cs" || storedLocale === "en") {
    state.locale = storedLocale;
  }
}

function persistSettings() {
  localStorage.setItem(STORAGE_KEYS.silenceDurationMs, String(state.settings.silenceDurationMs));
  localStorage.setItem(STORAGE_KEYS.rmsThreshold, String(state.settings.rmsThreshold));
  localStorage.setItem(STORAGE_KEYS.fileNameTemplate, state.settings.fileNameTemplate);
  localStorage.setItem(STORAGE_KEYS.sampleRate, String(state.settings.sampleRate));
}

function persistLocale() {
  localStorage.setItem(STORAGE_KEYS.locale, state.locale);
}

function setSettingsOpen(isOpen) {
  state.settingsOpen = isOpen;
  settingsPanel.classList.toggle("is-hidden", !isOpen);
}

function hasUnsavedWork() {
  return state.uiState === "recording" || Boolean(state.currentRecording);
}

function applyTranslations() {
  document.documentElement.lang = state.locale;
  document.getElementById("appEyebrow").textContent = t("appEyebrow");
  document.getElementById("appTitle").textContent = t("appTitle");
  document.getElementById("totalLabel").textContent = t("totalLabel");
  document.getElementById("progressLabel").textContent = t("progressLabel");
  document.getElementById("setupEyebrow").textContent = t("setupEyebrow");
  document.getElementById("setupTitle").textContent = t("setupTitle");
  document.getElementById("setupCopy").textContent = t("setupCopy");
  document.getElementById("defaultCsEyebrow").textContent = t("defaultEyebrow");
  document.getElementById("defaultEnEyebrow").textContent = t("defaultEyebrow");
  document.getElementById("defaultCsDescription").textContent = t("defaultCsDescription");
  document.getElementById("defaultEnDescription").textContent = t("defaultEnDescription");
  document.getElementById("defaultEnTitle").textContent = "default_hds.txt";
  document.getElementById("customFileEyebrow").textContent = t("customFileEyebrow");
  document.getElementById("customFileTitle").textContent = t("customFileTitle");
  document.getElementById("customFileDescription").textContent = t("customFileDescription");
  document.getElementById("previewHeading").textContent = t("previewHeading");
  document.getElementById("currentSentenceLabel").textContent = t("currentSentenceLabel");
  document.getElementById("waveformHeading").textContent = t("waveformHeading");
  document.getElementById("reshuffleButton").textContent = t("reshuffle");
  document.getElementById("beginSessionButton").textContent = t("beginSession");
  document.getElementById("startButton").textContent = t("start");
  document.getElementById("skipButton").textContent = t("skip");
  document.getElementById("playButton").textContent = t("play");
  document.getElementById("saveButton").textContent = t("save");
  document.getElementById("retryButton").textContent = t("retry");
  document.getElementById("settingsEyebrow").textContent = t("settingsEyebrow");
  document.getElementById("settingsHeading").textContent = t("settingsHeading");
  document.getElementById("closeSettingsButton").setAttribute("aria-label", t("settingsClose"));
  document.getElementById("settingsButton").setAttribute("aria-label", t("settingsOpen"));
  document.querySelector(".theme-toggle span").textContent = t("themeLabel");
  themeToggle.setAttribute("aria-label", t("themeAria"));
  document.getElementById("silenceDurationLabel").textContent = t("silenceDurationLabel");
  document.getElementById("rmsThresholdLabel").textContent = t("rmsThresholdLabel");
  document.getElementById("fileNameTemplateLabel").textContent = t("fileNameTemplateLabel");
  document.getElementById("fileNameTemplateHint").textContent = t("fileNameTemplateHint");
  document.getElementById("sampleRateLabel").textContent = t("sampleRateLabel");
  document.getElementById("settingsNote").textContent = t("settingsNote");
  localeCsButton.classList.toggle("is-active", state.locale === "cs");
  localeEnButton.classList.toggle("is-active", state.locale === "en");
  if (!state.selectedSource) {
    sentenceSetStatus.textContent = t("noSetLoaded");
  } else if (state.sentences.length > 0) {
    sentenceSetStatus.textContent = t("loadedSet", state.sentences.length, state.selectedSource);
  }
  updateDownloadButton();
  renderSentencePreview();
  renderSentence();
  setUIState(state.uiState);
}

function buildIndexCsv() {
  const lines = ["id,soubor,text,datum,delka_sekund"];
  const sortedEntries = [...state.zipEntries.entries()].sort(([left], [right]) => left - right);

  for (const [index, entry] of sortedEntries) {
    lines.push([
      escapeCsvValue(entry.id || index + 1),
      escapeCsvValue(entry.fileName),
      escapeCsvValue(entry.text),
      escapeCsvValue(entry.recordedAt),
      entry.durationSeconds.toFixed(2)
    ].join(","));
  }

  return `\uFEFF${lines.join("\r\n")}`;
}

function renderSentencePreview() {
  previewMeta.textContent = t("previewMeta", state.sentences.length);

  if (state.sentences.length === 0) {
    sentencePreviewList.innerHTML = `<p class="preview-empty">${t("previewEmpty")}</p>`;
    return;
  }

  sentencePreviewList.innerHTML = state.sentences
    .map((sentence, index) => {
      const label = sentence.id || `${index + 1}.`;
      return `<div class="preview-item"><strong>${label}</strong><span>${sentence.text}</span></div>`;
    })
    .join("");
}

function renderSentence() {
  if (state.sentences.length === 0) {
    sentenceHeading.textContent = t("currentSentencePlaceholder");
    sentenceCounter.textContent = "0 / 0";
    progressFill.style.width = "0%";
    return;
  }

  sentenceHeading.textContent = state.sentences[state.currentSentenceIndex].text;
  sentenceCounter.textContent = `${state.currentSentenceIndex + 1} / ${state.sentences.length}`;
  progressFill.style.width = `${((state.currentSentenceIndex + 1) / state.sentences.length) * 100}%`;
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = waveformCanvas.getBoundingClientRect();
  const displayWidth = Math.max(Math.floor(rect.width || waveformCanvas.width), 320);
  const displayHeight = Math.max(Math.floor(rect.height || 220), 220);

  waveformCanvas.width = displayWidth * dpr;
  waveformCanvas.height = displayHeight * dpr;
  canvasContext.setTransform(1, 0, 0, 1, 0, 0);
  canvasContext.scale(dpr, dpr);
}

function setTheme(theme) {
  state.theme = theme;
  document.body.dataset.theme = theme;
  themeToggle.checked = theme === "light";
  drawWaveformPlaceholder();
}

function setAppMode(mode) {
  state.appMode = mode;
  const isSetup = mode === "setup";

  setupPanel.classList.toggle("is-hidden", !isSetup);
  sentencePanel.classList.toggle("is-hidden", isSetup);
  waveformPanel.classList.toggle("is-hidden", isSetup);
  controlPanel.classList.toggle("is-hidden", isSetup);
}

function setUIState(nextState) {
  state.uiState = nextState;

  startButton.classList.toggle("is-hidden", nextState !== "idle");
  skipButton.classList.toggle("is-hidden", nextState !== "idle");
  playButton.classList.toggle("is-hidden", nextState !== "review");
  saveButton.classList.toggle("is-hidden", nextState !== "review");
  retryButton.classList.toggle("is-hidden", nextState !== "review");

  const labelMap = {
    idle: "Idle",
    recording: "Recording",
    review: "Review"
  };

  statusPill.textContent = labelMap[nextState];
  statusPill.dataset.state = nextState;

  if (nextState === "idle") {
    statusMessage.textContent = t("statusIdle");
  } else if (nextState === "recording") {
    statusMessage.textContent = t("statusRecording", state.settings.silenceDurationMs);
  } else if (nextState === "review") {
    statusMessage.textContent = t("statusReview");
  }
}

function drawGrid(width, height) {
  const guideColor = state.theme === "light" ? "rgba(37, 37, 37, 0.08)" : "rgba(255, 255, 255, 0.08)";
  canvasContext.lineWidth = 1;
  canvasContext.strokeStyle = guideColor;

  for (let y = 24; y < height; y += 32) {
    canvasContext.beginPath();
    canvasContext.moveTo(0, y);
    canvasContext.lineTo(width, y);
    canvasContext.stroke();
  }
}

function drawWaveformPlaceholder() {
  const width = waveformCanvas.width / (window.devicePixelRatio || 1);
  const height = waveformCanvas.height / (window.devicePixelRatio || 1);

  canvasContext.clearRect(0, 0, width, height);
  drawGrid(width, height);

  const lineColor = state.theme === "light" ? "#8c543a" : "#c59d5f";
  canvasContext.lineWidth = 4;
  canvasContext.strokeStyle = lineColor;
  canvasContext.beginPath();

  const amplitude = height * 0.18;
  for (let x = 0; x <= width; x += 8) {
    const progress = x / width;
    const y = height / 2 + Math.sin(progress * Math.PI * 6) * amplitude * (0.35 + Math.sin(progress * Math.PI) ** 2);
    if (x === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }
  }

  canvasContext.stroke();
}

function drawLiveWaveform(dataArray) {
  const width = waveformCanvas.width / (window.devicePixelRatio || 1);
  const height = waveformCanvas.height / (window.devicePixelRatio || 1);
  const sliceWidth = width / (dataArray.length - 1);
  const lineColor = state.theme === "light" ? "#8c543a" : "#f0c98d";

  canvasContext.clearRect(0, 0, width, height);
  drawGrid(width, height);

  canvasContext.lineWidth = 3;
  canvasContext.strokeStyle = lineColor;
  canvasContext.beginPath();

  let x = 0;
  for (let index = 0; index < dataArray.length; index += 1) {
    const normalized = dataArray[index] / 128 - 1;
    const y = height / 2 + normalized * height * 0.32;

    if (index === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasContext.stroke();
}

function calculateRms(dataArray) {
  let total = 0;

  for (let index = 0; index < dataArray.length; index += 1) {
    const normalized = dataArray[index] / 128 - 1;
    total += normalized * normalized;
  }

  return Math.sqrt(total / dataArray.length);
}

function cleanupAudioGraph() {
  if (state.waveformFrameId) {
    cancelAnimationFrame(state.waveformFrameId);
    state.waveformFrameId = null;
  }

  if (state.sourceNode) {
    state.sourceNode.disconnect();
    state.sourceNode = null;
  }

  if (state.analyser) {
    state.analyser.disconnect();
    state.analyser = null;
  }

  if (state.mediaStream) {
    state.mediaStream.getTracks().forEach((track) => track.stop());
    state.mediaStream = null;
  }
}

async function ensureAudioContext() {
  if (!state.audioContext) {
    state.audioContext = new window.AudioContext();
  }

  if (state.audioContext.state === "suspended") {
    await state.audioContext.resume();
  }
}

async function decodeAudioBlob(blob) {
  await ensureAudioContext();
  const arrayBuffer = await blob.arrayBuffer();
  return state.audioContext.decodeAudioData(arrayBuffer.slice(0));
}

function interleaveChannels(audioBuffer) {
  const { numberOfChannels, length } = audioBuffer;

  if (numberOfChannels === 1) {
    return audioBuffer.getChannelData(0);
  }

  const interleaved = new Float32Array(length * numberOfChannels);
  let writeIndex = 0;

  for (let sampleIndex = 0; sampleIndex < length; sampleIndex += 1) {
    for (let channelIndex = 0; channelIndex < numberOfChannels; channelIndex += 1) {
      interleaved[writeIndex] = audioBuffer.getChannelData(channelIndex)[sampleIndex];
      writeIndex += 1;
    }
  }

  return interleaved;
}

function encodeWav(audioBuffer) {
  const channelData = interleaveChannels(audioBuffer);
  const bytesPerSample = 2;
  const blockAlign = audioBuffer.numberOfChannels * bytesPerSample;
  const buffer = new ArrayBuffer(44 + channelData.length * bytesPerSample);
  const view = new DataView(buffer);

  function writeString(offset, value) {
    for (let index = 0; index < value.length; index += 1) {
      view.setUint8(offset + index, value.charCodeAt(index));
    }
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + channelData.length * bytesPerSample, true);
  writeString(8, "WAVE");
  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, audioBuffer.numberOfChannels, true);
  view.setUint32(24, audioBuffer.sampleRate, true);
  view.setUint32(28, audioBuffer.sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeString(36, "data");
  view.setUint32(40, channelData.length * bytesPerSample, true);

  let offset = 44;
  for (let index = 0; index < channelData.length; index += 1) {
    const sample = Math.max(-1, Math.min(1, channelData[index]));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
    offset += bytesPerSample;
  }

  return new Blob([buffer], { type: "audio/wav" });
}

function discardCurrentRecording() {
  if (state.currentRecording && state.currentRecording.url) {
    URL.revokeObjectURL(state.currentRecording.url);
  }

  state.currentRecording = null;
}

function resetSessionProgress() {
  discardCurrentRecording();
  cleanupAudioGraph();
  state.currentSentenceIndex = 0;
  state.savedRecordings = [];
  state.zipEntries = new Map();
  state.zipFileCount = 0;
  renderSentence();
  renderSentencePreview();
  updateDownloadButton();
  updateTotalDuration();
}

function activateSentenceSet(sentences, sourceLabel) {
  state.sourceSentences = [...sentences];
  state.sentences = [...state.sourceSentences];
  state.selectedSource = sourceLabel;
  resetSessionProgress();
  updateSetupStatus(t("loadedSet", state.sentences.length, sourceLabel), true);
}

function reshuffleCurrentSet() {
  if (state.sourceSentences.length === 0) {
    return;
  }

  state.sentences = shuffleArray(state.sourceSentences);
  resetSessionProgress();
  updateSetupStatus(t("reshuffledSet", state.sentences.length, state.selectedSource), true);
}

async function loadSentenceSetFromUrl(url, sourceLabel) {
  updateSetupStatus(t("loadingSet"), false);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    const sentences = parseSentenceText(text);

    if (sentences.length === 0) {
      throw new Error("No sentences found");
    }

    activateSentenceSet(sentences, sourceLabel);
  } catch (error) {
    console.error("Sentence set loading failed:", error);
    updateSetupStatus(t("failedSet"), false);
  }
}

function loadSentenceSetFromFile(file) {
  if (!file) {
    return;
  }

  updateSetupStatus(t("loadingCustomSet"), false);
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    const sentences = parseSentenceText(reader.result || "");

    if (sentences.length === 0) {
      updateSetupStatus(t("emptySet"), false);
      return;
    }

    activateSentenceSet(sentences, file.name);
  });

  reader.addEventListener("error", () => {
    updateSetupStatus(t("failedFile"), false);
  });

  reader.readAsText(file, "utf-8");
}

function finalizeRecording() {
  const mimeType = state.mediaRecorder && state.mediaRecorder.mimeType ? state.mediaRecorder.mimeType : "audio/webm";
  const audioBlob = new Blob(state.chunks, { type: mimeType });

  if (state.currentRecording && state.currentRecording.url) {
    URL.revokeObjectURL(state.currentRecording.url);
  }

  state.currentRecording = {
    blob: audioBlob,
    url: URL.createObjectURL(audioBlob),
    sentence: state.sentences[state.currentSentenceIndex]
  };

  state.chunks = [];
  cleanupAudioGraph();
  setUIState("review");
  drawWaveformPlaceholder();
}

function monitorAudio() {
  if (!state.analyser || state.uiState !== "recording") {
    return;
  }

  const dataArray = new Uint8Array(state.analyser.fftSize);
  state.analyser.getByteTimeDomainData(dataArray);
  drawLiveWaveform(dataArray);

  const rms = calculateRms(dataArray);
  const now = performance.now();

  if (rms > SPEECH_THRESHOLD) {
    state.hasDetectedSpeech = true;
    state.silenceStartedAt = null;
  } else if (state.hasDetectedSpeech && rms < state.settings.rmsThreshold) {
    state.silenceStartedAt = state.silenceStartedAt || now;

    if (now - state.silenceStartedAt >= state.settings.silenceDurationMs) {
      stopRecording();
      return;
    }
  } else {
    state.silenceStartedAt = null;
  }

  state.waveformFrameId = requestAnimationFrame(monitorAudio);
}

async function startRecording() {
  if (state.sentences.length === 0) {
    statusMessage.textContent = t("chooseSetFirst");
    return;
  }

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
    statusMessage.textContent = t("mediaUnsupported");
    return;
  }

  try {
    await ensureAudioContext();
    cleanupAudioGraph();

    state.chunks = [];
    state.hasDetectedSpeech = false;
    state.silenceStartedAt = null;

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const sourceNode = state.audioContext.createMediaStreamSource(stream);
    const analyser = state.audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.85;

    sourceNode.connect(analyser);

    state.mediaStream = stream;
    state.sourceNode = sourceNode;
    state.analyser = analyser;
    state.mediaRecorder = new MediaRecorder(stream);

    state.mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data && event.data.size > 0) {
        state.chunks.push(event.data);
      }
    });

    state.mediaRecorder.addEventListener("stop", finalizeRecording, { once: true });
    state.mediaRecorder.start();
    setUIState("recording");
    monitorAudio();
  } catch (error) {
    cleanupAudioGraph();
    setUIState("idle");
    statusMessage.textContent = t("micFailed");
    console.error("Microphone start failed:", error);
  }
}

function stopRecording() {
  if (!state.mediaRecorder || state.mediaRecorder.state === "inactive") {
    return;
  }

  state.mediaRecorder.stop();
}

function playRecording() {
  if (!state.currentRecording) {
    return;
  }

  const previewAudio = new Audio(state.currentRecording.url);
  previewAudio.play().catch((error) => {
    console.error("Playback failed:", error);
    statusMessage.textContent = t("playbackFailed");
  });
}

async function saveRecording() {
  if (!state.currentRecording) {
    return;
  }

  saveButton.disabled = true;
  retryButton.disabled = true;
  playButton.disabled = true;
  statusMessage.textContent = t("preparingWav");

  try {
    const fileName = buildFileName(state.currentSentenceIndex, state.sentences[state.currentSentenceIndex]);
    const audioBuffer = await decodeAudioBlob(state.currentRecording.blob);
    const resampledAudioBuffer = await resampleAudioBuffer(audioBuffer, state.settings.sampleRate);
    const wavBlob = encodeWav(resampledAudioBuffer);
    const durationSeconds = resampledAudioBuffer.duration;
    const recordingDate = new Date().toISOString();

    state.savedRecordings[state.currentSentenceIndex] = state.currentRecording;
    state.zipEntries.set(state.currentSentenceIndex, {
      fileName,
      blob: wavBlob,
      id: state.sentences[state.currentSentenceIndex].id,
      text: state.sentences[state.currentSentenceIndex].text,
      recordedAt: recordingDate,
      durationSeconds
    });

    console.log("Recording added to ZIP session:", fileName);
    state.currentRecording = null;
    updateDownloadButton();
    updateTotalDuration();

    state.currentSentenceIndex = (state.currentSentenceIndex + 1) % state.sentences.length;
    renderSentence();
    setUIState("idle");
    drawWaveformPlaceholder();
  } catch (error) {
    console.error("Saving recording failed:", error);
    statusMessage.textContent = t("savingFailed");
    setUIState("review");
  } finally {
    saveButton.disabled = false;
    retryButton.disabled = false;
    playButton.disabled = false;
  }
}

function retryRecording() {
  discardCurrentRecording();
  setUIState("idle");
  drawWaveformPlaceholder();
}

function goToNextSentence() {
  if (state.uiState === "recording" || state.sentences.length === 0) {
    return;
  }

  discardCurrentRecording();
  state.currentSentenceIndex = (state.currentSentenceIndex + 1) % state.sentences.length;
  renderSentence();
  setUIState("idle");
  drawWaveformPlaceholder();
}

async function downloadZipArchive() {
  if (!window.JSZip || state.zipEntries.size === 0 || state.isZipGenerating) {
    return;
  }

  state.isZipGenerating = true;
  updateDownloadButton();
  startButton.disabled = true;
  skipButton.disabled = true;
  playButton.disabled = true;
  saveButton.disabled = true;
  retryButton.disabled = true;
  statusMessage.textContent = t("generatingZip");

  try {
    const zip = new window.JSZip();
    const recordingsFolder = zip.folder("recordings");
    const sortedEntries = [...state.zipEntries.entries()].sort(([left], [right]) => left - right);

    for (const [, entry] of sortedEntries) {
      recordingsFolder.file(entry.fileName, entry.blob);
    }

    recordingsFolder.file("index.csv", buildIndexCsv());

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const downloadUrl = URL.createObjectURL(zipBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "recordings.zip";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(downloadUrl);

    statusMessage.textContent = t("zipReady", state.zipEntries.size);
  } catch (error) {
    console.error("ZIP generation failed:", error);
    statusMessage.textContent = t("zipFailed");
  } finally {
    state.isZipGenerating = false;
    updateDownloadButton();
    startButton.disabled = false;
    skipButton.disabled = false;
    playButton.disabled = false;
    saveButton.disabled = false;
    retryButton.disabled = false;
  }
}

function startSession() {
  if (state.sentences.length === 0) {
    updateSetupStatus(t("loadSetFirst"), false);
    return;
  }

  state.currentSentenceIndex = 0;
  renderSentence();
  setUIState("idle");
  setAppMode("recording");
  drawWaveformPlaceholder();
}

loadDefaultCsButton.dataset.source = "default_cs.txt";
loadDefaultEnButton.dataset.source = "default_hds.txt";
customSentenceFile.closest(".setup-card").dataset.source = "custom";

themeToggle.addEventListener("change", (event) => {
  setTheme(event.target.checked ? "light" : "dark");
});
localeCsButton.addEventListener("click", () => {
  state.locale = "cs";
  persistLocale();
  applyTranslations();
});
localeEnButton.addEventListener("click", () => {
  state.locale = "en";
  persistLocale();
  applyTranslations();
});
settingsButton.addEventListener("click", () => setSettingsOpen(true));
closeSettingsButton.addEventListener("click", () => setSettingsOpen(false));
settingsBackdrop.addEventListener("click", () => setSettingsOpen(false));
silenceDurationRange.addEventListener("input", (event) => {
  state.settings.silenceDurationMs = Number.parseInt(event.target.value, 10);
  silenceDurationValue.textContent = `${state.settings.silenceDurationMs} ms`;
  persistSettings();
});
rmsThresholdRange.addEventListener("input", (event) => {
  state.settings.rmsThreshold = Number.parseFloat(event.target.value);
  rmsThresholdValue.textContent = state.settings.rmsThreshold.toFixed(3);
  persistSettings();
});
fileNameTemplateInput.addEventListener("input", (event) => {
  state.settings.fileNameTemplate = event.target.value.trim() || "Sentence{index5}.wav";
  persistSettings();
});
sampleRateSelect.addEventListener("change", (event) => {
  const nextRate = Number.parseInt(event.target.value, 10);
  if (nextRate === 24000 || nextRate === 48000) {
    state.settings.sampleRate = nextRate;
    persistSettings();
  }
});

loadDefaultCsButton.addEventListener("click", async () => {
  highlightSelectedSource("default_cs.txt");
  await loadSentenceSetFromUrl("./sentences/default_cs.txt", "default_cs.txt");
});

loadDefaultEnButton.addEventListener("click", async () => {
  highlightSelectedSource("default_hds.txt");
  await loadSentenceSetFromUrl("./sentences/default_hds.txt", "HDS");
});

customSentenceFile.addEventListener("change", (event) => {
  highlightSelectedSource("custom");
  loadSentenceSetFromFile(event.target.files[0]);
});

beginSessionButton.addEventListener("click", startSession);
reshuffleButton.addEventListener("click", reshuffleCurrentSet);
startButton.addEventListener("click", startRecording);
skipButton.addEventListener("click", goToNextSentence);
playButton.addEventListener("click", playRecording);
saveButton.addEventListener("click", saveRecording);
retryButton.addEventListener("click", retryRecording);
downloadZipButton.addEventListener("click", downloadZipArchive);

window.addEventListener("resize", () => {
  resizeCanvas();
  if (state.uiState !== "recording") {
    drawWaveformPlaceholder();
  }
});

if (window.ResizeObserver) {
  state.resizeObserver = new ResizeObserver(() => {
    resizeCanvas();
    if (state.uiState !== "recording") {
      drawWaveformPlaceholder();
    }
  });
  state.resizeObserver.observe(waveformPanel);
}

window.addEventListener("beforeunload", (event) => {
  if (!hasUnsavedWork()) {
    return;
  }

  event.preventDefault();
  event.returnValue = "";
});

loadSettings();
resizeCanvas();
renderSentence();
renderSentencePreview();
updateSetupStatus(t("noSetLoaded"), false);
setUIState("idle");
setAppMode("setup");
setTheme("dark");
syncSettingsUI();
applyTranslations();
updateDownloadButton();
updateTotalDuration();
