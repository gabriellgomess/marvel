import React, { useEffect, useState } from "react";
import api from "../../Services/api";
import "./index.css";
import Modal from "react-modal";
import "./modal.css"


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
            }) .catch((err) => {
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
    const[detalhes, setDetalhes] = useState([])    

    // função de abertura da modal com os dados recebidos e atribuindo ao state detalhes
    function handleOpenModal(text){    
        setDetalhes({
            "titulo": text.title,
            "descrição": text.variantDescription,
            // "personagens": person,
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
    // função responsável pela pesquisa
    const handleSearch = (e) => {
        if(!e.target.value){
            setResponse(characters)        
            
        }else{
            const resSearch = characters.filter((valor) => {
            return valor.title.includes(e.target.value)            
            })            
            setResponse(resSearch)
            console.log(resSearch)
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
        {console.log(characters)}
        
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
                        <button className="btn btn-dark btn-sm more-info" onClick={() => handleOpenModal(character)}>Saiba Mais</button>                                             
                    </li>
                ) 
                               
            })}
            </ul> 
            <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customStyles}>
                <div className="headerModal">
                    <i onClick={handleCloseModal} className="fa-solid fa-xmark"></i>
                </div>
                <div className="imgModal">
                    <img width="200px" src={`${detalhes.imagem}.${detalhes.ext}`}></img> 
                </div>
                <div className="mainModal">
                    <h4>{detalhes.titulo}</h4>
                    <p>{detalhes.variantDescription}</p>
                    {/* <p>{detalhes.personagem}</p> */}  
                </div>        
            </Modal>
        </div>
        </>
    );
}

export default Characters;