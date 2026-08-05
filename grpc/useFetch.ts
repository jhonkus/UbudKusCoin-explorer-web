import useSWR from "swr"
import {
    normalizeAccount,
    normalizeArray,
    normalizeBlock,
    normalizeChartPoint,
    normalizeSearchResult,
    normalizeTxn,
} from "../utils/normalize"
const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())


export function getBlock(height = '1') {
    const { data, error } = useSWR(`/api/block/height/${height}`, fetcher)
    return {
        block: normalizeBlock(data?.block ?? data?.Block),
        isLast: Boolean(data?.isLast ?? data?.IsLast),
        isLoading: !error && !data,
        isError: error
    }
}


export function GetBlockByHash(hash = 'hash') {
    const { data, error } = useSWR(`/api/block/hash/${hash}`, fetcher)
    return {
        block: normalizeBlock(data?.block ?? data?.Block),
        isLast: Boolean(data?.isLast ?? data?.IsLast),
        isLoading: !error && !data,
        isError: error
    }
}

export function getAccount(address = 'address') {
    const { data, error } = useSWR(`/api/address/${address}`, fetcher)
    const transactions = normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn);
    const blocks = normalizeArray(data?.blocks ?? data?.Blocks, normalizeBlock);
    return {
        transactions,
        blocks,
        balance: Number(data?.balance ?? data?.Balance ?? 0),
        numBlockValidate: Number(data?.numBlockValidate ?? data?.NumBlockValidate ?? 0),
        isLoading: !error && !data,
        isError: error
    }
}

export function getTxn(hash = 'hash') {
    const { data, error } = useSWR(`/api/txn/${hash}`, fetcher)
    return {
        txn: normalizeTxn(data?.txn ?? data?.Txn),
        isLoading: !error && !data,
        isError: error
    }
}


export function getBlocks(page = 1, numOfRow = 10) {
    // const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/blocks/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    // if (!error && data?.blocks) {
    //     dispatch(saveBlocks(data?.blocks))
    // }
    return {
        blocks: normalizeArray(data?.blocks ?? data?.Blocks, normalizeBlock),
        isLoading: !error && !data,
        isError: error
    }
}

export function getAccounts(page = 1, numOfRow = 10) {
    // const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/accounts/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    // if (!error && data?.blocks) {
    //     dispatch(saveBlocks(data?.blocks))
    // }
    return {
        accounts: normalizeArray(data?.accounts ?? data?.Accounts, normalizeAccount),
        isLoading: !error && !data,
        isError: error
    }
}


export function GetTxnsByHeight(height = '0') {
    // const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/txns/block/${height}`, fetcher, { refreshInterval: 30000 })
    // if (!error && data?.transactions) {
    //     dispatch(saveTransactions(data?.transactions))
    // }
    return {
        transactions: normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn),
        isLoading: !error && !data,
        isError: error
    }
}

export function getTxns(page = 1, numOfRow = 10) {
    // const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/txns/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    // if (!error && data?.transactions) {
    //     dispatch(saveTransactions(data?.transactions))
    // }
    return {
        transactions: normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn),
        isLoading: !error && !data,
        isError: error
    }
}


export function getPendingTxns() {
    const { data, error } = useSWR(`/api/txns/pending`, fetcher, { refreshInterval: 3000 })
    return {
        transactions: normalizeArray(data?.transactions ?? data?.Transactions, normalizeTxn),
        isLoading: !error && !data,
        isError: error
    }
}

export function getChart() {
    const { data, error } = useSWR(`/api/chart`, fetcher, { refreshInterval: 15000 })
    return {
        data: normalizeArray(data?.datas ?? data?.Datas ?? data?.data, normalizeChartPoint),
        isLoading: !error && !data,
        isError: error
    }
}


export function getBcInfo() {
    const { data, error } = useSWR(`/api/infos/bcinfo`, fetcher, { refreshInterval: 15000 })
    return {
        bcInfos: data ? {
            ...data,
            txns: normalizeArray(data?.txns ?? data?.Txns, normalizeTxn),
            blocks: normalizeArray(data?.blocks ?? data?.Blocks, normalizeBlock),
            NumBloks: Number(data?.NumBloks ?? data?.numBloks ?? data?.NumBlocks ?? 0),
            NumTxns: Number(data?.NumTxns ?? data?.numTxns ?? data?.NumTransactions ?? 0),
            AmountTxns: Number(data?.AmountTxns ?? data?.amountTxns ?? 0),
            AmountReward: Number(data?.AmountReward ?? data?.amountReward ?? 0),
            Tps: Number(data?.Tps ?? data?.tps ?? 0),
            NumAcc: Number(data?.NumAcc ?? data?.numAcc ?? 0),
        } : data,
        isBCLoading: !error && !data,
        isBcError: error
    }
}

export function getPoolInfo() {
    const { data, error } = useSWR(`/api/infos/poolinfo`, fetcher, { refreshInterval: 2000 })
    return {
        poolInfos: data ? {
            ...data,
            NumPool: Number(data?.NumPool ?? data?.numPool ?? 0),
            AmountPool: Number(data?.AmountPool ?? data?.amountPool ?? 0),
        } : data,
        isPoolLoading: !error && !data,
        isPoolError: error
    }
}
