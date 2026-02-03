"use client";

import { useRouter } from "next/navigation";

export default function RandomButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push("/protected");
    };

    return (
        <button onClick={handleClick} className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90">
            Random Button
        </button>
    );
}