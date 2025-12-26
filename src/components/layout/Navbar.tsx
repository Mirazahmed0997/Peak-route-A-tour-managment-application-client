import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Link, useSearchParams } from "react-router"
import { ModeToggle } from "./ModeToggler";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { authApi, useLogoutMutation, useUserProfileQuery } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { useDivisionsQuery } from "@/redux/features/division/division.api";



const Navbar = () => {

    const { data, isLoading } = useUserProfileQuery(undefined)

    // const [searchParams, setSearchParams] = useSearchParams()


    const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch()

    // const selectedDivision = searchParams.get("division") || undefined


    // const { data: divisionData, isLoading: divisionLoading } = useDivisionsQuery(undefined);
    // const divisions = divisionData || [];


    // const handleDivisionChange = (value: string) => {
    //     const params = new URLSearchParams(searchParams)
    //     params.set("division", value)
    //     setSearchParams(params)
    // }

    const handleLogout = async () => {
        await logout(undefined);
        dispatch(authApi.util.resetApiState())
    }


    const navigationLinks = [
        { href: "/", label: "Home" },
        { href: "/tour", label: "Tours" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ]

    return (
        <div className="">

            <header className="container sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur
             dark:bg-gray-950/80 dark:border-gray-800">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">

                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        PeakRoute
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                className="text-gray-700 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-3">
                        {data?.email && (<Button onClick={handleLogout} variant="outline">Logout</Button>)}
                        {!isLoading && !data?.email && (<Button variant="outline"><Link to="/login">Login</Link></Button>)}
                        {data?.role === "ADMIN" && (
                            <Button>
                                <Link to="/admin">Dashboard</Link>
                            </Button>
                        )}
                        {data?.role === "SUPER_ADMIN" && (
                            <Button>
                                <Link to="/admin">Dashboard</Link>
                            </Button>
                        )}

                        {data?.role === "USER" && (
                            <Button>
                                <Link to="/user">Dashboard</Link>
                            </Button>
                        )}

                        {/* <Select
                            value={selectedDivision ? selectedDivision : ""}
                            onValueChange={handleDivisionChange}
                            disabled={divisionLoading}
                        >
                            <SelectTrigger className="w-[280px]">
                                <SelectValue placeholder="All Divisions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={undefined as any}>All Divisions</SelectItem>
                                    {divisions.map((division: any) => (
                                        <SelectItem key={division._id} value={division._id}>
                                            {division.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select> */}
                        <ModeToggle />
                    </div>

                    {/* Mobile Menu */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden text-gray-700 dark:text-gray-300">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end" className="w-40 p-2 md:hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md shadow-md">
                            <nav className="flex flex-col gap-2">
                                {navigationLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary py-1 px-2 rounded-md transition-colors"
                                    >
                                        {link.label}

                                    </Link>

                                ))}
                            </nav>


                        </PopoverContent>

                    </Popover>

                </div>
            </header>
        </div>

    );
};

export default Navbar;