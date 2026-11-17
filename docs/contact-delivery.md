# Contact delivery and legal pages

## Destination and provider

The public contact address is `kaue@ruon.dev`. The server forwards validated submissions to Web3Forms; the recipient is bound to the Web3Forms access key, not a client-supplied address. Replies use the visitor's validated email address.

1. Create or select a form for `kaue@ruon.dev` at https://app.web3forms.com/ and complete the email verification.
2. In the portfolio's Vercel project, configure `WEB3FORMS_ACCESS_KEY` for Production. For Preview use a separate test form/key if possible. Keep the value server-side; never commit it or paste it into a ticket/chat.
3. Redeploy after changing environment variables. Set the provider's domain restriction to the intended production domain if supported by the selected plan; include approved preview domains only when needed.
4. Send a clearly labelled test through the deployed contact form. Verify it arrives in the recipient inbox (check spam), that the subject is correct and that Reply targets the visitor's address. A provider acceptance response is not proof of inbox delivery.
5. Check the failure state with a missing/invalid key in a non-production environment. Keep the footer email available as fallback.

## Implemented safeguards

Server-side type, email and length validation; honeypot rejection; same-origin check when Origin is present; explicit provider success verification; 10-second provider timeout; no message/key/provider-body logging. The in-memory rate limiter is bounded and temporary, but is per server instance and does not replace distributed abuse protection or provider filtering. No minimum fill time or keyword-based silent drops.

## Legal maintenance

Routes: `/{locale}/privacidade` and `/{locale}/termos`, in Portuguese and English. Copy: `src/lib/legal-copy.ts`. Update the date and wording whenever providers, purposes, retention or browser storage change. The controller must apply the stated mailbox retention and handle privacy requests; text alone does not implement those operational obligations.

The form notice informs users of the reply purpose and links to the policy. It does not bundle marketing consent or require a blanket agreement to unrelated processing.

Sources checked on 2026-11-17:

- LGPD, updated text: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
- ANPD rights: https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares
- Provider configuration: https://docs.web3forms.com/getting-started/installation
- Provider privacy, retention and international processing: https://web3forms.com/privacy

## Verification record

Automated tests mock the external provider and do not send email. Live inbox delivery remains pending until the key, recipient verification and deployed form test are confirmed. The connected Vercel API returned 403 when listing environment metadata; no Vercel CLI was installed in the current environment. No production configuration or delivery has been verified in this session.
