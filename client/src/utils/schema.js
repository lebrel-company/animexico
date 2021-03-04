import fs from 'fs';
import path from 'path';


function loadSchemaType(type) {
    var result = new Promise(function (resolve, reject) {
        const pathToSchema = path.join(
            process.cwd(), `src/controllers/${type}/${type}.gql`
        )

        fs.readFile(
            pathToSchema,
            {encoding: 'utf-8'},
            function (err, schema) {
                if (err){
                    return reject(err)
                }
                resolve(schema)
            }
        )
    })

    return result;
};

export {
    loadSchemaType
};