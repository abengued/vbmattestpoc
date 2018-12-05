import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MocdocService {

  constructor() { }

  getMocDoc() {
  	return {
            'did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok': this.getDocument(),
            'did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok#authn-key-1': this.getDocument().authentication[0].publicKey[0]
    };
  }

  getDocument() {
 	// need to add verifiable presentation rather than verifiable credential 	
  	// return JSON.parse('{\"@context":[{"@version":1.1},"https://w3id.org/credentials/v1",{"credentialName":"cr:credentialName","credentialDescription":"cr:credentialDescription","stateAuthority":"vbm:stateAuthority","localAuthority":"vbm:localAuthority","precinct":"vbm:precinct","voterRegistrationNumber":"vbm:voterRegistrationNumber","name":"vbm:name","voteByMailRegistration":"vbm:voteByMailRegistration"},"https://w3id.org/security/v2"],"id":"urn:uuid:1111048f-0ecf-4b5b-872c-aaad5222d0ad","type":["VerifiableCredential","voteByMailCredential"],"issuer":"did:v1:test:nym:eJPSftfsFUGUxPGnVecOXhXobK23nBbJ2jhuj75ok-U","issued":"2018-10-01T19:73:24Z","credentialName":"Vote By Mail Access Credential","credentialDescription":"Log in to the USPS Vote by Mail App with this Credential","claim":{"id":"did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok","stateAuthority":"Colorado Secretary of State","localAuthority":"Denver County","precinct":"028","voterRegistrationNumber":"124P5579","name":"Cab Morris","voteByMailRegistration":true},"proof":{"type":"RsaSignature2018","created":"2018-11-20T23:36:28Z","creator":"did:v1:test:nym:eJPSftfsFUGUxPGnVecOXhXobK23nBbJ2jhuj75ok-U#authn-key-1","domain":"http://www.sos.state.co.us/pubs/elections/UOCAVA.html","jws":"eyJhbGciOiJQUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..objjT3S9qk8fJNiDUNTCGfi1YibK6VdEc_Fl1x4NvFg9YGTevF2ae7msgmDNMzj6vevUxr_mkxE4a5jdIBruDeKkWMper6oVvETX0Htih2qAO8FnYbYEfjO9w7UY8mvNobJVC-q2D_kmgT-f-FGV1RHvwol6X_lNr5zAKWBHeHFF-sVpSaBI2L1KGl0dRKNyZZmVmu0XIou5LMw1UhaWEVqOnWeooFOtRITEQIEAYjuPHKYD9_l4Z5H0kYcYwMzpTa0GoGl1w3NKBGXbDdS5oxOLeDvbfeD21d19XPaXt9mNyQHH-UWm9xOJoYVvt0QiqPPBgBZIuJVTg2Mi12d4Ug","nonce":"9dc7fd85"}}');
  
    let value =
    {
      "@context": "https://w3id.org/veres-one/v1",
      "id": "did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok",
      "authentication": [{
        "type": "RsaSignatureAuthentication2018",
        "publicKey": [{
          "id": "did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok#authn-key-1",
          "type": "RsaVerificationKey2018",
          "owner": "did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok",
          "publicKeyPem": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqZhnyoee5m0zztr12let\r\niUbGF+ymAqcTSG2rWDugJ7/FqCmlNZ+DGhtKyjCM4g0im4omLpTy3RZSm76yMqsS\r\nFLK/KhuBvnnB7DYgRtJWCDdJnysJp3AFFjN05p4QRIftxYinb9s42+pw/gXJ9sn+\r\nKHXOH1j7sdFDAxvXkHaY5KXpX4QmDxhc2hYXAYZGT6SYSRDdr5keBIfZjQDK7H19\r\n+mo7eOpnbhSIBL/Gc6w/ECYAxWbGRZnBX1YO3Vm+2ASBt3LTsoZ54K61/bbG6JrL\r\n8Ma2x7TLLBUKAN8DYnOzbYJif8XvFzSIKEtoqyy2BkSU/dmLH0JSnebs20pi0Y5E\r\nGwIDAQAB\r\n-----END PUBLIC KEY-----\r\n",
          "privateKey": {
            "privateKeyPem": "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEowIBAAKCAQEAqZhnyoee5m0zztr12letiUbGF+ymAqcTSG2rWDugJ7/FqCml\r\nNZ+DGhtKyjCM4g0im4omLpTy3RZSm76yMqsSFLK/KhuBvnnB7DYgRtJWCDdJnysJ\r\np3AFFjN05p4QRIftxYinb9s42+pw/gXJ9sn+KHXOH1j7sdFDAxvXkHaY5KXpX4Qm\r\nDxhc2hYXAYZGT6SYSRDdr5keBIfZjQDK7H19+mo7eOpnbhSIBL/Gc6w/ECYAxWbG\r\nRZnBX1YO3Vm+2ASBt3LTsoZ54K61/bbG6JrL8Ma2x7TLLBUKAN8DYnOzbYJif8Xv\r\nFzSIKEtoqyy2BkSU/dmLH0JSnebs20pi0Y5EGwIDAQABAoIBAAtfkB5R6AMV8bJ+\r\nlpw04wtgtqomEZ/96loiGKqLHRttTekQGec1skoO6H4UsW37aYW6xwK6tGrFM3cE\r\nW9jwBf9jWVSOka3fZnTb0GBPfLuCUaqd7UDQT1cEzmMk2HxwDS8BEhF7Rx3gZAF1\r\nC+1D8IpwFAmgIwjyuqa7uEIU4f37UmlZp7XDBdigyyhlFEcGnI99xoFZ1W5I59TR\r\nX45qTTVRATQxTzCPy9kJEaeIepHOfv1ekvl066rEhVPt/iIJWwUs+AVfjAH4tSGI\r\nRZ4JivC38appaMwV6ZiH7QaeNBeE3XflbK0jHmIjsTO4lc2zvESTguyU4Q7uD6pN\r\neuHyonkCgYEA2WMZnWHRsdpFT/Rj5SfzqfmJhE2TlVho4hxUkkfSGzhzj88P2RtH\r\nUbstOgsZYaYFSNxqdC9cDkdtJrVdJUknfqj/JyvIclIwtOlEqDmQv6mCPgktpyZH\r\nXhD2CG2imxv7hTDDky9ROHjyHdCAjLjZLZXRDq0AlsKANGoQ/eFFdRcCgYEAx7gl\r\nRgRQaxA0RxHHw8NHLTZnfNk8TLpuLVXsy+gSGVRFKJgO5g1t1hJMyRFeYKF1p+ZU\r\n5VYHWNO/qWWYLTcOHJiszcQaRa1SbcG1y5qko7U/Fyh6BdJFVOOH9wWjGJFPln4y\r\nQ4aCWzP5oRhtg6DbiHkc2AG7qvnqjy52qRBZU50CgYAR+ZLFo6/+H8k5akDUUvBf\r\n7qVDTlLUt4G8qJEJo2ypGYrcqkdqMUo9ZNfBg+duXpbzRl57Cut2tss8tyRjj9/3\r\nJiwq5gDmCwvB+cPWkSP55R9C1+lxd8XQ7mAZpE8cujya78RMKE5z9/Q1KOdoO2Sh\r\n01B9ASsaTCzjqJ2NEJJ4swKBgQDA+Oly5Jo7SHXqsYBeY6GzStzlYhUEYiIwxdQ+\r\nFSbfuG/2UC4dFJ6q+BWfNZwGLBu9ti0TRnNk3XxUFejaz1ZgRRi63J8x8c0yZbfd\r\nWbd4wpiKLL7yPwBkjFCEWrsC8ux+kcLJQf9UVjz97ddrFpLoI3W+NLZ69m0wGYnn\r\nwvc8dQKBgDkBDs354b0r2mSREK3WNkQEAqCbvQWCHul1WEVGytayHHs5vUT1ug0N\r\nAenOyXf4oyyt/iKJkPBTengYpUModHV4HXSFLoImhLf8Zkn408PMZHWhnMmX0sFc\r\nEFAvZzynnJC+6X/Ij034ZfO59h6JcZNUA/lPmutv3/CAfOMyDHsp\r\n-----END RSA PRIVATE KEY-----\r\n"
          }
        }]
      }],
      "grantCapability": [{
        "type": "RsaSignatureCapabilityAuthorization2018",
        "publicKey": [{
          "id": "did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok#ocap-grant-key-1",
          "type": "RsaVerificationKey2018",
          "owner": "did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok",
          "publicKeyPem": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2ck46NDFoUCyRGiEJuzN\r\nmXs1tw9DQp8CqCLj1T/dr9hkVuV77irK28zKb6CDEWvKuTs2RMtduOw2BHgu7bOO\r\niiUwkxaqMkWi07/aK1B2ZRYNYp5HGJnFo8+SIw/VRMyWiq1uAgElLF5xcpdE0xx4\r\nQHiQUwwUeNcKcEK7fCTafVtS0aHUpcyX9Mh8jtR53NZX/FG5kPhrTNeHWeff/2Ks\r\nEnS6ADECOKdcy7liHrrUjnay3svaLmTMSBGzRsXgWKizG1xf62cRo6CwgMQRrIoA\r\nTpiMWdVBdLh2wt2UtvUpsUmNBG4XEytRqDrizfsZv9zIdc9mr9T7stwHCywJbRaM\r\nzQIDAQAB\r\n-----END PUBLIC KEY-----\r\n",
          "privateKey": {
            "privateKeyPem": "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEowIBAAKCAQEA2ck46NDFoUCyRGiEJuzNmXs1tw9DQp8CqCLj1T/dr9hkVuV7\r\n7irK28zKb6CDEWvKuTs2RMtduOw2BHgu7bOOiiUwkxaqMkWi07/aK1B2ZRYNYp5H\r\nGJnFo8+SIw/VRMyWiq1uAgElLF5xcpdE0xx4QHiQUwwUeNcKcEK7fCTafVtS0aHU\r\npcyX9Mh8jtR53NZX/FG5kPhrTNeHWeff/2KsEnS6ADECOKdcy7liHrrUjnay3sva\r\nLmTMSBGzRsXgWKizG1xf62cRo6CwgMQRrIoATpiMWdVBdLh2wt2UtvUpsUmNBG4X\r\nEytRqDrizfsZv9zIdc9mr9T7stwHCywJbRaMzQIDAQABAoIBAECMQzG9rtV8N1nP\r\nIFvpE4bJ3cHD5Et6lW7/6EbsBuh3WkXm/jQ4uqcqq1UqXa5sJEmCIzOAkuacG+Z3\r\nOHF7JmQLYbo2nXsI6JmZ4y+zSWPshUsVXj0MVmeWvdlmd+9MM9ImVNSDQmFEHJu5\r\n+cwYRAvXr+7tRaQLGCztmmPRCHDedFWbBa6ndRxWQh8i8ipW4EVOhLq6hizyCP5+\r\nOwpiKsyqfC96plaUz79enko1nBrWMjn7jhw3BEBmTwbz9zKwLoRsxKyZo/9Sw6B/\r\nEWIxrEvcUxzFWHDXG94cJdakoHNZNXQcLmKuODRQK2W4j4v04SwD1Ip6Js3xjj1p\r\n5jbD9IECgYEA7UfKSGec3YIP0vkaEWps4ugtMrrvvU34DzfBD863XMLqHxmZdm+p\r\n5vwvzYCoKk8AYBzvDmyFZZChe0fomyL8dHZVWGUxP4DI6XT+Ia4oLNEN8Ldfu7uq\r\njFc3BoUc2R24dnIwLzKdA9VLsjNZ3ShYrCbJ3Wl/K7xonSj9aPwN20MCgYEA6ve3\r\nIq3GqfM0QSGuXv5QA0HrCXSezzcRXjBlUSGF6r1WMR86DXS0aihWKIi5K+3S728E\r\nwVJ2zVBkoNXqXm0+/xxxnHz0Oz5gzmIyFzMPZQZ+0AWrOfAZIqek0QE0y2kNzx7f\r\nZtZ6jKF6yqy2dyex6GwOYrUPkx/h9iC0RcHgDq8CgYBEUeVmj57VELvprRvaY+BS\r\nPTO2ZajdwvNnvk/yczzMkrrClaZgOaqb/YTuENtaw0CCbBJQ/uIx6kD0tDG/aYVz\r\nKxdLymcxt60huzPpErIypUb0RnhkH5btrbcEQ5OY2DviruI81L/s+J9BAhQf35wY\r\nhVqeS9/4AdnFVqYQcnKy7QKBgCZfhEIenTY+KMeGR6Lt54VQq6DksdbniGeYgcNp\r\nNSSr/TqSffmamKhJpCCEi7E36t39hIpJ/Gr1eSmnJdp7/vDM5WUIJx7Rxh+Oe928\r\nEgSOtgElG9yfcItvU4RqrQOXSZEM2rFBz8vNx274G+iDzBNIKmVGap+9cjqvBqHp\r\n0ryzAoGBAKwqPMeAI/+j1mSqve4yChf+wOd+SF/sLz7K8KTQibwEPvoSprPlHBO1\r\njndRGMVYKoq7rSfP+oiAlWUMnuHb9xhunbEoi1Mlknu50tF/9fMyL2mWrMm3G2h1\r\ndTUtU1vwpTvstgIB3d4d4gU9Hu2oXUIJjw3OWi06lMEhp7i5sNV8\r\n-----END RSA PRIVATE KEY-----\r\n"
          }
        }]
      }],
      "invokeCapability": [{
        "type": "RsaSignatureCapabilityAuthorization2018",
        "publicKey": [{
          "id": "did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok#ocap-invoke-key-1",
          "type": "RsaVerificationKey2018",
          "owner": "did:v1:test:nym:172J_1WppTrk7RrpSa7W9v3Rtz8FJTXz-kOVn975-Ok",
          "publicKeyPem": "-----BEGIN PUBLIC KEY-----\r\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxRnOWv7MXkWqycjYoRAn\r\nJEpY2T2Mim8FzLV4yWPoNDGwuJv61d8LvRJ9IfNc7/L1S4fw4InyDOBHKFt6fEFH\r\nKp2fSVDJGpVQrAQT+WADQ1qGYOk6iQraVbMPGOklrQAAIhtfWtVCi4BfmLZwV6rO\r\nHvREhqlu/Q+WOpPDXHJo1pGCw4oOMXbmqnH2L4P6duGvlkmJ+Vgg44O3WhRZWEH5\r\nFsQWz5qNmt6hrm479i31hugjQ8iq4dlzWtGv+mGflpmXZvvlpgjghykMsxEyV7GC\r\nLytdKY1BsoP7ZD6+4182WShutuDGKUn4/ypgkUK9EGo6LIwR6xs01jOhdBR/g8jh\r\nxQIDAQAB\r\n-----END PUBLIC KEY-----\r\n",
          "privateKey": {
            "privateKeyPem": "-----BEGIN RSA PRIVATE KEY-----\r\nMIIEpAIBAAKCAQEAxRnOWv7MXkWqycjYoRAnJEpY2T2Mim8FzLV4yWPoNDGwuJv6\r\n1d8LvRJ9IfNc7/L1S4fw4InyDOBHKFt6fEFHKp2fSVDJGpVQrAQT+WADQ1qGYOk6\r\niQraVbMPGOklrQAAIhtfWtVCi4BfmLZwV6rOHvREhqlu/Q+WOpPDXHJo1pGCw4oO\r\nMXbmqnH2L4P6duGvlkmJ+Vgg44O3WhRZWEH5FsQWz5qNmt6hrm479i31hugjQ8iq\r\n4dlzWtGv+mGflpmXZvvlpgjghykMsxEyV7GCLytdKY1BsoP7ZD6+4182WShutuDG\r\nKUn4/ypgkUK9EGo6LIwR6xs01jOhdBR/g8jhxQIDAQABAoIBAQC6k+EpdkVTgDNZ\r\n7ExUuwuyaMaObpsZeFtPGwIJ8g8fSWJ2fwEFb6yXAGd/ufXiFmVpaHf2td5xneT+\r\nKQpbkRejGa5tIpIcHfhNvVaDHAY6vfiyyFTm4WUo9uV1uU424+c8YhjzzSi/EXht\r\nAVZ7Rm70ElrD9qPf3d9h9/pZCtx/L3n3T/OXAWc7RROnOOPG71yFL9I0ZBcKy6ku\r\nA8EH8ITPA4vUlC6NeQUEwyCGf/VhGDu+uUwOo8/QHVlcqpObZq0jvnT1DA4bmmj+\r\nsPVLPqSe5mR/yKyT8I2iRWlrmSryjI6q+/9h40maNidoIM4RtrGXhQoQ957n1QSD\r\nzVbDrfbJAoGBAOSjNyjdQOUQI2cFScpPFeqvWDMQclopbvtrJ5potDuu2azFdb/N\r\nCa54PdkgsIQBYfFc5cZg7JJWHzbLtSIi/uoX6nuwwJtSJMxRsPwZfUQI2h7i4LHL\r\nQUrpKzXCJuLKsmqJUkV909ckqrVJy3aoiUXe6JpggnVFeUCF5KCqVoVXAoGBANyw\r\nZZoGSkynH11fko6i96cS0HZHT4yUrwhMuX+lDCGuj1jZHNOsYDvnsa48JaxYO7l+\r\nrfZ8t4FCTy8BFZ2fNCOwMOmosLL5NpNq5mXHiuh8QHFP2tXR/v/+vY6fQewhiBf4\r\ndlpRiszEX5dY1FGPy51qLMHmpMxX35cKwFIOomRDAoGALlVJG1XjDch8dCclMgNe\r\n3KVWCVse4VieLgMkDm2DgMjJQfLuDsVdXebuGa8/NjEViRUbV11S88DSKIeVmGph\r\nIE1iblh+X7uAy4sOg7gio4Prt/CgOkeHXsfrwsQqnzEWgPJ9IqoCIQpEMeLXgZ9b\r\n2jX3CzndlihTDxlTIKAEUpcCgYBi+JzoIXAKxlxTlLv2SfHEtLRWhw6O3lNM5pO+\r\nQfeZ114kG2JJL6IM25Ccsg63Ju7J9pzv0Oi/CEzYqKTYBoDsjGSzNVrhONCX9jYT\r\naRTLxIVmC8j5YW75wXWjU5rN2g/dqCjzwmP8BwlTp5u4ZEONegNOhjBcEACPDVxI\r\nsJV1XwKBgQDA7k6ta0iqau3cYu6WprSTj7C9ZRt8jcELgVuxYrqxFtFGB7WFZEQm\r\nYyQHw7Cl7Xqum1t9V+fZu2+CL0eywfsO9ki1pHQaXNiXaM24+CyCbYl7RzEL2EMv\r\nei8sjoBJOJkjZhit6WangC7Nc35Z4mm2KmfXuWbLJ9M+O1RkAJr3sw==\r\n-----END RSA PRIVATE KEY-----\r\n"
          }
        }]
      }]
  };

  return value;

  }

}
