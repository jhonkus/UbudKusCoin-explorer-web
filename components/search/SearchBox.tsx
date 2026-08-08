import { useRouter } from 'next/router';


export default function SearchBox() {
    const router = useRouter();

    const submitContact = async(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const searchText = String(formData.get('keyword') || '').trim();

        if (!searchText) {
            return;
        }

        const res = await fetch(`/api/search?q=${encodeURIComponent(searchText)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ q: searchText }),
        });

        if (!res.ok) {
            router.push('/notfound');
            return;
        }

        const result = await res.json();

        if (result?.status === 'ok' && typeof result?.Url === 'string') {
            await router.push(result.Url.replace('/block/', '/blocks/'));
            return;
        }

        router.push('/notfound');
    };
    return (
        <form className="search-input-group ms-auto" onSubmit={submitContact}>
            <i className="bi bi-search search-icon"></i>
            <input
                className="form-control"
                type="search"
                name="keyword"
                placeholder="Search Address, Block Height, Txn Hash..."
                title="Enter search keyword"
                aria-label="Search blockchain data"
            />
            <button className="btn-search" type="submit" title="Search">
                <i className="bi bi-arrow-right"></i>
            </button>
        </form>
    )
}
