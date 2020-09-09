# PaytmPG

> Base on Paytm all-in-one SDK

### Supported Platform
- Android
- iOS

### Document
https://developer.paytm.com/docs/all-in-one-sdk/hybrid-apps/ionic/

### Installation
Install `cordova-plugin-paytmpg` plugin.
```
cordova plugin add cordova-plugin-paytmpg --variable MERCHANT_ID=<MerchantID> --variable INDUSTRY_TYPE_ID=<IndustryType> --variable WEBSITE=<WAPWebsiteName> --save
```
Add maven repository to android/app/build.grade.
```
repositories {
  // ...
  maven {
      url "https://artifactory.paytm.in/libs-release-local"
  }
}
```

### Usage
##### Add below line to declaration.d.ts file
```
declare var paytm : any;
```

##### Start a Payment with specisl Payment Method
```
paytm.startOrder(options, successCallback, failureCallback);

// Expected "Options" that has to be send to the plugin to start the transactions
{
  "mid": "string",
  "orderId": "string",
  "txnToken": "string",
  "amount": "number",
  "isStaging": "boolean",
  "callbackUrl": "string"
}
```

##### Start a general Payment
```
paytm.startPayment(options, successCallback, failureCallback);

// Expected "Options" that has to be send to the plugin to start the transactions
// Note: CHECKSUM has to be created without "ENVIRONMENT" field, it is for plugin's internal use to determine which environment it's going to hit.
{
  "REQUEST_TYPE": "DEFAULT",
  "MID": "PAYTM_MERCHANT_ID",
  "ORDER_ID": "ORDER0000000001",
  "CUST_ID": "10000988111",
  "INDUSTRY_TYPE_ID": "PAYTM_INDUSTRY_TYPE_ID",
  "CHANNEL_ID": "WAP",
  "TXN_AMOUNT": "1",
  "WEBSITE": "PAYTM_WEBSITE",
  "CALLBACK_URL": "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=ORDER0000000001",
  "EMAIL": "abc@gmail.com",
  "MOBILE_NO": "9999999999",
  "CHECKSUMHASH": "w2QDRMgp1/BNdEnJEAPCIOmNgQvsi+BhpqijfM9KvFfRiPmGSt3Ddzw+oTaGCLneJwxFFq5mqTMwJXdQE2EzK4px2xruDqKZjHupz9yXev4="
}
```

##### Callback
In Callback method, you will get response object as json, with infromation present in https://developer.paytm.com/docs/all-in-one-sdk/hybrid-apps/ionic
```
var successCallback(response) {
    if (response.STATUS == "TXN_SUCCESS") {
        var txn_id = response.TXNID;
        var paymentmode = response.PAYMENTMODE;
        // other details and function after payment transaction
    } else {
        // error code will be available in RESPCODE
        // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
        alert("Transaction Failed for reason " + response.RESPMSG);
    }
}

var failureCallback(error) {
    // error code will be available in RESCODE
    // error list page https://docs.google.com/spreadsheets/d/1h63fSrAmEml3CYV-vBdHNErxjJjg8-YBSpNyZby6kkQ/edit#gid=2058248999
    alert("Transaction Failed for reason " + error.RESPMSG);
}
```

##### Response:
```
{
  "TXNID": "414709",
  "BANKTXNID": "",
  "ORDERID": "ORDER48886809916",
  "TXNAMOUNT": "1.00",
  "STATUS": "OPEN",
  "TXNTYPE": "SALE",
  "GATEWAYNAME": "",
  "RESPCODE": "",
  "RESPMSG": "",
  "BANKNAME": "",
  "MID": "klbGlV59135347348753",
  "PAYMENTMODE": "CC",
  "REFUNDAMT": "0.00",
  "TXNDATE": "2015-11-02 11:40:46.0"
}
```

##### References:
[Various fields avialbale in "options"](http://paywithpaytm.com/developer/paytm_api_doc?target=transaction-request-api)   
[Doc on response from the plugin](http://paywithpaytm.com/developer/paytm_api_doc?target=interpreting-response-sent-by-paytm)   
[Logic to generate checksum](http://paywithpaytm.com/developer/paytm_api_doc?target=generating-checksum)   
Paytm guys suggests to verify the transaction status manually after the successful transaction.   
[Refer this link to know about it](http://paywithpaytm.com/developer/paytm_api_doc?target=txn-status-api)   

##### Note:
* ENVIRONMENT info has to be part of 'options', which says the environment  transaction has to be started. Possible values are 'staging' and 'production'.
* Send transaction amount in String format, as that is the format accepted in iOS platform.
