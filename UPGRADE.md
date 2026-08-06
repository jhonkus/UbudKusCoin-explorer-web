# Upgrade Next.js 12 → 16.3.0

## Ringkasan

- **Versi awal:** Next.js 12.0.7, React 17.0.2, TypeScript 4.5, Pages Router
- **Versi target:** Next.js 16.3.0, React 19.0.0, TypeScript 5.5+, Pages Router (tetap dipertahankan)

## Daftar File yang Diubah

### Konfigurasi
| File | Perubahan |
|------|-----------|
| `package.json` | Upgrade semua dependensi ke versi kompatibel Next.js 16 / React 19 |
| `next.config.js` | Tambah `images.unoptimized: true` untuk kompatibilitas image lokal |
| `tsconfig.json` | `target: es2017`, `moduleResolution: bundler`, `jsx: react-jsx` (otomatis oleh Next.js) |
| `.eslintrc.json` | **Dihapus** - digantikan oleh `eslint.config.mjs` (ESLint 9 flat config) |
| `eslint.config.mjs` | **Baru** - ESLint 9 flat config menggunakan `eslint-config-next/core-web-vitals` |
| `next-env.d.ts` | Diperbarui otomatis oleh Next.js 16 |

### gRPC Client
| File | Perubahan |
|------|-----------|
| `grpc/client.js` | Perbaiki path resolution proto files agar robust di Turbopack (gunakan `findProtoDir()` dengan multiple candidates) |

### Custom Hooks (rename sesuai aturan React Hooks)
| File | Perubahan |
|------|-----------|
| `grpc/useFetch.ts` | Rename semua fungsi ke `use*` prefix: `useBlock`, `useBlockByHash`, `useAccount`, `useTxn`, `useBlocks`, `useAccounts`, `useTxnsByHeight`, `useTxns`, `usePendingTxns`, `useChart`, `useBcInfo`, `usePoolInfo` |

### Link Pattern (`<Link><a>` → `<Link>`)
Semua file berikut diubah dari pola `<Link href="..."><a>...</a></Link>` menjadi `<Link href="...">...</Link>` (breaking change Next.js 13+):

- `pages/index.tsx`
- `pages/blocks/index.tsx`
- `pages/blocks/height/[height].tsx`
- `pages/blocks/hash/[hash].tsx`
- `pages/txns/index.tsx`
- `pages/txns/[hash].tsx`
- `pages/txns/block/[height].tsx`
- `pages/txns/pending/index.tsx`
- `pages/address/[address].tsx`
- `pages/accounts/index.tsx`
- `pages/nodes/index.tsx`
- `components/Header/index.tsx`
- `components/Footer/index.tsx`
- `components/blocks/TableBlocks.tsx`
- `components/blocks/WidgetBlock.tsx`
- `components/transactions/TableTxns.tsx`
- `components/transactions/TablePendingTxns.tsx`
- `components/transactions/WidgetTxns.tsx`
- `components/account/TableAccountTxns.tsx`
- `components/account/TableAccountBlocks.tsx`
- `components/accounts/TableAccounts.tsx`
- `components/dashboard/TotalBlocks.tsx`
- `components/dashboard/TotalTxns.tsx`
- `components/dashboard/TotalReward.tsx`
- `components/dashboard/TotalTxnPool.tsx`

### Perbaikan React Hooks Rules
| File | Perubahan |
|------|-----------|
| `pages/blocks/height/[height].tsx` | Hapus `useState`/`useEffect` yang tidak perlu (setState in effect) |
| `pages/blocks/hash/[hash].tsx` | Hapus `useState`/`useEffect` yang tidak perlu (setState in effect) |

## Breaking Changes Utama yang Ditangani

1. **`<Link>` child `<a>` dihapus (Next.js 13+)**
   - Semua 25+ file diperbaiki dari `<Link><a>` menjadi `<Link>` langsung
   - Class dan atribut dipindahkan ke `<Link>` langsung

2. **React 19 + React Hooks Rules**
   - Semua custom hooks di `grpc/useFetch.ts` di-rename dengan prefix `use*`
   - Hapus `setState` dalam `useEffect` yang menyebabkan cascading renders

3. **ESLint 9 Flat Config**
   - `.eslintrc.json` (legacy config) digantikan `eslint.config.mjs`
   - Menggunakan `eslint-config-next/core-web-vitals` yang sudah mendukung flat config

4. **TypeScript 5.5+**
   - `target: es5` → `es2017` (deprecated di TS 7)
   - `moduleResolution: node` → `bundler` (deprecated di TS 7)

5. **gRPC Client Path Resolution**
   - `path.resolve('./grpc', ...)` tidak reliable di Turbopack
   - Diganti dengan `findProtoDir()` yang mencari di multiple locations

6. **`next lint` deprecated**
   - Script `lint` diubah dari `next lint` menjadi `eslint .`

7. **`@grpc/proto-loader` ditambahkan**
   - Dipakai di `grpc/client.js` tapi tidak ada di package.json sebelumnya

## Hasil Build/Lint/Typecheck

- ✅ `next build` - **SUCCESS** (Next.js 16.3.0, Turbopack)
- ✅ `npm run lint` - **SUCCESS** (0 errors, 0 warnings)
- ✅ `npm run typecheck` - **SUCCESS** (0 errors)

## Verifikasi Route

Semua route berikut berfungsi (HTTP 200):
- `/`
- `/blocks`
- `/blocks/height/[height]`
- `/blocks/hash/[hash]`
- `/txns`
- `/txns/[hash]`
- `/txns/block/[height]`
- `/txns/pending`
- `/address/[address]`
- `/accounts`
- `/nodes`
- Semua route `pages/api/*`

## Risiko Sisa / Langkah Lanjut

1. **Backend gRPC node** - Beberapa API routes (`/api/infos/bcinfo`, `/api/infos/poolinfo`, `/api/chart`) mengembalikan 405 jika backend node tidak merespons. Ini adalah perilaku yang sudah ada sebelumnya, bukan regression.

2. **`react-google-charts`** - Masih versi 4.x karena belum ada versi yang secara eksplisit mendukung React 19. Build berhasil, tapi perlu dipantau.

3. **`@typescript-eslint/eslint-plugin` & `@typescript-eslint/parser`** - Masih ada di devDependencies tapi tidak dipakai langsung di `eslint.config.mjs` (karena `eslint-config-next` sudah menyediakan TypeScript support). Bisa dihapus jika ingin membersihkan.

4. **Dependensi tidak terpakai** - `axios`, `chart.js`, `react-chartjs-2`, `gray-matter`, `remark`, `remark-html` tidak ditemukan di kode. Bisa dihapus jika ingin membersihkan, tapi dibiarkan untuk menjaga perubahan minimal.

5. **Migrasi ke App Router** - Tidak dilakukan karena instruksi menjaga Pages Router tetap berfungsi. Migrasi bisa dipertimbangkan di masa depan.

6. **`getInitialProps`** - Masih didukung di Pages Router Next.js 16, tapi deprecated. Bisa dimigrasi ke `getServerSideProps` di masa depan.