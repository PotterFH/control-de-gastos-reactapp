import React from 'react'
import NuevoPresupuesto from './nuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'


//Extraer el states que se paso de header
const Header = ({
  presupuesto,
  setPresupuesto,
  isValidPresupuesto,
  setIsValidPresupuesto,
  gastos,
  setGastos
}) => {
  return (
    <header>
      <h1>PLanificador de gastos</h1>

      {isValidPresupuesto ? (
        <ControlPresupuesto
          gastos={gastos}
          setGastos={setGastos}
          setPresupuesto={setPresupuesto}
          presupuesto={presupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      ) : (
        <NuevoPresupuesto
          //Ahora pasamos el state al componente de presupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )}


    </header>
  )
}

export default Header
