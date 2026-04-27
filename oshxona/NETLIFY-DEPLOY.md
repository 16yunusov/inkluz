# Taste of Uzbekistan – Netlify’ga qanday qo‘yish

## 1-usul: Drag & Drop (eng oson)

1. **https://app.netlify.com** saytiga kiring va hisobingizga kiring (bepul ro‘yxatdan o‘tishingiz mumkin).
2. **“Add new site”** → **“Deploy manually”** ni tanlang.
3. **“Deploy”** qismida quyidagi fayllarni **bitta papkada** tashlang (o‘sha papkani tortib tashlash):
   - `index.html`
   - `admin.html`
   - `404.html`
   - `styles.css`
   - `not.js`
   - `admin.js`
   - `sitemap.xml`
   - `robots.txt`
   - `netlify.toml` (ixtiyoriy)

   **Muhim:** Faqat shu fayllar bo‘lgan yangi papka yarating (masalan, `oshxona-deploy`), ichiga nusxa qo‘ying va shu papkani Netlify’ga tortib tashlang. Yoki butun `oshxona` papkani tashlang – Netlify keraksiz fayllarni ignore qiladi.

4. Deploy tugagach, **“Site URL”** (masalan, `https://random-name-12345.netlify.app`) – bu sizning sayt linkingiz.

---

## 2-usul: Netlify CLI (terminal orqali)

1. Terminalda loyiha papkasiga o‘ting:
   ```bash
   cd C:\Users\User\Desktop\oshxona
   ```

2. Netlify’ga kiring (birinchi marta brauzer ochiladi):
   ```bash
   npx netlify login
   ```

3. Saytni deploy qiling:
   ```bash
   npx netlify deploy --prod --dir=.
   ```

4. So‘ralganda **“Create & configure a new site”** ni tanlang va jamoa/ sayt nomini tasdiqlang.

5. Tugagach, terminalda **“Website URL”** ko‘rsatiladi – bu sizning link.

---

## 3-usul: GitHub orqali (avtomatik yangilanish)

1. Loyihani **GitHub**’ga yuklang (repo yarating va `git push` qiling).
2. **https://app.netlify.com** → **“Add new site”** → **“Import an existing project”**.
3. **GitHub**’ni ulang va `oshxona` reponi tanlang.
4. **Build settings:**
   - Build command: bo‘sh qoldiring yoki `echo Deploy`
   - Publish directory: **.**
5. **Deploy** bosing. Har safar `git push` qilganingizda sayt avtomatik yangilanadi.
6. Sayt linki **Site overview** → **Domain** da (masalan, `https://your-site-name.netlify.app`).

---

## Linkni o‘zgartirish

- Netlify **Site configuration** → **Domain management** dan:
  - Bepul subdomen: `sitename.netlify.app` ni o‘zgartirishingiz mumkin.
  - O‘z domeningizni ulash ham mumkin.
