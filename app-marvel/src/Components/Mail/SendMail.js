import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


const ContactUs = (props) => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_o2wtk2a', 'template_non13ug', form.current, 'TMNLCu_E7C7UNYD1p')
      .then((result) => {
          console.log(result.text);
          e.target.reset();            
      }, (error) => {
          console.log(error.text);
      });
  };
  
  return (
    <div className='container-fluid'>
        <div className='row'>      
            <div className='col-sm-12 col-md-12 col-lg-6'>
                <h4 className='text-light'>Compartilhar por email <i className="fa-solid fa-envelope"></i></h4>
                <form ref={form} onSubmit={sendEmail}>
                    <input placeholder='E-mail' className='form-control  mt-1' type="email" name="email" />
                    {props.dados.map((cont) => { 
                        return(
                            <div key={cont.id} className='form-group'>            
                                <input placeholder='Nome' className='form-control mt-1' type="hidden" name="my_title" value={"<h1>"+cont.title+"</h1><p>Descrição: "+cont.description+"</p><img width='100px' src="+cont.thumbnail.path+"."+cont.thumbnail.extension+" /<br /><br />"} />       
                            </div>
                        )  
                        })
                    }
                    <input className='btn btn-primary mt-2' type="submit" value="Enviar" />
                </form>
            </div>
            <div className='col-sm-12 col-md-12 col-lg-6 d-flex align-items-center flex-column'>
                <h4 className='text-light '>Selecionados <i className="fa-solid fa-check"></i></h4>
                <ul>
                {props.dados.map((sel) => {return <li key={sel.id} className='text-light'>{sel.title}</li>})}
                </ul>
            </div>
        </div>        
    </div>      
  );
};

export default ContactUs;
