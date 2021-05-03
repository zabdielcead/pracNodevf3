require('dotenv').config()

const {
    leerInput,
    inquireMenu,
    pausas,
    listarLugares

} = require("./helpers/inquirer");

const Busquedas = require("./models/busquedas");


//console.log(process.env);
//console.log('Hola Mundo');

/*
iniciar la aplicacion o proyecto  fue  con 
npm init -y


en package.json

cambie 
 "scripts": {
        
    },
por 

 "scripts": {
        "start": "node index.js"
    },

    para  no usar   -> node index
    usar    ->  npm start



    instalamos npm i color inquirer


    borrar paquete de color npm uninstall color de package json   
    npm uninstall color
*/


const main = async() => {
    //const texto = await leerInput('Hola');
    let opt;
    const busquedas = new Busquedas();
    do {
        opt = await inquireMenu();
        console.log({ opt });

        switch (opt) {
            case 1:
                // Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(lugar);
                const id = await listarLugares(lugares);

                if (id === '0') continue;


                //console.log({ id });
                const lugarSel = lugares.find(l => l.id === id);

                busquedas.agregarHistorial(lugarSel.nombre);

                //console.log(lugarSel);
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);
                //console.log(clima);
                //console.log(lugar);

                //Buscar los lugares
                //Seleccionar el lugar
                //clima
                //Mostrar resultados
                console.clear();
                console.log('\n Informacion de la ciudad\n'.green);
                console.log('ciudad:', lugarSel.nombre);
                console.log('lat:', lugarSel.lat);
                console.log('lng:', lugarSel.lng);
                console.log('Temp:', clima.min);
                console.log('minima:', clima.min);
                console.log('max:', clima.max);
                console.log('desc clima:', clima.desc);

                break;

            case 2:

                busquedas.historialCapitalizado.forEach((lugar, index) => {
                    const idx = `${index +1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })

                break;
        }


        if (opt !== 0) await pausas();

    } while (opt !== 0)

}

main();