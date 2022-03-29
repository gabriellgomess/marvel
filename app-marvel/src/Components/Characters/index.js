import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import "./index.css";
import Modal from "react-modal";
import "./modal.css";
import ContactUs from "../Mail/SendMail";


Modal.setAppElement('#root')
// COMPONENTE CHARACTERS ---------------------------------------------
const Characters = () => {
    // state que receberá da api os dados dos quadrinhos
    const [characters, setCharacters] = useState([])
    // state que receberá os dados resultantes da pesquisa
    const [response, setResponse] = useState([])
    // useEffect que executará a busca na api quando carregada a página
    useEffect(()=>{
       async function loadReports(){
            try{
               api
                .get('/comics')
                .then((response) => {                    
                    setCharacters(response.data.data.results)                    
            }).catch((err) => {
                console.log(err)
        });
            }catch(e){
                console.log(e)
            }
        }
    loadReports();    
        
    },[])
    // -------------------------------------------------------------
    // state responsável pela ativação da modal
    const[modalIsOpen, setIsOpen] = useState(false)
    // state que receberá o conteúdo da modal
    const[detalhes, setDetalhes] = useState({
        "titulo": '',
        "descrição": '',
        "personagens": '',
        "imagem": '',
        "ext": ''  
    })    
    const[favoritos, setFavoritos] = useState([])
    // função de abertura da modal com os dados recebidos e atribuindo ao state detalhes
    function handleOpenModal(text){    
        setDetalhes({            
            "titulo": text.title,
            "descrição": text.variantDescription,
            "personagens": text.characters,
            "imagem": text.thumbnail.path,
            "ext": text.thumbnail.extension            
        })
        setIsOpen(true)   
    }
    // ------------------------------------------------------------
    // função responsável pelo fechamento da modal
    function handleCloseModal(){
        setIsOpen(false)
    }
    // ------------------------------------------------------------
    // configurações da modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'            
        }
    }
    // ------------------------------------------------------------
    // favoritos --------------------------------------------------
    const handleFavorite = (fav) => {
        if(!favoritos.includes(fav)){
            setFavoritos([...favoritos, fav])
            
        }else{
            console.log("repetido")
        }        
    }
    // const handleDelFavorite = (favoritos,delFav) => {
    const handleDelFavorite = (id) => {
            var result = favoritos.filter(function(el) {
              return el.id === id;
            });              
            for(var elemento of result){
              var index = favoritos.indexOf(elemento);    
              favoritos.splice(index, 1) ;
            }            
          }
    // }
    // ------------------------------------------------------------    
    //função responsável pela pesquisa
    const handleSearch = (e) => {
        if(!e.target.value){
            setResponse(characters)        
            
        }else{
            const resSearch = characters.filter((valor) => {
            return valor.title.includes(e.target.value)            
            })            
            setResponse(resSearch)            
        }
    }
    // -----------------------------------------------------------  
    // validação  
    if(response.length > 0){
        var resp = response
    }else{
        var resp = characters
    }

    return(
        <>
            <div className="searchContainer">         
                <input id="pesquisar" className="form-control" placeholder="Pesquisar" onChange={handleSearch} type="text" />                                             
            </div>   
            <div className="container">
                <ul>                          
                {resp.map(character => {
                    return(                    
                        <li className="card" key={character.id}>                                                                    
                            <div className="text-card">                            
                                <h3>{character.title}</h3>
                                <p>{character.characters.items.name}</p>
                            </div>
                            
                            <div className="btn-group">
                                <button className="btn btn-dark btn-sm more-info" onClick={() => handleOpenModal(character)}>Saiba Mais</button>
                                <button className="btn btn-success btn-sm" onClick={() => handleFavorite(character)}>Selecionar</button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelFavorite(character.id)}>Remover</button>
                            </div>                                                    
                            
                        </li>
                    ) 
                                
                })}           
                <ContactUs dados={favoritos} />
                </ul> 
                <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customStyles}>
                    <div className="headerModal">
                        <i onClick={handleCloseModal} className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="title-modal d-flex justify-content-center mb-3">
                        <h4>{detalhes.titulo}</h4>
                    </div>
                    <div className="container">                
                        <div className="row d-flex justify-content-around w-100">
                            <div className="col-6">
                                <div className="imgModal">
                                    <img width="200px" src={`${detalhes.imagem}.${detalhes.ext}`} alt="imagem comics"></img> 
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mainModal">                    
                                    <p>{detalhes.variantDescription}</p>
                                    <h4>Personagens</h4>
                                    <ul>{                                   
                                        detalhes.personagens.items?.map(personagem => {
                                            return(
                                                <li key={personagem.id}>{personagem.name}</li>
                                            )
                                        })
                                    }</ul>
                                </div>
                            </div>
                        </div>
                    </div>        
                </Modal>
            </div>
        </>
    );
}

export default Characters;