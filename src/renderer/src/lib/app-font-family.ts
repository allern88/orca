import { DEFAULT_APP_FONT_FAMILY } from '../../../shared/constants'

// Why: Geist covers Latin only; system CJK faces render before generic sans so
// zh/ja/ko UI copy matches platform conventions without a per-locale font switch.
const APP_FONT_SCRIPT_FALLBACKS = [
  'PingFang SC',
  'Hiragino Sans GB',
  'Microsoft YaHei',
  'Apple SD Gothic Neo',
  'Malgun Gothic',
  'Yu Gothic UI',
  'Hiragino Sans',
  'Noto Sans SC',
  'Noto Sans JP',
  'Noto Sans KR'
] as const

const APP_FONT_FALLBACKS = [
  DEFAULT_APP_FONT_FAMILY,
  ...APP_FONT_SCRIPT_FALLBACKS,
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'sans-serif'
] as const

const CSS_FONT_KEYWORDS = new Set([
  'serif',
  'sans-serif',
  'monospace',
  'cursive',
  'fantasy',
  'system-ui',
  'blinkmacsystemfont'
])

function quoteFontFamily(fontFamily: string): string {
  if (fontFamily.startsWith('-') || CSS_FONT_KEYWORDS.has(fontFamily.toLowerCase())) {
    return fontFamily
  }
  return JSON.stringify(fontFamily)
}

export function buildAppFontFamily(fontFamily: string | null | undefined): string {
  const trimmed = fontFamily?.trim() || DEFAULT_APP_FONT_FAMILY
  const lowerTrimmed = trimmed.toLowerCase()
  const parts = [
    trimmed,
    ...APP_FONT_FALLBACKS.filter((fallback) => fallback.toLowerCase() !== lowerTrimmed)
  ]
  return parts.map(quoteFontFamily).join(', ')
}
