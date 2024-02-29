import bcrypt from 'bcrypt';
import User from '../models/user.js';

import jwt from '../services/jwt.js';

export function pruebas(req, res) {
    res.status(200).send({
        message: 'Prueba del controlador probando el controlador'
    });
}

export async function saveUser(req, res) {
    const params = req.body;

    try {
        // Verificar que todos los campos tengan datos
        if (!params.name || !params.surname || !params.email || !params.password) {
            return res.status(400).send({ message: 'Todos los campos son requeridos' });
        }

        // Verificar que ningún campo contenga solo espacios en blanco
        if (Object.values(params).some(value => typeof value === 'string' && value.trim() === '')) {
            return res.status(400).send({ message: 'Ningún campo puede estar vacío' });
        }

        // Verificar si el correo electrónico ya existe en la base de datos
        const existingUser = await User.findOne({ email: params.email });
        if (existingUser) {
            return res.status(409).send({ message: 'El correo electrónico ya está en uso' });
        }

        // Generar una sal
        const salt = await bcrypt.genSalt(10);

        // Hashear la contraseña con la sal generada
        const hash = await bcrypt.hash(params.password, salt);

        const user = new User({
            name: params.name,
            surname: params.surname,
            email: params.email,
            role: 'ROLE_USER',
            image: 'null',
            password: hash
        });

        await user.save();

        res.status(200).send({ user });
    } catch (error) {
        console.error('Error al guardar el usuario:', error);
        res.status(500).send({ message: 'Error al guardar el usuario', error });
    }
}

export async function loginUser(req, res) {
    try {
        const params = req.body;
        const email = params.email;
        const password = params.password;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).send({ message: 'El Usuario no existe' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            if (params.gethash) {
                try {
                    // Crea el token JWT utilizando la función createToken del módulo jwt
                    const token = jwt.createToken(user);
            
                    // Envía una respuesta con el token generado
                    res.status(200).send({ token });
                } catch (error) {
                    console.error('Error al crear el token:', error);
                    res.status(500).send({ message: 'Error al crear el token', error });
                }
            } else {
                // Si no se solicita explícitamente el hash, envía la información del usuario
                res.status(200).send({ user });
            }
        } else {
            res.status(404).send({ message: 'La contraseña o el usuario son incorrectos' });
        }
    } catch (error) {
        console.error('Error en la petición:', error);
        res.status(500).send({ message: 'Error en la petición', error });
    }
    
}
export async function updateUser(req, res) {
    // Obtén el ID del usuario a actualizar desde los parámetros de la solicitud
    const userId = req.params.id;
    // Obtén los nuevos datos del usuario desde el cuerpo de la solicitud
    const newData = req.body;

    try {
        // Busca el usuario por su ID en la base de datos
        const user = await User.findById(userId);
        
        // Si no se encuentra el usuario, devuelve un mensaje de error
        if (!user) {
            return res.status(404).send({ message: 'El usuario no existe' });
        }

        // Actualiza los campos del usuario con los nuevos datos
        Object.keys(newData).forEach(key => {
            user[key] = newData[key];
        });

        // Guarda los cambios en la base de datos
        await user.save();

        // Devuelve una respuesta con el usuario actualizado
        res.status(200).send({ user });
    } catch (error) {
        // Si ocurre un error durante el proceso, devuelve un mensaje de error
        console.error('Error al actualizar el usuario:', error);
        res.status(500).send({ message: 'Error al actualizar el usuario', error });
    }
}

export default pruebas;
