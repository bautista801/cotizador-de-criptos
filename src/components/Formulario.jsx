import styled from "@emotion/styled"
import useSelectCripto from "../kooks/useSelectCripto"
import { monedas } from "../data/monedas"
import { useEffect, useState } from "react"

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition:  background-color .3s ease;
    cursor: pointer;
    margin-top: 30px;

    &:hover {
        background-color: #7a7dfe;
    }
`

const Texto = styled.div`
    background-color: #b7322f;
    color: #fff;
    padding: 15px;
    font-size: 22px;
    text-transform: uppercase;
    text-align: center;
`


const Formulario = ({setMonedas}) => {

    const [criptos, setCriptos] = useState([])

    const [ moneda, SelectMonedas ] = useSelectCripto('Elige tu moneda', monedas)

    const [ criptomoneda, SelectCriptomoneda ] = useSelectCripto('Elige la criptomoneda', criptos)

    const [error, setError] = useState(false)



    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {

                const objeto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }
                return objeto
            })

            setCriptos(arrayCriptos)

        }
        consultarAPI()
    }, [])


    const handleSubmit = e => {
        e.preventDefault()

        if([moneda, criptomoneda].includes('')){
            setError(true)
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }


  return (
      <>
        {
            error && <Texto>
                        Todos los campos son obligatorios!
                     </Texto>
        }
        <form
            onSubmit={handleSubmit}
        >
            <SelectMonedas />

            <SelectCriptomoneda />

            <InputSubmit type="submit" value='Cotizar' />
        </form>
    </>
  )
}

export default Formulario