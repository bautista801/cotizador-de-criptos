import styled from "@emotion/styled"

const Principal = styled.p`
    color: #fff;
    font-size: 30px;
    font-family: 'Lato', sans-serif;
`

const Parrafo = styled.p`
    color: #fff;
    font-size: 20px;
    font-family: 'Lato', sans-serif;
`

const Imagen = styled.img`
    margin: 30px 0 0 30%;
    width: 150px;
    height: 150px;
`


const Resultado = ({resultado}) => {

    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = resultado

    return (
    <div>
        <Imagen src={`https://cryptocompare.com/${IMAGEURL}`} alt="icono cripto" />
        <Principal>El precio de hoy es: <span>{PRICE}</span></Principal>
        <Parrafo>Precio más alto hoy: <span>{HIGHDAY}</span></Parrafo>
        <Parrafo>Precio más bajo hoy: <span>{LOWDAY}</span></Parrafo>
        <Parrafo>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Parrafo>
        <Parrafo>Última vez actualizado: <span>{LASTUPDATE}</span></Parrafo>
    </div>
  )
}

export default Resultado