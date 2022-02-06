import useSWR from "swr"
const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())


export function getBlock(height = '1') {
    const { data, error } = useSWR(`/api/block/height/${height}`, fetcher)
    return {
        block: data?.block,
        isLast: data?.isLast,
        isLoading: !error && !data,
        isError: error
    }
}


export function GetBlockByHash(hash = 'hash') {
    const { data, error } = useSWR(`/api/block/hash/${hash}`, fetcher)
    return {
        block: data?.block,
        isLast: data?.isLast,
        isLoading: !error && !data,
        isError: error
    }
}

export function getAccount(address = 'address') {
    const { data, error } = useSWR(`/api/address/${address}`, fetcher)
    return {
        transactions: data?.transactions,
        blocks: data?.blocks,
        balance: data?.balance,
        numBlockValidate: data?.numBlockValidate,
        isLoading: !error && !data,
        isError: error
    }
}

export function getTxn(hash = 'hash') {
    const { data, error } = useSWR(`/api/txn/${hash}`, fetcher)
    return {
        txn: data?.txn,
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
        blocks: data?.blocks,
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
        accounts: data?.accounts,
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
        transactions: data?.transactions,
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
        transactions: data?.transactions,
        isLoading: !error && !data,
        isError: error
    }
}


export function getPendingTxns() {
    const { data, error } = useSWR(`/api/txns/pending`, fetcher, { refreshInterval: 3000 })
    return {
        transactions: data?.transactions,
        isLoading: !error && !data,
        isError: error
    }
}

export function getChart() {
    const { data, error } = useSWR(`/api/chart`, fetcher, { refreshInterval: 15000 })
    return {
        data: data?.datas,
        isLoading: !error && !data,
        isError: error
    }
}


export function getBcInfo() {
    const { data, error } = useSWR(`/api/infos/bcinfo`, fetcher, { refreshInterval: 15000 })
    return {
        bcInfos: data,
        isBCLoading: !error && !data,
        isBcError: error
    }
}

export function getPoolInfo() {
    const { data, error } = useSWR(`/api/infos/poolinfo`, fetcher, { refreshInterval: 4000 })
    return {
        poolInfos: data,
        isPoolLoading: !error && !data,
        isPoolError: error
    }
}
