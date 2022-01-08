import { useDispatch } from "react-redux";
import useSWR from "swr"
import { saveBlocks } from "../redux/blockSlice";
import { saveTransactions } from "../redux/transactionSlice";
const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())


export function getBlock(height = '1') {
    const { data, error } = useSWR(`/api/block/${height}`, fetcher)
    return {
        block: data?.block,
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
    const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/blocks/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    if (!error && data?.blocks) {
        dispatch(saveBlocks(data?.blocks))
    }
    return {
        blocks: data?.blocks,
        isLoading: !error && !data,
        isError: error
    }
}

export function getTxns(page = 1, numOfRow = 10) {
    const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/txns/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    if (!error && data?.transactions) {
        dispatch(saveTransactions(data?.transactions))
    }
    return {
        transactions: data?.transactions,
        isLoading: !error && !data,
        isError: error
    }
}
