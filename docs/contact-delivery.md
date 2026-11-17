# Contact delivery and legal pages

## Destination and provider

The public contact address is `kaue@ruon.dev`. The server validates and prepares submissions; the browser sends them directly to Web3Forms, as required by its free plan; the recipient is bound to the Web3Forms access key, not a client-supplied address. Replies use the visitor's validated email address.

1. Create or select a form for `kaue@ruon.dev` at https://app.web3forms.com/ and complete the email verification.
2. In the portfolio's Vercel project, configure `WEB3FORMS_ACCESS_KEY` for Production. For Preview use a separate test form/key if possible. This is a public form ID and is returned only with a validated submission; never commit it or paste it into a ticket/chat.
3. Redeploy after changing environment variables. Set the provider's domain restriction to the intended production domain if supported by the selected plan; include approved preview domains only when needed.
4. Send a clearly labelled test through the deployed contact form. Verify it arrives in the recipient inbox (check spam), that the subject is correct and that Reply targets the visitor's address. A provider acceptance response is not proof of inbox delivery.
5. Check the failure state with a missing/invalid key in a non-production environment. Keep the footer email available as fallback.

## Implemented safeguards

Server-side type, email and length validation; browser delivery to the provider; honeypot rejection; same-origin check when Origin is present; explicit provider success verification; 15-second browser delivery timeout; no message/key/provider-body logging. The in-memory rate limiter is bounded and temporary, but is per server instance and does not replace distributed abuse protection or provider filtering. No minimum fill time or keyword-based silent drops.

## Legal maintenance

Routes: `/{locale}/privacidade` and `/{locale}/termos`, in Portuguese and English. Copy: `src/lib/legal-copy.ts`. Update the date and wording whenever providers, purposes, retention or browser storage change. The controller must apply the stated mailbox retention and handle privacy requests; text alone does not implement those operational obligations.

The form notice informs users of the reply purpose and links to the policy. It does not bundle marketing consent or require a blanket agreement to unrelated processing.

Sources checked on 2026-11-17:

- LGPD, updated text: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
- ANPD rights: https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares
- Provider configuration: https://docs.web3forms.com/getting-started/installation
- Provider privacy, retention and international processing: https://web3forms.com/privacy

Reference for the required browser transport: https://docs.web3forms.com/getting-started/troubleshooting

## Verification record

Automated tests mock the external provider and do not send email. The Web3Forms form was created for the verified account kaue@ruon.dev. Recipient, sender name and subject were configured. WEB3FORMS_ACCESS_KEY was updated for Production and Preview through the authenticated Vercel dashboard after its required verification; the dashboard confirmed the update. No key is committed. Server-to-provider calls were blocked locally and in production. Official troubleshooting documentation confirms the free plan requires client-side requests. Delivery was corrected to run from the browser after server validation. Check the browser delivery receipt and inbox after deployment.

## Concise legal revision

The public privacy text is approximately 460 Portuguese words, organised into seven topics with an index. Terms use six short topics. The notice identifies the controller, data, purposes, legal grounds, provider roles, international processing, retention, functional storage and a free rights channel. There is no blanket browsing consent, arbitrary waiver of mandatory rights, automatic marketing subscription or claim that publishing a policy guarantees compliance.

Additional references checked on 2026-11-17:
- ANPD privacy notice structure: https://www.gov.br/anpd/pt-br/acesso-a-informacao/aviso-de-privacidade
- Spaceship/Spacemail privacy: https://www.spaceship.com/legal/privacy-policy/
- Vercel privacy notice: https://vercel.com/legal/privacy-notice

Retention at Web3Forms was observed as three years in its settings. Mailbox deletion is an operational responsibility, not an automated feature of this site. International-transfer safeguards must be supported by applicable provider contracts; this text does not certify them.
