
// /**
//  * @file
//  * The configuration file for the example.
//  * @author DocuSign
//  */

// const env = process.env;



// exports.config = {
//     /** The app's integration key. "Integration key" is a synonym for "client id.' */
//     clientId: env.DS_CLIENT_ID || '4510b358-662d-4372-bc68-5810d4d5a0ef'
//     /** The guid for the user who will be impersonated.
//      *  An email address can't be used.
//      *  This is the user (or 'service account')
//      *  that the JWT will represent. */
//   , impersonatedUserGuid: env.DS_IMPERSONATED_USER_GUID || 'ef7426a9-7b70-4a6c-a359-e58ca57ecfce'
//   , signerEmail: env.DS_SIGNER_EMAIL || 's.blancoc@uniandes.edu.co'
//     /** The name of the envelope's signer. */
//   , signerName: env.DS_SIGNER_NAME || 'Santiago Blanco'
//     /** The email address for the envelope's cc recipient.
//       * It can't be the same as the signer's email unless
//       * the account is set to enable someone to be repeated in
//       * the recipient list. */
//   , ccEmail: env.DS_CC_EMAIL || 's.blancoc@uniandes.edu.co'
//     /** The name of the envelope's cc recipient. */
//   , ccName: env.DS_CC_NAME || 'Santiago Blanco'
//     /** The private key */
//     /** Enter the key as a multiline string value. No leading spaces! */
//   , privateKey: env.DS_PRIVATE_KEY || `-----BEGIN RSA PRIVATE KEY-----
// MIIEowIBAAKCAQEAjroQopQcS5SujtrA1Zm9oqbHfVuOKcDqluw0G6ZLMao3akCc
// toU3OPdIVKUiEYSVRfDH03yscTYt77sBrobQMRpAFxExRzURJF4TBAaaoFS4BWRo
// FAhoCDKOfwddslYG4Y6cCE0q9WM7/6jhkPTlrc9vqTf1kC0bQP+3Obdxeyru19DU
// cbtgBtGsotjAfk+AHVEbfIJ0JdiycJCKvskqBExHMM2AMnFsZ1txw3VjOWfxJMRF
// mscPTxydP+x8CeK8nVXrD6DGyOmQprXQBlqx/XQRYpbRM+jZSZEegZ3iggYaCSRe
// GXc3a8OpXTjaWGOyOWU5bkE9IKrrvNpkqltcxwIDAQABAoIBABn4rq0+4VU5hXgW
// Q0+7DaBq09MyVVCwu59h9OtxG666aCIMBthJrm5NxRouAGCKrTUQZvRLc/+X2c0N
// TPWKr5i3y6DG7p4kAG4LNk+dugZh1CibCDtY+kE/neFsoDai49aogikaja4gdBsG
// CqG7ho3VuN5kgelN4+80eQ1mHZ7JPw0Ee0IKjOMwamN4CIDajE9NLmyaBzyA7gVm
// wKelCYhaN//i3DmfQN7ikGzVMGsDyUMHxV4vFy5/I66rXr1Cj7bsScfJaUKpqhQ5
// pQXR6eDVrSKF+MwP3Mu3cq6+jnEqIg7iKeSMKzveBK0B3devIRQjPBpTgmMd/XXm
// 3cfwSdkCgYEA5AobRZMArrDRp1OPWWT+RRcEXH4540Nh9BFSo19BoPfCiOOc8phl
// yljaZ7LNVJyXw/8CYZrHE6MCmn/SNVKfFTgLjWy+vZfbC9ZubFUOqww2MOszqXiF
// XCCmSINDDOqTRkr40TdtplYVovWcaTqHWvu/Po943JGNj/pxsZkxvD8CgYEAoDoX
// 6YMlZ51OPk5YCGbByYXt/5SKPFvzVdVS4B6hu0XAfIPNwC1sxQMV0VS+/98Qw3Bq
// 438axrvXKO7QFvBsYydWerNPwC6fMtMC1JuQO6X1B9IzEuidhuSrdTqNg1OqhzbM
// BJvBHyOgrr7L+547SuyKcaIHonrzDovdtcPp3XkCgYBKDw40Vj2OflZYZUbU3XvG
// rGb6MvRR3nxda5LPBAyoXk6LboB2ORA12w1zSBpvNDwFpzf6wu2MbxBVZNW8A40u
// svjtgTehE0RMX+OUwzr0Sg7/bCNnEoEdHm1id167PyN9XLPaHoo5zxNPzTxy4FM9
// NS0zAB1cZNj4vXlXGE2SuQKBgE8GN/L4tsMSx5tdQnfqTluZTZfHaCJ661oDG5vk
// H7pgnZ4L17eX79R/QAx9crJ6DyeFU4KeltM7o9PRbRpTO/HvXeyocYYEuIn1nqjD
// jPCOWnqgBoal6cO1Fod7+H20DyAfO6JuO2KjTMXC3pJcKTw7y9BdrMxLPYOIIjJa
// zQZpAoGBAMlAsD14HQy/udQQSUhV1VoeCsZWwCa9uqEEsck3Y26FbUo0ju/fowTp
// 6CEpJt3X9IMZ9UltVq4UDEF4DkGoh1QhMH0C3WXwWOYlONqNAnbeRONkQQ6N5QKb
// HtMa4r4iKoGYSgsE4kHSvbaVMyvGOfTHTZB3pkhdugiTxmLCzanD
// -----END RSA PRIVATE KEY-----` 
//     /** For the Developer Sandbox (demo) use <b>https://account-d.docusign.com</b><br>
//       * For production (all sites) use <b>https://account.docusign.com</b> */


