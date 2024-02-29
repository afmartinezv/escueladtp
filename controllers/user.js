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
                // Aquí deberías devolver el hash si se solicita explícitamente
                res.status(200).send({
                    token: jwt.createToken(user)
                });

            } else {
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


export default pruebas;
