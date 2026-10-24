# Deploying partsmbz.com (GitHub Pages + Hostinger DNS)

Every push to `main` builds the site and publishes it automatically (`.github/workflows/deploy.yml`).

## One-time GitHub setup
1. Repo > Settings > Pages > Source: **GitHub Actions**.
2. Same page > Custom domain: `partsmbz.com` > Save. Tick **Enforce HTTPS** once it becomes available.

## Hostinger DNS (hPanel > Domains > partsmbz.com > DNS / Nameservers > DNS records)
Delete any existing A, AAAA or CNAME records for `@` and `www` first (Hostinger adds parking records by default), then add:

| Type  | Name | Value                    |
|-------|------|--------------------------|
| A     | @    | 185.199.108.153          |
| A     | @    | 185.199.109.153          |
| A     | @    | 185.199.110.153          |
| A     | @    | 185.199.111.153          |
| AAAA  | @    | 2606:50c0:8000::153      |
| AAAA  | @    | 2606:50c0:8001::153      |
| AAAA  | @    | 2606:50c0:8002::153      |
| AAAA  | @    | 2606:50c0:8003::153      |
| CNAME | www  | mbzparts85.github.io     |

Keep any MX/TXT records if you use email on this domain. Domain must use Hostinger's nameservers for these records to apply.

## Local work
`npm install`, `npm run dev` to preview, `npm run build` to test the production build.
`public/CNAME` must stay: it keeps the custom domain set on every deploy.
