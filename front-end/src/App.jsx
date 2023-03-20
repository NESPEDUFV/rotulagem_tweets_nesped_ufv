import * as React from 'react'
import { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
import './App.sass'

import Button from '@mui/material/Button'

import CancelIcon from '@mui/icons-material/Cancel'
import Woman2Icon from '@mui/icons-material/Woman2'
// import LocalPoliceIcon from '@mui/icons-material/LocalPolice'
import PanToolIcon from '@mui/icons-material/PanTool'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MoodBadIcon from '@mui/icons-material/MoodBad'
import TwitterIcon from '@mui/icons-material/Twitter'
import CarCrashIcon from '@mui/icons-material/CarCrash'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'

import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

// const API_URL = "http://localhost:3000/"
const API_URL = "https://api-rotulagem-tweets.herokuapp.com/"

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

function App() {

  const [tweet, setTweet] = useState('')

  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [msgPedido, setMsgPedido] = useState("Erro ao rotular tweet!")
  const [statusMsgPedido, setStatusMsgPedido] = useState(false)

  const carregarTweetRotular = async () => {
    const response = await fetch(`${API_URL}tweets/listar/tweet/rotular`, {
      method: "GET"
    })

    const data = await response.json()

    // console.log(data)

    if (!data.error)
      setTweet(data.tweet)
    
  }

  const rotulaTweet = async (categoria) => {
    console.log(categoria, tweet.idTweet)
    console.log(JSON.stringify({ categoriaRotulo: categoria, idTweet: tweet.idTweet }))

    if(tweet.idTweet != -1) {
      const response = await fetch(`${API_URL}tweets/rotular/tweet`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
          // 'Access-Control-Request-Headers': 'Content-Type, Authorization'
        },
        method: "POST",
        body: JSON.stringify({ categoriaRotulo: categoria, idTweet: tweet.idTweet })
      })

      const data = await response.json()

      // console.log(data, categoria)

      if (!data.error) {
        setMsgPedido("Tweet rotulado com sucesso!")
        setStatusMsgPedido(true)
        setOpenSnackBar(true)
        carregarTweetRotular()
      } else {
        setMsgPedido('Erro ao rotular tweet!')
        setStatusMsgPedido(false)
        setOpenSnackBar(true)
      }
    
    } else {
      setMsgPedido('Não há mais tweets para rotular!')
      setStatusMsgPedido(false)
      setOpenSnackBar(true)
    }

  }

  useEffect(() => {
    carregarTweetRotular()
  }, [])

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setOpenSnackBar(false)
  }

  return (
    <main>
      <div className="box-tweet">
        <div className="titulo">
          <h2>Rotule os <span className="cor-tweet"> Tweets </span> <TwitterIcon className="cor-logo-twitter"/> dizendo se estão relacionados com crimes ou não!</h2>
        </div>
        <div className="conteudo">
          <h3>{tweet.text}</h3>
          <div className="opcoes-rotulo">
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              className="espaco-botoes"
              onClick={() => rotulaTweet('Sem relação')}
            >
              Não possui relação com crimes
            </Button>
            <div className="categorias-crimes">
              <Button
                variant="contained"
                endIcon={<Woman2Icon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Assédio')}
              >
                Assédio
              </Button>
              <Button
                variant="contained"
                endIcon={<PanToolIcon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Roubo')}
              >
                Roubo
              </Button>
              <Button
                variant="contained"
                endIcon={<VisibilityOffIcon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Furto')}
              >
                Furto
              </Button>
              <Button
                variant="contained"
                endIcon={<PointOfSaleIcon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Assalto')}
              >
                Assalto
              </Button>
              <Button
                variant="contained"
                endIcon={<ThumbsUpDownIcon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Agressão')}
              >
                Agressão
              </Button>
              <Button
                variant="contained"
                endIcon={<CarCrashIcon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Acidente')}
              >
                Acidente
              </Button>
              <Button
                variant="contained"
                endIcon={<MoodBadIcon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Homicídio')}
              >
                Homicídio
              </Button>
              <Button
                variant="contained"
                endIcon={<PrivacyTipIcon />}
                className="espaco-botoes tamanho-botao"
                onClick={() => rotulaTweet('Outros')}
              >
                Outros
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={handleCloseSnackBar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackBar}
          severity={statusMsgPedido ? "success" : "error"}
          sx={{ width: "100%", backgroundColor: statusMsgPedido ? "#057a61" : "#d32f2f" }}
        >
          {msgPedido}
        </Alert>
      </Snackbar>
    </main>
  )
}

export default App
