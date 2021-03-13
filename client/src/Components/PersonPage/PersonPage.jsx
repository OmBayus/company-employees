import React, { useContext, useState } from "react"
import {useRouteMatch,Redirect} from "react-router-dom"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Container } from "react-bootstrap"

import PeopleService from "../../services/People"

import {Context} from "../../Context"

import "./PersonPage.css"

const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
});

function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
}
    


const PersonPage = ()=>{

      const { peopleContext } = useContext(Context)

      const [Check,setCheck] = useState({isCheck:false,msg:"Hata",color:"error",route:false})

      const [openDelPop, setOpenDelPop] = useState(false);
      const [openChangePop, setOpenChangePop] = useState(false);

      const [changeUser,setchangeUser] = useState({name:"",unvan:"Çalışan",no:""})
      
      const [people,setPeople] = peopleContext

      const match = useRouteMatch("/:id")

      const handleClickOpenChangePop = () => {
            setOpenChangePop(true);
      };
        
      const handleCloseChangePop = () => {
            setOpenChangePop(false);
      };


      const handleClickOpenDelPop = () => {
            setOpenDelPop(true);
      };
        
      const handleCloseDelPop = () => {
            setOpenDelPop(false);
      };

      const handlechangeUser = (e)=>{
            const {name,value} = e.target

            if(name === "name"){
                  setchangeUser(prevValue=>({...prevValue,name:value}))
            }
            else if (name==="unvan"){
                  setchangeUser(prevValue=>({...prevValue,unvan:value}))
            }
            else if (name==="no"){
                  setchangeUser(prevValue=>({...prevValue,no:value}))
            }
      }



      const deletePerson = ()=>{
            setOpenDelPop(false);
            PeopleService.Delete(match.params.id)
                  .then((data)=>{
                        var temp = people.filter(item=>String(item.no) !== String(data.data.no))
                        setPeople(temp)
                        setCheck({isCheck:true,msg:"Başıryla Silindi",color:"success",route:false})
                        setTimeout(()=>setCheck({isCheck:false,msg:"Hata",color:"error",route:true}),2000)
                  })
                  .catch((err)=>{
                        setCheck({isCheck:true,msg:"Bir Hata ile Karşılaşıldı",color:"error",route:false})
                        setTimeout(()=>setCheck({isCheck:false,msg:"Hata",color:"error",route:false}),3000)
                        console.log(err)
                  })
      }

      const changePerson = ()=>{
            PeopleService.update(match.params.id,changeUser)
                  .then((data)=>{
                        var temp = people.map(item=>{
                              if((item.no) === String(match.params.id)){
                                    console.log(item)
                                    console.log(data)
                                    return(data)
                              }
                              else{
                                    return(item)
                              }
                        })
                        console.log(temp)
                        setPeople(temp)
                        setCheck({isCheck:true,msg:"Başıryla Değiştirildi",color:"success",route:false})
                        setTimeout(()=>setCheck({isCheck:false,msg:"Hata",color:"error",route:true}),2000)
                  })
            setOpenChangePop(false)
      }

      
      return(
      <div>
            <Container className="personPage">
                  {Check.route && <Redirect to="/" />}
                  {Check.isCheck && <Alert severity={Check.color} className="alert">{Check.msg}</Alert>}
                  {people.filter(item=>String(item.no) === String(match.params.id)).map(item=>(
                        <div key={match.params.id}>
                              <img src={item.imgPath} alt="pp" className="personpage-img" />
                              <h1 className="mt-3">{item.name}</h1>
                              <h3>{item.unvan}</h3>
                              <h3>{item.no}</h3>
                              <Button variant="contained" color="primary" className="mr-1 mt-3" onClick={handleClickOpenChangePop}>Düzenle</Button>
                              <Button variant="contained" color="secondary" className="ml-1 mt-3" onClick={handleClickOpenDelPop}>Sil</Button>
                        </div>
                  ))}
            </Container>
            <Dialog
                  open={openDelPop}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleCloseDelPop}
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description"
                  >
                  <DialogTitle id="alert-dialog-slide-title">{"Kullanıcıyı Sil"}</DialogTitle>
                  <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                        Kullanıcı silinecektir emin misiniz?
                  </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleCloseDelPop} color="primary">
                        Hayır
                  </Button>
                  <Button onClick={deletePerson} color="primary">
                        Evet
                  </Button>
                  </DialogActions>
            </Dialog>
            <Dialog open={openChangePop} onClose={handleCloseChangePop} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Kişi Düzenle</DialogTitle>
                  <DialogContent>
                  <DialogContentText>
                        Bilgileri Güncelleyin
                  </DialogContentText>
                  <TextField
                        autoFocus
                        margin="dense"
                        value={changeUser.name}
                        type="text"
                        name="name"
                        onChange={handlechangeUser}
                        fullWidth
                  />
                  <Select
                        labelId="demo-simple-name-label"
                        name="unvan"
                        value={changeUser.unvan}
                        onChange={handlechangeUser}
                        >
                        <MenuItem value={"Çalışan"}>Çalışan</MenuItem>
                        <MenuItem value={"Kurucu Ortak"}>Kurucu Ortak</MenuItem>
                  </Select>
                  <TextField
                        autoFocus
                        margin="dense"
                        name="no"
                        value={changeUser.no}
                        onChange={handlechangeUser}
                        type="text"
                        fullWidth
                  />
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleCloseChangePop} color="primary">
                        İptal
                  </Button>
                  <Button onClick={changePerson} color="primary">
                        Gönder
                  </Button>
                  </DialogActions>
            </Dialog>
      </div>
      )
}


export default PersonPage