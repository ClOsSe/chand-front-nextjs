# Chand Front Next.js
Address : https://chand-front-nextjs.webinaexpert.workers.dev
رابط کاربری وب Chand برای نمایش و پیگیری قیمت بازارهای مالی. پروژه با App Router در Next.js ساخته شده، مسیرهای چندزبانه دارد و برای استقرار روی Cloudflare Workers از OpenNext استفاده می‌کند.

## امکانات اصلی

- نمایش لیست توکن‌ها و قیمت‌های آخرین بازار
- نمودار کوچک داخل لیست و نمودار کامل جزئیات با Recharts
- ورود، ثبت‌نام، خروج و فراموشی رمز عبور
- محافظت مسیرهای اصلی با cookie به نام `token`
- پشتیبانی از زبان فارسی و انگلیسی با مسیرهای locale دار
- پشتیبانی از RTL برای فارسی و LTR برای انگلیسی
- تغییر تم روشن/تاریک
- تنظیم نوع نمایش لیست، رنگ تغییر قیمت، نوع تقویم و فیلتر توکن‌های منتخب
- نگهداری تنظیمات کاربر در Redux و `localStorage`
- API route داخلی برای proxy کردن درخواست‌ها به backend
- آماده برای build و deploy روی Cloudflare Workers

## تکنولوژی‌ها

| بخش | ابزار |
| --- | --- |
| Framework | Next.js `15.5.18` |
| UI Runtime | React `19.2.6`, React DOM `19.2.6` |
| زبان | TypeScript `5` |
| Styling | Tailwind CSS `4`, `@tailwindcss/postcss` |
| i18n | next-intl `4.11.0` |
| Theme | next-themes |
| State | Redux Toolkit, React Redux |
| Server State | TanStack React Query |
| HTTP Client | Axios |
| Form | React Hook Form, Zod, `@hookform/resolvers` |
| Chart | Recharts |
| Icons | lucide-react |
| Toast | Sonner |
| Lint | ESLint `9`, eslint-config-next |
| Deploy | OpenNext Cloudflare, Wrangler |

## پیش‌نیازها

نسخه Next.js نصب‌شده با این نسخه‌های Node سازگار است:

```txt
^18.18.0 || ^19.8.0 || >=20.0.0
```

برای هماهنگی با `package-lock.json` از npm استفاده شده است.

## راه‌اندازی

```bash
npm install
npm run dev
```

برنامه به صورت پیش‌فرض روی آدرس زیر اجرا می‌شود:

```txt
http://localhost:3000
```

## متغیرهای محیطی

پروژه برای proxy کردن درخواست‌ها به backend به متغیر زیر نیاز دارد:

```env
NEXT_PUBLIC_API_BASE_URL=https://example.com
```

نسخه برنامه از `package.json` خوانده می‌شود و در `next.config.ts` با نام زیر در دسترس کلاینت قرار می‌گیرد:

```txt
NEXT_PUBLIC_APP_VERSION
```

## اسکریپت‌ها

| دستور | کاربرد |
| --- | --- |
| `npm run dev` | اجرای development server |
| `npm run build` | ساخت production build با Next.js |
| `npm run start` | اجرای build تولیدی Next.js |
| `npm run lint` | اجرای ESLint |
| `npm run preview` | build با OpenNext و اجرای local worker با Wrangler |
| `npm run deploy` | build با OpenNext و deploy روی Cloudflare Workers |

## ساختار پروژه

```txt
.
|-- public/
|   `-- fav.png
|-- src/
|   |-- app/
|   |   |-- [locale]/
|   |   |   |-- (auth)/
|   |   |   |-- (main)/
|   |   |   `-- layout.tsx
|   |   |-- api/
|   |   |-- globals.css
|   |   `-- layout.tsx
|   |-- components/
|   |   |-- layout/
|   |   |-- price/
|   |   |-- theme/
|   |   `-- ui/
|   |-- config/
|   |-- features/
|   |-- i18n/
|   |-- lib/
|   |-- locales/
|   |-- providers/
|   |-- services/
|   |-- store/
|   `-- types/
|-- next.config.ts
|-- open-next.config.ts
|-- wrangler.jsonc
|-- tsconfig.json
`-- eslint.config.mjs
```

## Routing

پروژه از App Router استفاده می‌کند. مسیرهای اصلی داخل `src/app` قرار دارند.

