import React, { useState } from 'react'
import { addExceptionRule, addRedirectRule } from '../../utils/rules'
import { setStoredOptions, setStoredURL } from '../../utils/storage'
import { blockedURL } from '../../utils/storage'

const useAddBlockRule = (urls: blockedURL[], resource) => {
  const [stateURLs, setStateURLs] = useState<blockedURL[]>()
  const categories = urls[0].categories
  // urls.forEach(url => url.blockedLinks.forEach(blockedLink => {
  //   addRedirectRule(blockedLink, resource, categories).then(() => {
  //     if(url.exceptionLinks) {
  //       url.exceptionLinks.forEach(link => {
  //         addExceptionRule(link)
  //       })
  //     }
  //     setStoredURL(urls).then(() => {
  //             setStateURLs(p => [
  //       ...p,
  //       urls[0]
  //     ])
  //     })
  //   })
  // }))
  addRedirectRule(urls[-1].blockedLinks[-1], categories).then(() => {
    if(urls[0].exceptionLinks) {
      urls[0].exceptionLinks.map(link => {
        addExceptionRule(link)
      })
    }
    setStoredURL(urls).then(() => {
      setStateURLs(p => [
        ...p,
        urls[0] 
      ])
    })
  })
  return stateURLs
}


export { useAddBlockRule }