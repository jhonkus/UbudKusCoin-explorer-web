import { useRouter } from 'next/router';


export default function SearchBox() {
    const router = useRouter();

    const submitContact = async(event) => {
        event.preventDefault();
        const searcText = event.target.query.value;
        const res = await fetch(`/api/search?q=${searcText}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ q: searcText }),
        });
        const result = await res.json();

        if (result.status === "ok") {
            router.push({
                pathname: result.Url,
                query: { search: result.status }
            });
        } else {
            router.push({
                pathname: '/notfound'
            });
        }

    };
    return (
        <form className="search-form d-flex align-items-center" onSubmit={submitContact}>
            <input type="text" name="query" placeholder="Search by address/Txn hash/Block" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search"></i></button>
        </form>
    )
}