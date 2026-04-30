/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly RESEND_API_KEY?: string;
  readonly FROM_EMAIL?: string;
  readonly PDF_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
