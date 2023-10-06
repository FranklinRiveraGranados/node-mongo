import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { auth } from "../firebaseconfig"

const Menu = () => {
    const navigate = useNavigate()
    const [usuario, setUsuario] = useState(null)

    useEffect( () => {
        auth.onAuthStateChanged( (user) => {
            if(user){
                setUsuario(user.email)
                console.log(user.email)
            }
        })     
    }, [])

    const CerrarSesion = () => {
        auth.signOut()
        setUsuario(null)
        navigate("/")
    }


    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Inicio</Link>
                    </li>
                    <li>
                        {
                            !usuario ?
                            (
                                <Link className="nav-link" to="/login">Login</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                    <li>
                        {
                            !usuario ?
                            (
                                <Link className="nav-link" to="/admin">Admin</Link>
                            )
                            :
                            (
                                <span></span>
                            )
                        }
                    </li>
                </ul>
                {
                    usuario ?
                    (
                        <button onClick={CerrarSesion} className="btn btn-danger">Cerrar sesión</button>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </nav>
        </div>
    )
}

export default Menu