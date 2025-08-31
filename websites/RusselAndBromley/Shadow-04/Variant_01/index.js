(() => {
  function observeAndRun() {
    const observer = new MutationObserver(() => {
      mainJs();
    });
    targetNode = document.querySelector('#root');
    observer.observe(targetNode, { childList: true, subtree: true });
  }
  
  function waitForElem(
    waitFor,
    callback,
    minElements = 1,
    isVariable = false,
    timer = 10000,
    frequency = 25
  ) {
    let elements = isVariable
      ? window[waitFor]
      : document.querySelectorAll(waitFor);
    if (timer <= 0) return;
    (!isVariable && elements.length >= minElements) ||
    (isVariable && typeof window[waitFor] !== "undefined")
      ? callback(elements)
      : setTimeout(
          () =>
            waitForElem(
              waitFor,
              callback,
              minElements,
              isVariable,
              timer - frequency
            ),
          frequency
        );
  }

  function mainJs() { 
    let sizeElement;
    waitForElem('.RefinementMenu__RefinementHeaderTitle', (titles) => {
      titles.forEach((title) => {
        const textContent = title.textContent;
        if (textContent.includes('Size')) {
          sizeElement = title.closest('.RefinementMenu__RefinementHeader');
        }
      })

      sizeElement?.closest('.RefinementMenu__Item__Wrapper').querySelectorAll('.RefinementMenu__Refinements label>span').forEach((el) => {
        if(el.innerHTML.includes('US')) {
          el.innerHTML = el?.innerHTML?.replace(/\s*\/\s*US\s*\d+/, '');
        }        
      })
    })

    waitForElem('.AppliedFilterBreadcrumbs .Option-Label', (options)=>{
      options.forEach((option) => {
        if(option.innerHTML.includes('US')) {
        option.innerHTML = option?.innerHTML?.replace(/\s*\/\s*US\s*\d+/, '');}
      })
    })
  }

  mainJs()
  observeAndRun();
})();