import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import imagenCripto from './img/imagen-criptos.png'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'


  const Contenedor = styled.div`
    max-width: 900px;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
    }
  `

  const Heading = styled.h1`
    font-family: 'Lato', sans-serif;
    color: #fff;
    text-align: center;
    font-weight: 700;
    margin-top: 80px;
    margin-bottom: 50px;
    font-size: 34px
  `

  const Imagen = styled.img`
    max-width: 400px;
    margin: 100px auto 0 auto;
    width: 80%;
    display: block;
  `




function App() {

  const [monedas, setMonedas] = useState({})

  const [resultado, setResultado] = useState({})

  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      const {moneda, criptomoneda} = monedas
      const cotizarCripto = async () => {
        setCargando(true)
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const res = await fetch(url)
        const resultado = await res.json()

        setResultado(resultado.DISPLAY[criptomoneda][moneda])

        setCargando(false)
      } 
      cotizarCripto()
    }
  }, [monedas])

  return (
    <Contenedor>
        <Imagen
          src={imagenCripto}
          alt='criptomonedas'
        ></Imagen>
        <div>
            <Heading>Cotiza criptos al instante</Heading>

            <Formulario 
              setMonedas={setMonedas}
            />

            {
              cargando && <Spinner />
            }
            {resultado.PRICE && <Resultado resultado={resultado} />}

        </div>
    </Contenedor>
  )
}

export default App
