import React, { useEffect } from 'react';
import api from '../services/Api'
import { useState } from 'react';

const Matriculas = () => {
     const [lista, setLista] = useState([])

    useEffect( () => {
        try{
            const result =  api.get("usuarios/1/matriculas", {
                headers:{
                    Authorization:"Bearer " + localStorage.getItem("token")
                }
            }).then(res=>{
               res.data.forEach(element => {
                   lista.push(element);
               });
               console.log(lista[0].id)
            })
        }catch(e){
            console.log(e)
        }
      });

      function mostrar(){
        lista.forEach(el => {
            return (
                <div>
                   <table>
                       <tr>
                           <th>id</th>
                           <th>nome curso</th>
                           <th>status</th>
                       </tr>
                       <tr>
                           <td>{el.id}</td>
                           <td>{el.nomeCurso}</td>
                           <td>{el.status}</td>
                       </tr>
                   </table>

                </div>
            );
        })
      }
    return ( 
        <div>
            <button onClick={mostrar}>Mostrar matriculas</button>
        </div>
     );
}
 
export default Matriculas;