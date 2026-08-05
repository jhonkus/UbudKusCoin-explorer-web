type AnyRecord = Record<string, any>;

function getField(source: AnyRecord | null | undefined, keys: string[], fallback: any = undefined) {
    if (!source) {
        return fallback;
    }

    for (const key of keys) {
        const value = source[key];
        if (value !== undefined && value !== null) {
            return value;
        }
    }

    return fallback;
}

function toNumber(value: any, fallback = 0) {
    const num = Number(value);
    return Number.isFinite(num) ? num : fallback;
}

export function normalizeTxn(txn: AnyRecord | null | undefined) {
    if (!txn) {
        return null;
    }

    return {
        ...txn,
        Hash: getField(txn, ['Hash', 'hash', 'txnHash']),
        TimeStamp: toNumber(getField(txn, ['TimeStamp', 'timestamp', 'time_stamp'])),
        Sender: getField(txn, ['Sender', 'sender', 'sender_address']),
        Recipient: getField(txn, ['Recipient', 'recipient', 'recipient_address']),
        Amount: toNumber(getField(txn, ['Amount', 'amount'])),
        Fee: toNumber(getField(txn, ['Fee', 'fee'])),
        Height: toNumber(getField(txn, ['Height', 'height', 'blockHeight'])),
    };
}

export function normalizeBlock(block: AnyRecord | null | undefined) {
    if (!block) {
        return null;
    }

    return {
        ...block,
        Version: toNumber(getField(block, ['Version', 'version'])),
        Height: toNumber(getField(block, ['Height', 'height', 'blockHeight'])),
        TimeStamp: toNumber(getField(block, ['TimeStamp', 'timestamp', 'time_stamp'])),
        PrevHash: getField(block, ['PrevHash', 'prevHash', 'previousHash']),
        Hash: getField(block, ['Hash', 'hash', 'blockHash']),
        Transactions: getField(block, ['Transactions', 'transactions']),
        Validator: getField(block, ['Validator', 'validator']),
        MerkleRoot: getField(block, ['MerkleRoot', 'merkleRoot']),
        NumOfTx: toNumber(getField(block, ['NumOfTx', 'numOfTx', 'num_of_tx'])),
        TotalAmount: toNumber(getField(block, ['TotalAmount', 'totalAmount', 'total_amount'])),
        TotalReward: toNumber(getField(block, ['TotalReward', 'totalReward', 'total_reward'])),
        Difficulty: toNumber(getField(block, ['Difficulty', 'difficulty'])),
        BuildTime: toNumber(getField(block, ['BuildTime', 'buildTime', 'build_time'])),
        Size: toNumber(getField(block, ['Size', 'size'])),
    };
}

export function normalizeAccount(account: AnyRecord | null | undefined) {
    if (!account) {
        return null;
    }

    return {
        ...account,
        Id: toNumber(getField(account, ['Id', 'id'])),
        address: getField(account, ['address', 'Address']),
        balance: toNumber(getField(account, ['balance', 'Balance'])),
        txn_count: toNumber(getField(account, ['txn_count', 'txnCount', 'tx_count'])),
        last_update: toNumber(getField(account, ['last_update', 'lastUpdate'])),
    };
}

export function normalizeSearchResult(result: AnyRecord | null | undefined) {
    if (!result) {
        return null;
    }

    return {
        ...result,
        Id: toNumber(getField(result, ['Id', 'id'])),
        Title: getField(result, ['Title', 'title']),
        SarchText: getField(result, ['SarchText', 'SearchText', 'searchText']),
        Url: getField(result, ['Url', 'url']),
        status: getField(result, ['status', 'Status']) || '',
    };
}

export function normalizeChartPoint(point: AnyRecord | null | undefined) {
    if (!point) {
        return null;
    }

    return {
        ...point,
        timestamp: toNumber(getField(point, ['timestamp', 'TimeStamp', 'timeStamp'])),
        txn_count: toNumber(getField(point, ['txn_count', 'txnCount'])),
        amount: toNumber(getField(point, ['amount', 'Amount'])),
    };
}

export function normalizeArray<T>(
    items: T[] | null | undefined,
    normalizer: (item: T) => any,
) {
    if (!Array.isArray(items)) {
        return [];
    }

    return items.map((item) => normalizer(item));
}
