import { UrlAnalysis } from '../../types.ts';

const OFFICIAL_INDIAN_DOMAINS: Record<string, string[]> = {
  sbi: ['sbi.co.in', 'onlinesbi.sbi', 'statebankofindia.com', 'bank.sbi'],
  hdfc: ['hdfcbank.com', 'hdfc.com'],
  icici: ['icicibank.com', 'icicidirect.com'],
  axis: ['axisbank.com'],
  pnb: ['pnbindia.in'],
  bob: ['bankofbaroda.in'],
  kotak: ['kotak.com'],
  'india post': ['indiapost.gov.in', 'postal.gov.in'],
  speedpost: ['indiapost.gov.in'],
  aadhaar: ['uidai.gov.in', 'myaadhaar.uidai.gov.in'],
  pan: ['incometax.gov.in', 'utiitsl.com', 'protean-tinpan.com'],
  'income tax': ['incometax.gov.in'],
  bescom: ['bescom.karnataka.gov.in', 'karnataka.gov.in'],
  mahavitaran: ['mahadiscom.in'],
  uppcl: ['upenergy.in'],
  parivahan: ['parivahan.gov.in', 'echallan.parivahan.gov.in'],
  paytm: ['paytm.com'],
  phonepe: ['phonepe.com'],
  googlepay: ['pay.google.com', 'google.com'],
  jio: ['jio.com'],
  airtel: ['airtel.in'],
  trai: ['trai.gov.in']
};

const SUSPICIOUS_TLDS = [
  'xyz', 'top', 'work', 'fit', 'live', 'click', 'site', 'vip', 'link',
  'cc', 'tk', 'ml', 'ga', 'cf', 'gq', 'monster', 'rest', 'buzz', 'icu',
  'space', 'racing', 'online', 'loan', 'download', 'support', 'bid'
];

const SHORTENERS = [
  'bit.ly', 'tinyurl.com', 'cutt.ly', 'rb.gy', 'is.gd', 't.ly', 'ow.ly',
  'buff.ly', 'shorturl.at', 'bl.ink', 'rebrand.ly'
];

export function analyzeUrl(rawUrl: string, messageContext = ''): UrlAnalysis {
  let cleaned = rawUrl.trim();
  if (!/^https?:\/\//i.test(cleaned)) {
    cleaned = 'http://' + cleaned;
  }

  let parsed: URL;
  try {
    parsed = new URL(cleaned);
  } catch {
    return {
      url: rawUrl,
      domain: rawUrl,
      isHttps: false,
      hasSuspiciousTld: false,
      isShortened: false,
      isIpAddress: false,
      brandMismatch: false,
      notes: ['Invalid or unparseable URL syntax. Treat with extreme caution.']
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const isHttps = parsed.protocol.toLowerCase() === 'https:';
  const notes: string[] = [];

  // Check IP address format
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIpAddress) {
    notes.push('The link uses a raw numerical IP address instead of a recognized organization domain name.');
  }

  // Check URL shortener
  const isShortened = SHORTENERS.some((s) => hostname === s || hostname.endsWith('.' + s));
  if (isShortened) {
    notes.push('This is a shortened link (e.g. bit.ly/tinyurl). Shortened links hide the real destination address.');
  }

  // Check suspicious TLDs
  const parts = hostname.split('.');
  const tld = parts[parts.length - 1];
  const hasSuspiciousTld = SUSPICIOUS_TLDS.includes(tld);
  if (hasSuspiciousTld) {
    notes.push(`Uses a high-risk or low-cost top-level domain (.${tld}) rarely used by official institutions or banks.`);
  }

  // Check APK download in pathname
  if (parsed.pathname.toLowerCase().endsWith('.apk')) {
    notes.push('The link directly triggers an Android Application (.apk) download, which can install malware or remote control spyware.');
  }

  // Check brand mismatch
  let brandMismatch = false;
  let claimedBrand: string | undefined;

  const combinedContext = (rawUrl + ' ' + messageContext).toLowerCase();

  for (const [brand, officialDomains] of Object.entries(OFFICIAL_INDIAN_DOMAINS)) {
    if (combinedContext.includes(brand)) {
      claimedBrand = brand.toUpperCase();
      const isOfficial = officialDomains.some((d) => hostname === d || hostname.endsWith('.' + d));
      if (!isOfficial) {
        brandMismatch = true;
        notes.push(
          `The message references ${claimedBrand}, but the website address "${hostname}" does NOT belong to ${claimedBrand}'s official verified domain(s) (${officialDomains.join(', ')}).`
        );
        break;
      }
    }
  }

  // Excessive hyphens or subdomains check
  if (hostname.split('-').length > 3) {
    notes.push('The web address contains excessive hyphens, a common trick used to mimic genuine institution names.');
  }

  if (parts.length > 4) {
    notes.push('Excessive subdomains detected. Scammers frequently stack domain labels to disguise the true host.');
  }

  if (!isHttps) {
    notes.push('The link does not use secure HTTPS encryption.');
  }

  return {
    url: rawUrl,
    domain: hostname,
    isHttps,
    hasSuspiciousTld,
    isShortened,
    isIpAddress,
    brandMismatch,
    claimedBrand,
    notes
  };
}
