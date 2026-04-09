/**
 * Lightweight activity logger for museum kiosk troubleshooting.
 *
 * Logs are written to console.log with [ACTIVITY] / [PHASE] / [ERROR] prefixes.
 * The Electron main process captures these and writes them to logs/activity.log.
 *
 * In a browser (non-Electron) they just appear in the browser console.
 */

let sessionId = Date.now().toString(36);

export function logPhase(phase: string, details?: Record<string, unknown>) {
  const msg = details
    ? `[PHASE] ${phase} | ${JSON.stringify(details)}`
    : `[PHASE] ${phase}`;
  console.log(msg);
}

export function logActivity(action: string, details?: Record<string, unknown>) {
  const msg = details
    ? `[ACTIVITY] ${action} | ${JSON.stringify(details)}`
    : `[ACTIVITY] ${action}`;
  console.log(msg);
}

export function logError(context: string, error: unknown) {
  const errMsg = error instanceof Error ? `${error.message}\n${error.stack}` : String(error);
  console.log(`[ERROR] ${context} | ${errMsg}`);
}

export function logSession(event: 'start' | 'reset') {
  if (event === 'start') {
    sessionId = Date.now().toString(36);
  }
  console.log(`[ACTIVITY] session-${event} | sessionId=${sessionId}`);
}
