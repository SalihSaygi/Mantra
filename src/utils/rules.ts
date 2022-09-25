    enum RuleActionType {
        BLOCK = "block",
        REDIRECT = "redirect",
        ALLOW = "allow",
        UPGRADE_SCHEME = "upgradeScheme",
        MODIFY_HEADERS = "modifyHeaders",
        ALLOW_ALL_REQUESTS = "allowAllRequests"
    }
    
   enum ResourceType {
        MAIN_FRAME = "main_frame",
        SUB_FRAME = "sub_frame",
        STYLESHEET = "stylesheet",
        SCRIPT = "script",
        IMAGE = "image",
        FONT = "font",
        OBJECT = "object",
        XMLHTTPREQUEST = "xmlhttprequest",
        PING = "ping",
        CSP_REPORT = "csp_report",
        MEDIA = "media",
        WEBSOCKET = "websocket",
        OTHER = "other"
    }
    
    // const addBlockRule = (dirtyURL, resource) => {
//   return new Promise<void>((res, rej) => {
//     if(isNaN(dirtyURL) || isNaN(resource)) {
//       rej("Needed parameters are missing.")
//     }
//     const url = urlSanitizer(dirtyURL)

//     let id = nanoid()

//     chrome.declarativeNetRequest.updateDynamicRules(
//       {addRules:[{
//         "id": id,
//         "priority": 2,
//         "action": { "type": "block" },
//         "condition": {"urlFilter": url, "resourceTypes": resource || ["main_frame"] }}
//       ],
//         removeRuleIds: [id]
//       })
//     res()
//   })
// }


const addRedirectRule = (dirtyURL, categories, id) => {
  return new Promise<void>((res, rej) => {
    // if(isNaN(dirtyURL) || isNaN(categories)) {
    //     rej("Needed parameters are missing.")
    // }
    // const url = urlSanitizer(dirtyURL)
 
    const extensionURL = chrome.runtime.getURL(getCategoryQuery(categories))
    console.log('extensionURL', extensionURL)
    chrome.declarativeNetRequest.updateDynamicRules(
      {addRules:[{
        "id": id,
        "priority": 2,
        "action": { "type": RuleActionType.REDIRECT, "redirect": { "url": extensionURL } },
        "condition": {"urlFilter": dirtyURL, "resourceTypes": [ResourceType.MAIN_FRAME] }}
      ],
        removeRuleIds: [id]
      })
    res()
  })
}

const addExceptionRule = (dirtyURL, id) => {
  // const url = urlSanitizer(dirtyURL)


  chrome.declarativeNetRequest.updateDynamicRules(
    {addRules:[{
      "id": id,
      "priority": 1,
      "action": { "type": RuleActionType.ALLOW},
      "condition": {"urlFilter": dirtyURL, "resourceTypes": [ResourceType.MAIN_FRAME] }}
    ],
      removeRuleIds: [id]
    })
}

// const addRedirectExceptionRule = (dirtyURL, categories) => {
//   const url = urlSanitizer(dirtyURL)
//   let id = nanoid()

//   const extensionURL = browser.runtime.getURL(getCategoryQuery(categories))

//   chrome.declarativeNetRequest.updateDynamicRules(
//     {addRules:[{
//       "id": id,
//       "priority": 1,
//       "action": { "type": "redirect", redirect: { "url": extensionURL }},
//       "condition": {"urlFilter": url, "resourceTypes": ["main_frame"] }}
//     ],
//       removeRuleIds: [id]
//     })
// }

const urlSanitizer = (dirtyURL) => {
  return dirtyURL.replace("[^-A-Za-z0-9+&@#/%?=~_|!:,.;\(\)]", "");
} 

const getCategoryQuery = (categories) => {
  console.log(categories, "categories")
  let query = `options.html#/notes?category=${categories[0]}`
  categories.shift()
  categories.forEach(category => {
   query.concat(`&category=${category}`)
  })
  return query
}

export { addExceptionRule, addRedirectRule }