import { UserButton } from "@clerk/nextjs"
import { Logo } from "../logo"
import { SelectModal } from "./select-modal"
import { ThemeToggle } from "../theme-toggle"

export const Navbar = () => {
    return (
        <div className="flex h-[50px] items-center justify-between bg-background px-96 py-10">
            <SelectModal />
            <div className="flex items-center gap-x-4">
                <ThemeToggle />
                <UserButton />
            </div>
        </div>
    )
}
