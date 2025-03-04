import Image from "next/image"

export const Loading = () => {
    return (
        <main className="flex w-full h-full items-center justify-center bg-background">
            <Image
                src={"/logo.png"}
                alt="logo"
                width={200}
                height={200}
                className="animate-pulse duration-700 m-auto"
            />
        </main>
    )
}
