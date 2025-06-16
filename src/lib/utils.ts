export function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(" ");
  }

export function timeAgo(dateString: string) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
    const now = new Date()
    const date = new Date(dateString)
    const diff = (now - date) / 1000 // in seconds
  
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    }
  
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const delta = Math.floor(diff / secondsInUnit)
      if (delta >= 1) {
        return rtf.format(-delta, unit)
      }
    }
  
    return 'just now'
  }