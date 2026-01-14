import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <>
            <div>

                <div style={{ width: "100%", height: "100vh", border: "1px solid black" }}>
                    <Outlet />
                </div>


            </div>
        </>
    )
}

export default Layout;  
