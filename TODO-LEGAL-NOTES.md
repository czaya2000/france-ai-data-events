# Legal pages: notes for TODO-OWNER.md and DECISIONS.md (workstream B)

## For DECISIONS.md
- **No postal address (owner's accepted risk).** LCEN (loi n° 2004-575, art. 6 III-2) lets a non-professional individual publisher keep their postal address private, provided the identity details were given to the host and the host's name/denomination and address are published. The mentions légales therefore name Marcin Czajkowski (éditeur non professionnel, directeur de la publication), the contact email and form, and the host: GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA (address cross-checked against GitHub's own site). No mediation statement beyond "nothing is sold, so L. 611-1 ff. Code de la consommation does not apply".
- Legal pages are written fresh for French law (LCEN, RGPD, loi Informatique et Libertés, CNIL), not translated from the German Impressum. Provider facts (DPF/SCC, retention, reCAPTCHA in FormSubmit) are carried over from the German privacy page research, which cites each provider's public documentation.
- CNIL address given as "3 place de Fontenoy, 75007 Paris" (verified on cnil.fr); the "TSA 80715 / Cedex 07" postal-complaint form was not verified and is left out.

## For TODO-OWNER.md (owner to confirm; none is a placeholder on the public pages)
1. Mentions légales say you gave your identity details to GitHub (art. 6 III-2). That is true through your GitHub account, but check the name/address on your GitHub account profile/billing are your real details. Art. 6 III-2 text (as recalled) asks only for the host's name and address, not its phone number; confirm with a French lawyer if you want certainty.
2. The privacy policy says the Umami database at Supabase is in the EU region (per your brief). Confirm the Supabase project region when you set up the site in Umami.
3. Privacy policy describes Umami as "when enabled": no website ID is configured yet, so no script is emitted. Once you add the ID nothing in the text needs changing.
4. Not legal advice; have a French-speaking jurist or the native French review skim both pages once.
5. FormSubmit still publishes no hosting location / DPA / transfer mechanism (2019 policy); the policy says so openly. Consider replacing it later if that is a concern.
