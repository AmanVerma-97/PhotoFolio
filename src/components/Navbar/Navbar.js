import navStyles from './Navbar.module.css'

export default function Navbar(){
    return(
        <>
            <nav className={navStyles.navbar}>
                <div className={navStyles.nav}>
                    <img src="https://cdn-icons-png.flaticon.com/128/856/856330.png" alt="album" className={navStyles.image}/>
                    <h2 className={navStyles.heading}> PhotoFolio </h2>
                </div>
            </nav>
            
        </>
    )
}