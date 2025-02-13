import { writable } from 'svelte/store'

export function createAccessibilityStore() {
  const defaultSettings = {
    contrast: false,
    fontSize: 100,
    textSpacing: 1,
    lineHeight: 1.5,
    animations: true,
    images: true,
    dyslexiaFont: false,
    cursorSize: 'default',
    saturation: 100,
    tooltips: true,
    textAlign: 'left',
    highlight: false
  }

  const { subscribe, set, update } = writable(defaultSettings)

  // Load saved settings
  const savedSettings = localStorage.getItem('accessibilitySettings')
  if (savedSettings) {
    set({ ...defaultSettings, ...JSON.parse(savedSettings) })
  }

  return {
    subscribe,
    updateSetting: (key, value) => {
      update(settings => {
        const newSettings = { ...settings, [key]: value }
        localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings))
        applySettings(newSettings)
        return newSettings
      })
    }
  }
}

function applySettings(settings) {
  document.documentElement.style.setProperty('--font-size', `${settings.fontSize}%`)
  document.documentElement.style.setProperty('--text-spacing', `${settings.textSpacing}em`)
  document.documentElement.style.setProperty('--line-height', settings.lineHeight)
  document.documentElement.style.setProperty('--saturation', `${settings.saturation}%`)
  
  document.body.classList.toggle('high-contrast', settings.contrast)
  document.body.classList.toggle('dyslexia-friendly', settings.dyslexiaFont)
  document.body.classList.toggle('no-animations', !settings.animations)
  document.body.classList.toggle('hide-images', !settings.images)
  document.body.classList.toggle('show-tooltips', settings.tooltips)
  document.body.classList.toggle('highlight-focus', settings.highlight)
  
  document.body.style.cursor = settings.cursorSize
  document.body.style.textAlign = settings.textAlign
}
