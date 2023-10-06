import { useState } from "react"
import { auth } from "../firebaseconfig"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate} from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [msgerror, setMsgError] = useState(null)


    const RegistrarUsuario = async (e) => {
        e.preventDefault()

        await createUserWithEmailAndPassword(auth, email, pass)
        .then(r => {
            navigate("/")
        })
        .catch(e => {
            if(e.code === "auth/invalid-email"){
                setMsgError("Formato de Email incorrecto")
            }
            if(e.code === "auth/weak-password"){
                setMsgError("La contraseña debe tener 6 caracteres o mas")
            }
        })
    }


    const LoginUsuario = async () => {
        await signInWithEmailAndPassword(auth, email, pass)
        .then( (r) => {
            navigate("/")
        })
        .catch( (err) => {
            if(err.code === "auth/invalid-login-credentials"){
                setMsgError("Password incorrecto")
            }
        })
    }

    return(
        <div className="row mt-5">
            <div className="col"></div>
            <div className="col">
                <form onSubmit={RegistrarUsuario} className="form-group">
                    <input
                        onChange={(e) => { setEmail(e.target.value)}}
                        className="form-control"
                        placeholder="Introduce el Email" 
                        type="text" 
                    />
                    <input 
                        onChange={(e) => { setPass(e.target.value)}}
                        className="form-control mt-4"
                        placeholder="Introduce la Password"
                        type="password"
                    />
                    <input 
                        className="btn btn-dark btn-block form-control mt-4"
                        value= "Registrar Usuario"
                        type="submit"
                    />
                </form>
                <button className="btn btn-success btn-block form-control mt-2" onClick={LoginUsuario}>
                    Iniciar sesión
                </button>
                {
                    msgerror != null ?
                    (
                        <div>
                            {msgerror}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className="col"></div>
        </div>
    )
}

export default Login