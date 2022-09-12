import { nanoid } from "nanoid"

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

const addRedirectRule = (dirtyURL, categories) => {
  return new Promise<void>((res, rej) => {
    if(isNaN(dirtyURL) || isNaN(categories)) {
        rej("Needed parameters are missing.")
    }
    const url = urlSanitizer(dirtyURL)

    let id = nanoid()

    const extensionURL = chrome.runtime.getURL(getCategoryQuery(categories))

    chrome.declarativeNetRequest.updateDynamicRules(
      {addRules:[{
        "id": Number(id),
        "priority": 2,
        "action": { "type": RuleActionType.REDIRECT, "redirect": { "url": extensionURL } },
        "condition": {"urlFilter": url, "resourceTypes": [ResourceType.MAIN_FRAME] }}
      ],
        removeRuleIds: [Number(id)]
      })
    res()
  })
}

const addExceptionRule = (dirtyURL) => {
  const url = urlSanitizer(dirtyURL)

  let id = nanoid()

  chrome.declarativeNetRequest.updateDynamicRules(
    {addRules:[{
      "id": Number(id),
      "priority": 1,
      "action": { "type": RuleActionType.BLOCK},
      "condition": {"urlFilter": url, "resourceTypes": [ResourceType.MAIN_FRAME] }}
    ],
      removeRuleIds: [Number(id)]
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
  let query = `options?categories=${categories[0]}`
  const categoriesWithoutFirstCategory = categories.shift()
  categoriesWithoutFirstCategory.forEach(category => {
   query.concat(`${category}`)
  })
  return query
}

export { addExceptionRule, addRedirectRule }