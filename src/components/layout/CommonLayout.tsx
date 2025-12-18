import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

const CommonLayout = ({children}:{children: ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar></Navbar>
            <div className="flex-1">{children}</div>
            <Footer></Footer>
        </div>
    );
};

export default CommonLayout;