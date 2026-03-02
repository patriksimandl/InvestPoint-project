export function handleRateLimitError(error: any) {
  if (error?.response?.status === 429) {
    window.dispatchEvent(new Event('rateLimitError'));
  }
}
