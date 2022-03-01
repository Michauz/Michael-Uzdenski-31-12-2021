import './style/style-header.css';
//header of the page
function Header({selected}) {
    return (
        <div>
            <div className="header-container">
                <div className="app-name">
                     Weather Task app
                </div>
                <div className="btn-container">
                    <div className="btn"  >
                        Celsius ° C
                    </div>
                    <div className="btn selected" >
                        Fahrenheit ° F
                    </div>
                </div>
                {selected==="favorites" ? (
                <div className="btn-container">
                    <div className="btn">
                        Home
                    </div>
                    <div className="btn selected" >
                        Favorites
                    </div>
                </div>
                ) : (
                <div className="btn-container">
                    <div className="btn selected">
                        Home
                    </div>
                    <div className="btn">
                        Favorites
                    </div>
                </div>
                ) }


            </div>
        </div>
    )
}

export default Header
