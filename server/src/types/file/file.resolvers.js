'use strict';
// libraries:
import AWS from 'aws-sdk'
import {v4 as uuidv4} from 'uuid'
import util from 'util'
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// models:
// -- -- -- -- -- -- -- -- -- -- -- -- -- --
// project:
import {KEYS} from '../../config/keys';
import {authenticated} from '../../utils/auth';

var pp = (el) => console.log(util.inspect(el, false, 5, true))
//=============================================================================


const S3 = new AWS.S3({
    accessKeyId: KEYS.aws.accessKeyId,
    secretAccessKey: KEYS.aws.secretAccessKey
})

async function signedAwsUrl(parent, args, context, info) {
    var _file_key = `${context.userInfo.id}/${uuidv4()}.jpeg`

    function getSignedUrl() {
        return new Promise(
            function resolveSignedUrl(resolve, reject) {
                S3.getSignedUrl('putObject', {
                        Bucket: KEYS.aws.bucket,
                        ContentType: 'image/jpeg',
                        Key: _file_key
                    },
                    function postRequest(err, url) {
                        if (err) {
                            reject(err)
                        }
                        resolve(url)
                    }
                )
            }
        )
    }

    var result = {
        url: await getSignedUrl(),
        key: _file_key
    }

    return result
}

async function listOfSignedAwsUrls(parent, args, context, info) {
    let intAmount = args.input
    let result = []
    for (let i = 0; i <= intAmount; i++) {
        let data
        try {
            data = await signedAwsUrl(parent, args, context, info)
            result.push(data)
        } catch (_e) {
            throw Error('Unable to request signed url from S3 bucket')
        }
    }
    return result
}

export default {
    Query: {
        signedAwsUrl: authenticated(signedAwsUrl),
        listOfSignedAwsUrls: authenticated(listOfSignedAwsUrls)
    }
}
