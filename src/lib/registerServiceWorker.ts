export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === 'undefined') return null;
  if (!('serviceWorker' in navigator)) return null;
  try {
    const registration = await navigator.serviceWorker.register('/sw.js');
    // Ensure this page is controlled (Safari often needs one reload after first install)
    if (!navigator.serviceWorker.controller) {
      const alreadyReloaded = sessionStorage.getItem('sw-reloaded');
      if (!alreadyReloaded) {
        sessionStorage.setItem('sw-reloaded', '1');
        location.reload();
      }
    }
    // Unregister any legacy service workers that might conflict
    try {
      const regs = await navigator.serviceWorker.getRegistrations();
      const ourUrl = new URL('/sw.js', location.origin).href;
      await Promise.all(
        regs
          .filter((r) => (r as any).active && (r as any).active.scriptURL && (r as any).active.scriptURL !== ourUrl)
          .map((r) => r.unregister())
      );
    } catch {}
    return registration;
  } catch (err) {
    console.error('Service worker registration failed', err);
    return null;
  }
}


