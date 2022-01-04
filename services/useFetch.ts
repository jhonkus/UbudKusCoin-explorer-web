import { useDispatch } from "react-redux";
import useSWR from "swr"
import { saveBlocks } from "../redux/blockSlice";
import { saveTransactions } from "../redux/transactionSlice";
const fetcher = (url: RequestInfo) => fetch(url).then((res) => res.json())

export function useBlocks(page=1, numOfRow = 10) {
    const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/blocks/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    if (!error && data?.blocks){
        dispatch(saveBlocks(data?.blocks) )
    }
    return {
        blocks: data?.blocks,
        isLoading: !error && !data,
        isError: error
    }
}

export function useTxns(page=1, numOfRow = 10) {
    const dispatch = useDispatch();
    const { data, error } = useSWR(`/api/txns/${page}/${numOfRow}`, fetcher, { refreshInterval: 30000 })
    if (!error && data?.transactions){
        dispatch(saveTransactions(data?.transactions) )
    }
    return {
        transactions: data?.transactions,
        isLoading: !error && !data,
        isError: error
    }
}
