
import mongoose from 'mongoose';
import server from './app.js';


mongoose.connect("mongodb+srv://andresv:md1URXUcUChobHt4@cluster0.bpawp9l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")  
    .then((dato) =>console.info("Conectado a la base de datos."))
    .catch((error)=>console.error("No Conectado a la base de datos"));  

    const puerto = server.get('port');
    
    //puerto por donde se va a escuchar solicitudes el sevidor
    server.listen(puerto, () => {
        console.log(`Servidor ejecutandose en el puerto: ${puerto}`);
    });