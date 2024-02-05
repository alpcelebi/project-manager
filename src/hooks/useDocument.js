import { useEffect, useState } from "react";
import {db} from '../firebase/config'
import { doc,onSnapshot } from "firebase/firestore";


export  const useDocument= (koleksiyon,id)=>{

    const [document,setDocument]=useState(null)
    const [error,setEror]=useState(null)

    useEffect(()=>{

        const ref=doc(db,koleksiyon,id);

        const unsub=onSnapshot(ref,(doc)=>{

            if(doc.data()){

                setDocument({...doc.data(),id:doc.id});
                setEror(null)
            }

            else{

                setEror('Döküman Bulunamadı')

            }

         

        },
        
        err=>{

            console.log(err.message);

            setEror('Dökümana Erişilemedi')

        }

          )


        return ()=> unsub(); 


    },[koleksiyon,id])


    return {document,error}

   
}


