import { Outlet } from 'react-router-dom'
import Header from "../components/Header"
import Footer from "../components/Footer"

function Layout() {
    return (
        <>
            <div>

                {/* <Header /> */}

                <div style={{ width: "100%", height: "100vh", border: "1px solid black" }}>
                    <Outlet />
                </div>

                {/* <Footer /> */}

            </div>
        </>
    )
}

export default Layout;  
