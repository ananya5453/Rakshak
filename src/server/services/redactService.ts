/**
 * Service to sanitize and redact sensitive personally identifiable information (PII)
 * before logging or passing to external processors.
 * Protects credit cards, Aadhaar, PAN, CVV, OTPs, and passwords.
 */

export function redactSensitiveData(text: string): string {
  if (!text) return '';

  let sanitized = text;

  // 16-digit Card numbers (grouped or ungrouped)
  sanitized = sanitized.replace(/\b(?:\d{4}[ -]?){3}\d{4}\b/g, (match) => {
    const cleaned = match.replace(/[ -]/g, '');
    return `${cleaned.slice(0, 4)} XXXX XXXX ${cleaned.slice(-4)}`;
  });

  // 12-digit Indian Aadhaar number (e.g. 1234 5678 9012)
  sanitized = sanitized.replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4}\b/g, 'XXXX-XXXX-XXXX');

  // Indian PAN number (5 letters, 4 digits, 1 letter: e.g. ABCDE1234F)
  sanitized = sanitized.replace(/\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/gi, 'XXXXX1234X');

  // 4-6 digit OTP or PIN mentions
  sanitized = sanitized.replace(/(?:otp|one time password|pin|upi pin|cvv)[\s:=-]+(\d{4,6})\b/gi, (match) => {
    return match.replace(/\d{4,6}/, '[REDACTED_OTP]');
  });

  // Passwords mentioned in text
  sanitized = sanitized.replace(/(?:password|passcode)[\s:=-]+(\S+)/gi, (match, p1) => {
    return match.replace(p1, '[REDACTED_PASSWORD]');
  });

  return sanitized;
}
