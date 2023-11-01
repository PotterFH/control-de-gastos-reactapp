import { useState } from "react"
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

  //state local ya que no se requiere en otros lados por eso no se crea desde app.jsx
  const [mensaje, setMensaje] = useState('');

  const handlePresupuesto = (e) => {
    e.preventDefault()

    if (!presupuesto || presupuesto < 0) {
      setMensaje('Presupuesto no valido')

      return;
    }

    setMensaje('');
    setIsValidPresupuesto(true);
  }


  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handlePresupuesto} className='formulario'>
        <div className='campo'>
          <label htmlFor="presupuesto">Definir Presupuesto</label>
          <input type="number" className='nuevo-presupuesto' placeholder='Añade tu presupuesto' value={presupuesto} onChange={e => setPresupuesto(Number(e.target.value))} />
        </div>
        <input type="submit" value="Añadir" />

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
