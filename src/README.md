# Chand Front Next.js

مستندات داخلی سورس پروژه `chand-front-nextjs`.

این پروژه یک اپلیکیشن Next.js برای نمایش و مدیریت رابط کاربری مرتبط با بازارهای مالی است. ساختار فعلی روی App Router، مسیرهای چندزبانه، theme، Redux و React Query بنا شده است.

## Tech Stack

- Next.js `16.2.5`
- React `19.2.4`
- TypeScript
- Tailwind CSS `4`
- next-intl برای i18n
- next-themes برای dark/light theme
- Redux Toolkit و React Redux برای state سراسری
- TanStack React Query برای data fetching/cache
- lucide-react برای آیکن‌ها

## Routing

مسیرهای اصلی داخل `src/app` قرار دارند.

```txt
src/app/
  globals.css
  [locale]/
    layout.tsx
    page.tsx
```

پروژه از route segment داینامیک `[locale]` استفاده می‌کند. localeهای معتبر در `src/config/i18n.ts` تعریف شده‌اند:

```ts
export const locales = ["fa", "en"] as const;
export const defaultLocale = "en";
```

در Next.js 16، مقدار `params.locale` از سمت typeهای خود Next به صورت `string` وارد می‌شود. برای همین ابتدا مقدار با `isLocale` اعتبارسنجی می‌شود و بعد به عنوان locale معتبر استفاده می‌شود.

## Internationalization

فایل‌های ترجمه در مسیر زیر هستند:

```txt
src/locales/en.json
src/locales/fa.json
```

تنظیمات next-intl در این فایل‌ها قرار دارد:

```txt
src/i18n/request.ts
src/i18n/navigation.ts
src/proxy.ts
```

`src/proxy.ts` مسیرهای بدون locale را طبق تنظیمات `next-intl` به مسیر localeدار هدایت می‌کند. در layout لوکال، مقدارهای `lang` و `dir` روی خود تگ `html` تنظیم می‌شوند تا RTL/LTR برای مرورگر، accessibility و SEO درست باشد.

## Providers

Providerهای سراسری پروژه در `src/providers/app` قرار دارند:

```txt
src/providers/app/
  index.tsx
  redux-provider.tsx
  react-query-provider.tsx
  theme-provider.tsx
```

`AppProviders` این providerها را ترکیب می‌کند:

- `ReduxProvider`
- `ReactQueryProvider`
- `ThemeProvider`

این ترکیب در `src/app/[locale]/layout.tsx` استفاده می‌شود.

## State Management

Redux store در مسیر زیر تعریف شده است:

```txt
src/store/store.ts
```

sliceهای فعلی:

- `settings`: نگهداری تنظیمات کاربر مثل نوع تقویم
- `app`: state عمومی اپلیکیشن

برای استفاده از Redux در کامپوننت‌ها، از hookهای typed استفاده شود:

```ts
import { useAppDispatch, useAppSelector } from "@/store/hooks";
```

## React Query

تنظیمات QueryClient در این فایل قرار دارد:

```txt
src/lib/react-query/query-client.ts
```

تنظیمات فعلی:

- `retry: 1`
- `refetchOnWindowFocus: false`

## Styling

استایل‌های global در `src/app/globals.css` قرار دارند. Tailwind CSS از طریق `@import "tailwindcss"` فعال شده است.

رنگ‌های اصلی پروژه با CSS variables تعریف شده‌اند، از جمله:

- `--background`
- `--foreground`
- `--menu-bg`
- `--menu-fg`
- `--menu-border`
- `--submenu-bg`
- `--submenu-fg`
- `--submenu-active-bg`
- `--submenu-active-fg`
- `--btnForeground`

برای ترکیب classها از helper زیر استفاده می‌شود:

```ts
import { cn } from "@/lib/utils";
```

## Layout Components

کامپوننت‌های layout در مسیر زیر هستند:

```txt
src/components/layout/
  header/
  footer/
```

Header شامل عنوان و تقویم است. Footer شامل menu، وضعیت و country selector است. منوی footer در مسیر زیر تفکیک شده است:

```txt
src/components/layout/footer/menu/
  menu.tsx
  menu-row.tsx
  submenu.tsx
  menu.items.ts
  menu.types.ts
```

تعریف آیتم‌های منو در `menu.items.ts` انجام می‌شود و رفتار هر آیتم از طریق `onClick` و `isActive` کنترل می‌شود.

## Utilities

utilityهای عمومی در `src/lib/utils` قرار دارند:

- `cn.ts`: ترکیب `clsx` و `tailwind-merge`
- `format-date.ts`: فرمت تاریخ با تقویم Gregorian یا Jalali

## Commands

اجرای پروژه در حالت development:

```bash
npm run dev
```

بررسی lint:

```bash
npm run lint
```

ساخت production build:

```bash
npm run build
```

اجرای build production:

```bash
npm run start
```

## Development Notes

- فایل‌های route در App Router به صورت پیش‌فرض Server Component هستند.
- هر کامپوننتی که از state، effect، event handler، Redux hook، next-themes یا browser API استفاده می‌کند باید `"use client"` داشته باشد.
- برای navigation locale-aware از خروجی‌های `src/i18n/navigation.ts` استفاده شود، نه مستقیم از `next/link` یا `next/navigation`.
- برای اضافه کردن locale جدید، باید `locales`، فایل JSON ترجمه و direction مربوط به آن در layout بررسی و به‌روزرسانی شوند.
- قبل از تغییرات ساختاری در Next.js، مستندات همین نسخه در `node_modules/next/dist/docs/` بررسی شود.
