import { useState, useEffect } from 'react'
import Header from './components/header'
import Filtros from './components/Filtros';
import ListadoGastos from './components/ListadoGastos';
import Modal from './components/Modal';
import { generarId } from './helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) ?? 0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([
    ...(JSON.parse(localStorage.getItem('gastos')) ?? [])
  ]);
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500)
    }
  }, [gastoEditar]);


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])

  useEffect(() => {
    if (filtro) {
      // console.log('filtrando...')
      //Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])


  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados);
      setGastoEditar({});
    } else {
      gasto.id = generarId();
      gasto.fecha = Date.now()
      //Toma una copia de gasto y agrega lo que le mandes
      setGastos([...gastos, gasto])
    }


    //Ocultar modal
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)

    }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id) //traera todos los gastos excepto en el que coicida el id 
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        // Pasar el state al header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {/* En el ternario es obligatorio tener una accion en caso de que no se cumpla la condicioen 
        el && sirve para solo indicar que se efectue si se cumple  */}

      {isValidPresupuesto && (
        <>

          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
          </div>
        </>
      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}

    </div>
  )
}

export default App