```txt
src/app/layout.tsx
src/app/[locale]/layout.tsx
src/app/[locale]/(main)/layout.tsx
src/app/[locale]/(main)/page.tsx
src/app/[locale]/(auth)/layout.tsx
src/app/[locale]/(auth)/login/page.tsx
src/app/[locale]/(auth)/register/page.tsx
src/app/[locale]/(auth)/forget/page.tsx
```

مسیرهای locale دار:

```txt
/fa
/en
/fa/login
/en/login
/fa/register
/en/register
/fa/forget
/en/forget
```

صفحه اصلی با `dynamic = "force-dynamic"` تعریف شده تا داده قیمت‌ها به صورت پویا دریافت شود.

## Internationalization

زبان‌های فعال در `src/config/i18n.ts` تعریف شده‌اند:

```ts
export const locales = ["fa", "en"] as const;
export const defaultLocale = "en";
```

فایل‌های ترجمه:

```txt
src/locales/fa.json
src/locales/en.json
```

تنظیمات next-intl:

```txt
src/i18n/request.ts
src/i18n/navigation.ts
src/middleware.ts
```

برای لینک، router و redirect باید از خروجی‌های `src/i18n/navigation.ts` استفاده شود تا مسیرها با locale فعلی هماهنگ بمانند.

## Middleware و دسترسی

فایل `src/middleware.ts` دو مسئولیت اصلی دارد:

- اضافه و مدیریت کردن locale با `next-intl/middleware`
- کنترل دسترسی با cookie به نام `token`

مسیرهای عمومی:

```txt
/login
/register
/forget
```

اگر کاربر token نداشته باشد و وارد مسیرهای اصلی شود، به `/{locale}/login` هدایت می‌شود. اگر کاربر token داشته باشد و وارد صفحات auth شود، به `/{locale}` هدایت می‌شود.

## Layout و Providerها

`src/app/layout.tsx` ریشه HTML، favicon و فایل global CSS را تعریف می‌کند.

`src/app/[locale]/layout.tsx` مسئول موارد زیر است:

- اعتبارسنجی locale
- تنظیم locale برای request
- دریافت پیام‌های ترجمه
- تنظیم جهت زبان با `dir`
- اضافه کردن providerهای سراسری
- اضافه کردن `Toaster` از Sonner

Providerهای اصلی در `src/providers/app` قرار دارند:

```txt
src/providers/app/index.tsx
src/providers/app/redux-provider.tsx
src/providers/app/react-query-provider.tsx
src/providers/app/theme-provider.tsx
```

ترکیب providerها:

```txt
ReduxProvider
ReactQueryProvider
ThemeProvider
```

## State Management

Redux store در مسیر زیر تعریف شده است:

```txt
src/store/store.ts
```

sliceهای فعلی:

| Slice | کاربرد |
| --- | --- |
| `settings` | تقویم، مدل نمایش، رنگ تغییر قیمت و توکن‌های منتخب |
| `app` | state عمومی برنامه |

hookهای تایپ‌شده Redux:

```ts
import { useAppDispatch, useAppSelector } from "@/store/hooks";
```

تنظیمات کاربر در `settings.slice.ts` از `localStorage` خوانده می‌شوند و در کامپوننت‌های مربوطه دوباره ذخیره می‌شوند.

## Data Fetching

React Query برای درخواست‌ها، cache و وضعیت loading/error استفاده می‌شود.

تنظیم QueryClient:

```txt
src/lib/react-query/query-client.ts
```

query مربوط به قیمت‌ها:

```txt
src/services/price.queries.ts
```

تنظیمات فعلی query قیمت‌ها:

```txt
staleTime: 10 minutes
refetchOnMount: always
```

mutationهای auth:

```txt
src/services/auth/auth.queries.ts
```

## API و Backend Proxy

کلاینت Axios در `src/services/api.ts` تعریف شده است. `baseURL` فعلا خالی است و درخواست‌ها به API route داخلی Next.js ارسال می‌شوند.

API routeهای داخلی:

```txt
src/app/api/auth/login/route.ts
src/app/api/auth/register/route.ts
src/app/api/auth/logout/route.ts
src/app/api/auth/forgot-password/route.ts
src/app/api/prices/latest/route.ts
```

این routeها درخواست را به backend مشخص‌شده در `NEXT_PUBLIC_API_BASE_URL` ارسال می‌کنند.

رفتار auth:

