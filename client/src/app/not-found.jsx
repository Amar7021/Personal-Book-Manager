import Link from "next/link"

export default function NotFound() {
    return (
        <div>
            <h1>Error: 404</h1>
            <Link href="/">Go Home</Link>
        </div>
    )
}