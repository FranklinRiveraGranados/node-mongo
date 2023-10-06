import { useState, useEffect } from 'react'
import './App.css'
import { collection, addDoc, getDocs, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { store } from "./firebaseconf"

function App() {
  const [modoedicion, setModoedicion] = useState(null)
  const [idusuario, setIdusuario] = useState('')
  const [nombre, setNombre] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [usuariosagenda, setUsuariosAgenda] = useState([])

  useEffect( ()=> {
    const getUsuarios = async () => {

      const { docs } = await getDocs(collection(store, 'agenda'))
      const nuevoArray = docs.map((item) =>({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
    }
    getUsuarios()
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault()

    if(!nombre.trim()){
      setError("El campo nombre esta vacío")
      return
    }
    if(!phone.trim()){
      setError("El campo telefono esta vacío")
      return
    }
    const usuario = {
      nombre: nombre,
      telefono: phone
    }

    try{

      const data = await addDoc(collection(store,'agenda'), usuario)
      
      /************** */
      const { docs } = await getDocs(collection(store, 'agenda'))
      const nuevoArray = docs.map((item) =>({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
      /**************************** */
      alert("Usuario añadido")

      setNombre("")
      setPhone("")
    }catch(e){
      console.log(e)
    }

  }

  const BorrarUsuario = async (id) => {
    try{
      await deleteDoc(doc(store, 'agenda', id))

      /***************** */
      const { docs } = await getDocs(collection(store, 'agenda'))
      const nuevoArray = docs.map((item) =>({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)

    }catch(e){
      console.log(e)
    }
  }

  const pulsarActualizar = async (id) => {
    const docRef = doc(store, 'agenda', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { nombre, telefono} = docSnap.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdusuario(id)
      setModoedicion(true)
      //console.log(id)
      //console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const setUpdate = async (e) => {
    e.preventDefault()

    if(!nombre.trim()){
      setError("El campo nombre esta vacío")
      return
    }
    if(!phone.trim()){
      setError("El campo telefono esta vacío")
      return
    }

    const userUpdate = {
      nombre: nombre,
      telefono: phone
    }

    try{
      const docRef = doc(store, 'agenda', idusuario)
      await updateDoc(docRef, userUpdate)

      /************** */
      const { docs } = await getDocs(collection(store, 'agenda'))
      const nuevoArray = docs.map((item) =>({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
      /**************************** */

    }catch(e){
      console.log(e)
    }

    setNombre('')
    setPhone('')
    setIdusuario('')
    setModoedicion(false)

  }


  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
            <h2>Formulario de Usuarios</h2>
            <form onSubmit={ modoedicion ? setUpdate : setUsuarios} className='form-group'>
              <input 
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                className='form-control'
                placeholder="Introduce el nombre"
                type="text"
              />
              <input
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
                className='form-control mt-3'
                placeholder='Introduce el numero'
                type="text"
              />

              {
                modoedicion ?
                (
                  <input 
                      type="submit" 
                      value="EDITAR" 
                      className='form-control btn btn-dark btn-block mt-3' 
                  />
                )
                :
                (
                  <input 
                      type="submit" 
                      value="REGISTRAR" 
                      className='form-control btn btn-dark btn-block mt-3' 
                  />
                )
              }

            </form>
            {
              error ?
              (
                <p>{error}</p>
              )
              :
              (
                <span></span>
              )
            }
        </div>
        <div className='col'>
          <h2>Lista de tu Agenda</h2>
          <ul className="list-group">
            {
              
              usuariosagenda.length != 0 ?
              (
                usuariosagenda.map(item => {
                  return(
                    <li className='list-group-item d-flex justify-content-between align-items-center' key={item.id}>
                      {item.nombre} -- {item.telefono}
                      <div>
                        <button onClick={()=>pulsarActualizar(item.id)} className='btn btn-info mr-3'>ACTUALIZAR</button>
                        <button onClick={()=>BorrarUsuario(item.id)} className='btn btn-danger'>BORRAR</button>
                      </div>
                    </li>
                  )
                })
              )
              :
              (
                <span>
                  No hay usuarios en tu agenda
                </span>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
