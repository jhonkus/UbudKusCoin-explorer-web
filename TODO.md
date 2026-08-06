# Code Quality & Maintainability Refactor

Progress tracker for the improvement plan.

### Phase 1 - API error handling (DONE)
- [x] Create `lib/apiHelper.js` with `runGrpc` + `ensureMethod`
- [x] Refactored all API routes to use the shared helper (blocks, block/hash, block/height, txns, txns/block, txns/pending, accounts, address, chart, infos/bcinfo, infos/poolinfo, txn, search)
- [x] Removed duplicate `res.json`/`res.end` crash patterns

### Phase 2 - Search status bug (DONE)
- [x] Standardized `client.Search` to return `status: 'ok'` / `'not_found'`
- [x] Verified SearchBox checks for `status === 'ok'`

### Phase 3 - Dead code & utils consolidation (DONE)
- [x] Removed commented-out code in table components
- [x] Consolidated `formatTotalTxns` -> alias of `formatTotalReward`
- [x] Fixed `toDate` zero-padding
- [x] Typed `utils/util.ts`, `utils/normalize.ts`
- [x] Removed Redux dead code in `useFetch.ts` (kept store for future use)

### Phase 4 - Type safety (DONE)
- [x] Created `types/index.ts` (Block, Txn, Account, BcInfo, PoolInfo, ChartPoint, SearchResult)
- [x] Typed all hooks in `grpc/useFetch.ts`
- [x] Typed normalizers in `utils/normalize.ts`

### Phase 5 - Modern Next.js patterns (DONE)
- [x] Converted list pages to `getServerSideProps` + typed props
- [x] Pagination converted to `next/link`
- [x] Removed `getInitialProps` from `txns/[hash].tsx` and `blocks/hash/[hash].tsx`

### Phase 6 - Shared Breadcrumb (DONE)
- [x] Created `components/Breadcrumb/index.tsx`
- [x] Applied to blocks, accounts, txns, txns/pending, address, txns/[hash]

### Verification (DONE)
- [x] `tsc --noEmit` passes
- [x] Clean up unused `Link` imports on converted pages
- [x] Removed fully-unused Redux store (`redux/` folder + `<Provider>` in `_app.tsx`)

