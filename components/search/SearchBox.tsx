import { useRouter } from 'next/router';


export default function SearchBox() {
    const router = useRouter();

    const submitContact = async(event) => {
        event.preventDefault();
        const searcText = event.target.keyword.value;
        if (!searcText) {
            router.push({
                pathname: '/notfound'
            });
        }
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
        <form className="d-flex align-items-center" onSubmit={submitContact}>
            <input style={{marginLeft:'-22px',width:'294px'}} className="form-control me-2" type="search" name="keyword" placeholder="Search by address/Txn hash/Block" title="Enter search keyword" />
            <button className="btn btn-outline-success" title="Search"><i className="bi bi-search"></i></button>
        </form>
    )
}