- `login` و `register` در صورت دریافت token از backend، cookie به نام `token` تنظیم می‌کنند.
- cookie به صورت `httpOnly` و `sameSite: "lax"` تنظیم می‌شود.
- `logout` cookie را حذف می‌کند.
- `prices/latest` token را از cookie می‌خواند و به backend پاس می‌دهد.

مدیریت خطاهای API:

```txt
src/services/api-error.ts
src/app/api/_utils/proxy-error.ts
```

## Price Feature

کامپوننت‌های قیمت در مسیر زیر هستند:

```txt
src/components/price/
```

فایل‌های اصلی:

| فایل | کاربرد |
| --- | --- |
| `token-list.tsx` | دریافت و نمایش لیست توکن‌ها |
| `price-symmary.tsx` | نمایش قیمت آخر و تغییر قیمت |
| `mini-price-chart.tsx` | نمودار کوچک داخل هر آیتم |
| `main-price-chart.tsx` | bottom sheet جزئیات توکن |
| `full-price-chart.tsx` | نمودار کامل قیمت |

typeهای قیمت:

```txt
src/types/price.ts
```

utilityهای قیمت:

```txt
src/lib/price/chart-data.ts
src/lib/price/format-price.ts
src/lib/price/token-icon.ts
src/lib/price/token-key.ts
```

## Layout Components

کامپوننت‌های layout:

```txt
src/components/layout/header/
src/components/layout/footer/
```

Header شامل عنوان برنامه و تقویم است. تقویم با dynamic import و `ssr: false` بارگذاری می‌شود.

Footer شامل منو، زمان آخرین بروزرسانی و انتخاب توکن‌هاست.

منوی Footer از این فایل‌ها ساخته شده است:

```txt
src/components/layout/footer/menu/menu.items.ts
src/components/layout/footer/menu/menu.tsx
src/components/layout/footer/menu/menu-row.tsx
src/components/layout/footer/menu/submenu.tsx
src/components/layout/footer/menu/menu.types.ts
```

قابلیت‌های منو:

- تغییر theme
- تغییر زبان
- تغییر مدل نمایش
- تغییر رنگ نمایش تغییر قیمت
- تغییر نوع تقویم
- خروج از حساب
- لینک‌های social و website
- نمایش نسخه برنامه از `NEXT_PUBLIC_APP_VERSION`

## Styling

استایل سراسری در این فایل قرار دارد:

```txt
src/app/globals.css
```

Tailwind CSS 4 با دستور زیر فعال شده است:

```css
@import "tailwindcss";
```

رنگ‌های اصلی پروژه با CSS variables تعریف شده‌اند و برای حالت `.dark` مقدارهای جداگانه دارند. helper ترکیب کلاس‌ها:

```ts
import { cn } from "@/lib/utils";
```

## TypeScript و Alias

Alias اصلی پروژه در `tsconfig.json`:

```json
{
  "@/*": ["./src/*"]
}
```

گزینه `strict` فعال است و module resolution روی `bundler` تنظیم شده است.

## Cloudflare

پروژه برای Cloudflare Workers پیکربندی شده است.

فایل‌های مرتبط:

```txt
open-next.config.ts
wrangler.jsonc
```

build و preview:

```bash
npm run preview
```

deploy:

```bash
npm run deploy
```

در `wrangler.jsonc` خروجی OpenNext از مسیرهای زیر خوانده می‌شود:

```txt
.open-next/worker.js
.open-next/assets
```

compatibility date فعلی:

```txt
2026-05-09
```

## نکات توسعه

- قبل از تغییرات مرتبط با Next.js، دستورهای `AGENTS.md` را رعایت کنید و اگر مستندات محلی Next در `node_modules/next/dist/docs/` موجود بود، همان نسخه را مبنا قرار دهید.
- فایل‌های route در App Router به صورت پیش‌فرض Server Component هستند.
- هر کامپوننتی که از state، effect، event handler، Redux hook، React Query hook، `next-themes` یا browser API استفاده می‌کند باید `"use client"` داشته باشد.
- برای navigation چندزبانه از `@/i18n/navigation` استفاده کنید.
- برای requestهای backend از API routeهای داخلی استفاده شده تا token و خطاها یکجا مدیریت شوند.
- برای اضافه کردن زبان جدید باید `src/config/i18n.ts`، فایل ترجمه در `src/locales` و منطق direction در layout بررسی شود.
- برای اضافه کردن تنظیمات جدید کاربر، type مربوطه را در `src/types/settings.ts` و slice را در `src/store/slices/settings.slice.ts` بروزرسانی کنید.