//   /** The account_id that will be used.
//    *  If set to false, then the user's default account will be used.
//    *  If an account_id is provided then it must be the guid
//    *  version of the account number.
//    *  Default: false  */
//   , targetAccountId: false
//   // The authentication server. DO NOT INCLUDE https:// prefix!
//   , authServer: env.DS_AUTH_SERVER || 'account-d.docusign.com'
//     /** The same value must be set as a redirect URI in the
//      *  DocuSign admin tool. This setting is <b>only</b> used for individually granting
//      *  permission to the clientId if organizational-level permissions
//      *  are not used.
//      *  <br><b>Default:</b> <tt>https://www.docusign.com</tt> */
//   , oAuthConsentRedirectURI: 'https://www.docusign.com'
// }



/**
 * @file
 * The configuration file for the example.
 * @author DocuSign
 */

const env = process.env;



exports.config = {
    /** The app's integration key. "Integration key" is a synonym for "client id.' */
    clientId: env.DS_CLIENT_ID || '4510b358-662d-4372-bc68-5810d4d5a0ef'
    /** The guid for the user who will be impersonated.
     *  An email address can't be used.
     *  This is the user (or 'service account')
     *  that the JWT will represent. */
  , impersonatedUserGuid: env.DS_IMPERSONATED_USER_GUID || 'ef7426a9-7b70-4a6c-a359-e58ca57ecfce'
  , signerEmails: ['s.blancoc@uniandes.edu.co','santiagowhite99@hotmail.com']
    /** The name of the envelope's signer. */
  , signerNames: ['Santiago Blanco', 'Santiago Cediel']
    /** The email address for the envelope's cc recipient.
      * It can't be the same as the signer's email unless
      * the account is set to enable someone to be repeated in
      * the recipient list. */
  , ccEmails:['s.blancoc@uniandes.edu.co','santiagowhite99@hotmail.com']
    /** The name of the envelope's cc recipient. */
  , ccNames: ['Santiago Blanco', 'Santiago Cediel']
    /** The private key */
    /** Enter the key as a multiline string value. No leading spaces! */
  , privateKey: env.DS_PRIVATE_KEY || `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAjroQopQcS5SujtrA1Zm9oqbHfVuOKcDqluw0G6ZLMao3akCc
toU3OPdIVKUiEYSVRfDH03yscTYt77sBrobQMRpAFxExRzURJF4TBAaaoFS4BWRo
FAhoCDKOfwddslYG4Y6cCE0q9WM7/6jhkPTlrc9vqTf1kC0bQP+3Obdxeyru19DU
cbtgBtGsotjAfk+AHVEbfIJ0JdiycJCKvskqBExHMM2AMnFsZ1txw3VjOWfxJMRF
mscPTxydP+x8CeK8nVXrD6DGyOmQprXQBlqx/XQRYpbRM+jZSZEegZ3iggYaCSRe
GXc3a8OpXTjaWGOyOWU5bkE9IKrrvNpkqltcxwIDAQABAoIBABn4rq0+4VU5hXgW
Q0+7DaBq09MyVVCwu59h9OtxG666aCIMBthJrm5NxRouAGCKrTUQZvRLc/+X2c0N
TPWKr5i3y6DG7p4kAG4LNk+dugZh1CibCDtY+kE/neFsoDai49aogikaja4gdBsG
CqG7ho3VuN5kgelN4+80eQ1mHZ7JPw0Ee0IKjOMwamN4CIDajE9NLmyaBzyA7gVm
wKelCYhaN//i3DmfQN7ikGzVMGsDyUMHxV4vFy5/I66rXr1Cj7bsScfJaUKpqhQ5
pQXR6eDVrSKF+MwP3Mu3cq6+jnEqIg7iKeSMKzveBK0B3devIRQjPBpTgmMd/XXm
3cfwSdkCgYEA5AobRZMArrDRp1OPWWT+RRcEXH4540Nh9BFSo19BoPfCiOOc8phl
yljaZ7LNVJyXw/8CYZrHE6MCmn/SNVKfFTgLjWy+vZfbC9ZubFUOqww2MOszqXiF
XCCmSINDDOqTRkr40TdtplYVovWcaTqHWvu/Po943JGNj/pxsZkxvD8CgYEAoDoX
6YMlZ51OPk5YCGbByYXt/5SKPFvzVdVS4B6hu0XAfIPNwC1sxQMV0VS+/98Qw3Bq
438axrvXKO7QFvBsYydWerNPwC6fMtMC1JuQO6X1B9IzEuidhuSrdTqNg1OqhzbM
BJvBHyOgrr7L+547SuyKcaIHonrzDovdtcPp3XkCgYBKDw40Vj2OflZYZUbU3XvG
rGb6MvRR3nxda5LPBAyoXk6LboB2ORA12w1zSBpvNDwFpzf6wu2MbxBVZNW8A40u
svjtgTehE0RMX+OUwzr0Sg7/bCNnEoEdHm1id167PyN9XLPaHoo5zxNPzTxy4FM9
NS0zAB1cZNj4vXlXGE2SuQKBgE8GN/L4tsMSx5tdQnfqTluZTZfHaCJ661oDG5vk
H7pgnZ4L17eX79R/QAx9crJ6DyeFU4KeltM7o9PRbRpTO/HvXeyocYYEuIn1nqjD
jPCOWnqgBoal6cO1Fod7+H20DyAfO6JuO2KjTMXC3pJcKTw7y9BdrMxLPYOIIjJa
zQZpAoGBAMlAsD14HQy/udQQSUhV1VoeCsZWwCa9uqEEsck3Y26FbUo0ju/fowTp
6CEpJt3X9IMZ9UltVq4UDEF4DkGoh1QhMH0C3WXwWOYlONqNAnbeRONkQQ6N5QKb
HtMa4r4iKoGYSgsE4kHSvbaVMyvGOfTHTZB3pkhdugiTxmLCzanD
-----END RSA PRIVATE KEY-----` 
    /** For the Developer Sandbox (demo) use <b>https://account-d.docusign.com</b><br>
      * For production (all sites) use <b>https://account.docusign.com</b> */


  /** The account_id that will be used.
   *  If set to false, then the user's default account will be used.
   *  If an account_id is provided then it must be the guid
   *  version of the account number.
   *  Default: false  */
  , targetAccountId: false
  // The authentication server. DO NOT INCLUDE https:// prefix!
  , authServer: env.DS_AUTH_SERVER || 'account-d.docusign.com'
    /** The same value must be set as a redirect URI in the
     *  DocuSign admin tool. This setting is <b>only</b> used for individually granting
     *  permission to the clientId if organizational-level permissions
     *  are not used.
     *  <br><b>Default:</b> <tt>https://www.docusign.com</tt> */
  , oAuthConsentRedirectURI: 'https://www.docusign.com'
}
