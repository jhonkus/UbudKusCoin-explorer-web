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
        <form className="d-flex align-items-center gap-2" onSubmit={submitContact}>
            <input
                className="form-control"
                style={{ minWidth: 'min(380px, 58vw)' }}
                type="search"
                name="keyword"
                placeholder="Search address, block height, or transaction hash"
                title="Enter search keyword"
                aria-label="Search blockchain data"
            />
            <button className="btn btn-primary" type="submit" title="Search">
                <i className="bi bi-search"></i>
            </button>
        </form>
    )
}
