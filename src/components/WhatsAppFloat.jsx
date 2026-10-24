import { site, waLink } from '../siteConfig.js';

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink(`Hello ${site.company}, I would like to enquire about auto spare parts.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-lg ring-2 ring-white"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.3L1 23l5.8-1.1A11 11 0 0 0 21.9 8.7a10.9 10.9 0 0 0-1.4-5.2zM12 20.4a9.3 9.3 0 0 1-4.7-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.4 9.4 0 1 1 12 20.4zm5.4-7c-.3-.1-1.7-.8-2-.9s-.5-.2-.7.1-.8.9-1 1-.4.2-.7 0a7.7 7.7 0 0 1-2.3-1.4 8.5 8.5 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6.2-.3 0-.3-.7-1.7c-.2-.4-.4-.4-.7-.4h-.6a1.2 1.2 0 0 0-.8.4 3.5 3.5 0 0 0-1.1 2.6 6.1 6.1 0 0 0 1.3 3.2 13.9 13.9 0 0 0 5.4 4.7 6.2 6.2 0 0 0 3.5.8 3 3 0 0 0 2-1.3 2.4 2.4 0 0 0 .2-1.3c-.1-.2-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}
