import useSWR from "swr"
import type { Account, BcInfo, Block, ChartPoint, PoolInfo, Txn } from "../types"
import {
    normalizeAccount,
    normalizeArray,
    normalizeBlock,
    normalizeChartPoint,
    normalizeTxn,
} from "../utils/normalize"

const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())

interface ListResult<T> {
    isLoading: boolean;
    isError: any;
}

export interface BlockResult extends ListResult<Block> {
    block: Block | null;
    isLast: boolean;
}

export function useBlock(height = '1'): BlockResult {
    const { data, error } = useSWR(`/api/block/height/${height}`, fetcher)
    return {
        block: normalizeBlock(data?.block ?? data?.Block),
        isLast: Boolean(data?.isLast ?? data?.IsLast),
        isLoading: !error && !data,
        isError: error
    }
}


export function useBlockByHash(hash = 'hash'): BlockResult {
    const { data, error } = useSWR(`/api/block/hash/${hash}`, fetcher)
    return {
        block: normalizeBlock(data?.block ?? data?.Block),
        isLast: Boolean(data?.isLast ?? data?.IsLast),
        isLoading: !error && !data,
        isError: error
    }
}

export interface AccountResult extends ListResult<Account> {
    transactions: Txn[];
    blocks: Block[];
    balance: number;
    numBlockValidate: number;
    exists: boolean;
}

export function useAccount(address?: string): AccountResult {
    const key = address ? `/api/address/${encodeURIComponent(address)}` : null;
    const { data, error } = useSWR(key, fetcher)
    const transactions = normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn);
    const blocks = normalizeArray(data?.blocks ?? data?.Blocks, normalizeBlock);
    return {
        transactions,
        blocks,
        balance: Number(data?.balance ?? data?.Balance ?? 0),
        numBlockValidate: Number(data?.numBlockValidate ?? data?.NumBlockValidate ?? 0),
        exists: Boolean(data?.exists ?? data?.Exists),
        isLoading: Boolean(address) ? !error && !data : true,
        isError: error
    }
}

export interface TxnResult extends ListResult<Txn> {
    txn: Txn | null;
}

export function useTxn(hash = 'hash'): TxnResult {
    const { data, error } = useSWR(`/api/txn/${hash}`, fetcher)
    return {
        txn: normalizeTxn(data?.txn ?? data?.Txn),
        isLoading: !error && !data,
        isError: error
    }
}

export interface BlocksResult extends ListResult<Block> {
    blocks: Block[];
}

export function useBlocks(page = 1, numOfRow = 10): BlocksResult {
    const { data, error } = useSWR(`/api/blocks/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    return {
        blocks: normalizeArray(data?.blocks ?? data?.Blocks, normalizeBlock),
        isLoading: !error && !data,
        isError: error
    }
}

export interface AccountsResult extends ListResult<Account> {
    accounts: Account[];
}

export function useAccounts(page = 1, numOfRow = 10): AccountsResult {
    const { data, error } = useSWR(`/api/accounts/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    return {
        accounts: normalizeArray(data?.accounts ?? data?.Accounts, normalizeAccount),
        isLoading: !error && !data,
        isError: error
    }
}

export interface TxnsResult extends ListResult<Txn> {
    transactions: Txn[];
}

export function useTxnsByHeight(height = '0'): TxnsResult {
    const { data, error } = useSWR(`/api/txns/block/${height}`, fetcher, { refreshInterval: 30000 })
    return {
        transactions: normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn),
        isLoading: !error && !data,
        isError: error
    }
}

export function useTxns(page = 1, numOfRow = 10): TxnsResult {
    const { data, error } = useSWR(`/api/txns/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    return {
        transactions: normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn),
        isLoading: !error && !data,
        isError: error
    }
}

export function usePendingTxns(): TxnsResult {
    const { data, error } = useSWR(`/api/txns/pending`, fetcher, { refreshInterval: 3000 })
    return {
        transactions: normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn),
        isLoading: !error && !data,
        isError: error
    }
}

export interface ChartResult extends ListResult<ChartPoint> {
    data: ChartPoint[];
}

export function useChart(): ChartResult {
    const { data, error } = useSWR(`/api/chart`, fetcher, { refreshInterval: 15000 })
    return {
        data: normalizeArray(data?.datas ?? data?.Datas ?? data?.data, normalizeChartPoint),
        isLoading: !error && !data,
        isError: error
    }
}

export interface BcInfoResult {
    bcInfos: BcInfo | undefined;
    isBCLoading: boolean;
    isBcError: any;
}

export function useBcInfo(): BcInfoResult {
    const { data, error } = useSWR(`/api/infos/bcinfo`, fetcher, { refreshInterval: 15000 })
    const points = normalizeArray(data?.datas ?? data?.Datas ?? data?.data, normalizeChartPoint);
    const tps = points.length >= 2 ? points[points.length - 1].transaction_count / ((points[points.length - 1].timestamp - points[0].timestamp) / 1000) : 0;
    return {
        bcInfos: data ? {
            ...data,
            txns: normalizeArray(data?.txns ?? data?.Txns, normalizeTxn),
            blocks: normalizeArray(data?.blocks ?? data?.Blocks, normalizeBlock),
            NumBloks: Number(data?.NumBloks ?? data?.numBloks ?? data?.NumBlocks ?? 0),
            NumTxns: Number(data?.NumTxns ?? data?.numTxns ?? data?.NumTransactions ?? 0),
            AmountTxns: Number(data?.AmountTxns ?? data?.amountTxns ?? 0),
            AmountReward: Number(data?.AmountReward ?? data?.amountReward ?? 0),
            Tps: Number.isFinite(tps) ? tps : 0,
            NumAcc: Number(data?.NumAcc ?? data?.numAcc ?? 0),
        } as BcInfo : data,
        isBCLoading: !error && !data,
        isBcError: error
    }
}

export interface PoolInfoResult {
    poolInfos: PoolInfo | undefined;
    isPoolLoading: boolean;
    isPoolError: any;
}

export function usePoolInfo(): PoolInfoResult {
    const { data, error } = useSWR(`/api/infos/poolinfo`, fetcher, { refreshInterval: 2000 })
    return {
        poolInfos: data ? {
            ...data,
            NumPool: Number(data?.NumPool ?? data?.numPool ?? 0),
            AmountPool: Number(data?.AmountPool ?? data?.amountPool ?? 0),
        } as PoolInfo : data,
        isPoolLoading: !error && !data,
        isPoolError: error
    }
}
