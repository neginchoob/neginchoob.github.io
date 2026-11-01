# نگین چوب قائم | آلبوم محصولات

نسخه‌ی استاتیک سایت، بدون دیتابیس و بدون Supabase. عکس‌ها داخل خود پروژه هستند، پس سایت هیچ‌وقت pause نمی‌شود.

## ساختار

- `public/textures/` عکس‌ها، در پوشه‌های `melamine`، `parquet`، `export` و `thumbnails`
- `src/data/textures.json` لیست طرح‌ها (نام فارسی، کد، دسته، مسیر عکس)
- `src/data/categories.json` دسته‌ها و تامبنیل‌ها

## اضافه کردن طرح جدید

1. عکس را در پوشه‌ی دسته‌ی مربوط در `public/textures/` بگذارید (مثلاً `public/textures/parquet/oak-9.jpg`).
2. یک ردیف به بالای `src/data/textures.json` اضافه کنید:

```json
{ "id": "oak-9", "category": "parquet", "name": "بلوط", "code": "Oak-9", "image": "parquet/oak-9.jpg" }
```

`id` باید یکتا باشد. طرح‌های بالای فایل اول نمایش داده می‌شوند.

## اجرا و ساخت

```bash
npm install
npm run dev      # پیش‌نمایش محلی
npm run build    # خروجی نهایی در پوشه‌ی dist
```

## انتشار روی Netlify

سایت روی همان آدرس قبلی منتشر می‌شود: `inspiring-frangollo-38bb7c.netlify.app`

1. `npm run build`
2. در داشبورد Netlify وارد سایت `inspiring-frangollo-38bb7c` شوید و به تب **Deploys** بروید.
3. پوشه‌ی `dist` را روی کادر «Drag and drop your site output folder here» بکشید.

فایل `public/_redirects` باعث می‌شود همه‌ی آدرس‌های قبلی، مثل `/gallery/export` که در QR کدها چاپ شده، همچنان کار کنند. آدرس `/admin` هم به صفحه‌ی اصلی هدایت می‌شود.

## GitHub Pages

هر بار که روی شاخه‌ی `main` تغییری push شود، GitHub Actions سایت را خودکار می‌سازد و روی GitHub Pages منتشر می‌کند (فایل `.github/workflows/pages.yml`).

برای ساخت نسخه‌ی cPanel یا هر هاستی که سایت در ریشه‌ی دامنه است، فقط `npm run build` کافی است.
برای زیرپوشه: `BASE_PATH=/negin-choob/ npm run build`
