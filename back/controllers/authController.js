const bcryptjs = require('bcryptjs');
const { response } = require('express');
const { json } = require('express/lib/response');

const { generarJWT } = require('../helpers/generar-jwt');

const User = require('../models/user');

const { dbConnection } = require('../database/config');

const login = async(req, res = response)=>{

    const {
        username
        ,pwd
    }= req.body;

    var OSQL = null;

    try{

        OSQL = await dbConnection.query(`call getUserByUserName('${ username }' )`);

        console.log(OSQL);

        if( OSQL.length == 0 ){
            return res.json({
                status:1,
                message:"Usuario / Password no son correctos",
                data:null
            })
        }
    
        var user = OSQL[0];

        //Si el usuario está activo
        if( !user.active ){
            return res.json({
                status:1,
                message:"Usuario / Password no son correctos",
                data:null
            })
        }

        //Verificar contraseña
        const validPassword = bcryptjs.compareSync(pwd, user.pwd);

        if(!validPassword){
            return res.json({
                status:1,
                message:"Usuario / Password no son correctos",
                data:null
            })
        }

        //Generar el JWT
        const token = await generarJWT( user.iduser );

        //const salt = bcryptjs.genSaltSync();
        //const token = bcryptjs.hashSync( '112501184', salt);

        res.json({
            status:0,
            message:"Conectado correctamente.",
            data:{
                user,
                token
            }            
        });
    }
    catch( error ){
        
        res.status(500).json({
            status:2,
            message:"Sucedió un error inesperado",
            data: OSQL
        });
    }
}

module.exports={
    login
}