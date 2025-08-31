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
    console.log("inside mainJs");
    waitForElem('#universeHome > ul:nth-child(1) > li:nth-child(13)', () => {

      // level 1 list item creation=========================================

      // new list item code
      const newListItem = document.createElement('li');
      newListItem.classList.add('menuSelectionList', 'default');
      newListItem.setAttribute('data-haschild', 'true');
      newListItem.setAttribute('data-lvl', '1');
      newListItem.setAttribute('role', 'menu item');
      
      document.querySelector('#universeHome > ul:nth-child(1) > li:nth-child(13)')
              .insertAdjacentElement('afterend', newListItem);

      // inside new list item: an anchor tag
      const newLink = document.createElement('a');
      newLink.href = "/pplp/100/75363/cat-75509.aspx#shoppingtool=treestructureflyout";
      newLink.setAttribute('data-lvl', '1');
      newLink.setAttribute('role', 'button');
      newLink.classList.add('default', 'modal--nextPanel');
      newLink.classList.add('link-style');
      newLink.innerText = 'Storage';

      newListItem.appendChild(newLink);
      
      // inside new link: a span with img
      const newSpan = document.createElement('span');
      newSpan.classList.add('menu_icon', 'default');
      newLink.insertAdjacentElement('afterbegin', newSpan);

      // inside new span: an img
      const newImg = document.createElement('img');
      newImg.src = "https://i.postimg.cc/63RkCFPg/bg-storage.png";
      newImg.alt = "";
      newImg.setAttribute('role', 'presentation');
      newImg.classList.add('img-size');
      newSpan.appendChild(newImg);

      // level 1 list item creation end=========================================


      // level 2 list item creation=========================================
      waitForElem('#lrNewMenuV4 > div.panel-content', () => {
        const newListItemL2 = document.createElement('div');
        newListItemL2.classList.add('panel-content-element');
        document.querySelector('#lrNewMenuV4 > div.panel-content').appendChild(newListItemL2);
  
        // level 2 list panel header
        const l2ListHeader = document.createElement('div');
        l2ListHeader.classList.add('panel-header');
        newListItemL2.appendChild(l2ListHeader);
  
        const l2ListHeaderInner = document.createElement('div');
        l2ListHeaderInner.classList.add('panel-imagePlaceholder', 'panel-header-opacity');
        l2ListHeader.appendChild(l2ListHeaderInner);
  
        const l2ListHeaderImg = document.createElement('img');
        l2ListHeaderImg.src = "https://i.postimg.cc/63RkCFPg/bg-storage.png";
        l2ListHeaderImg.alt = "";
        l2ListHeaderImg.classList.add('panel-header-img');
        l2ListHeaderInner.appendChild(l2ListHeaderImg);
  
        // level 2 list panel title
        const l2ListTitle = document.createElement('div');
        l2ListTitle.classList.add('titleBlock', 'panel-title');
        newListItemL2.appendChild(l2ListTitle);
  
        // inside panel title
        const l2ListTitleLabel = document.createElement('span');
        l2ListTitleLabel.classList.add('panel-title-label');
        l2ListTitleLabel.innerText = 'Shop by storage';
        l2ListTitle.appendChild(l2ListTitleLabel);
        
        const l2ListButton = document.createElement('div');
        l2ListButton.setAttribute('data-lvl', '2');
        l2ListButton.setAttribute('data-haschild', 'false');
        l2ListButton.setAttribute('data-cerberus', 'mainmenu-l2-cat');
        l2ListTitle.appendChild(l2ListButton);
  
        const l2ListButtonLink = document.createElement('a');
        l2ListButtonLink.href = 'https://www.laredoute.co.uk/psrch/psrch.aspx?kwrd=Storage&virtualsite=100#headerSearchContainer&shoppingtool=search';
        l2ListButtonLink.setAttribute('role', 'button');
        l2ListButtonLink.classList.add('lr-pillButton');
        l2ListButton.appendChild(l2ListButtonLink);
  
        const l2ListButtonLinkText = document.createElement('span');
        l2ListButtonLinkText.classList.add('lr-pill-dark');
        l2ListButtonLinkText.innerText = 'View the category';
        l2ListButtonLink.appendChild(l2ListButtonLinkText);
        
        const panelScrollBuffer = document.createElement('div');
        panelScrollBuffer.classList.add('panel-scrollBuffer');
        newListItemL2.appendChild(panelScrollBuffer);

        const insiderElements = [
          {
            tag: 'li',
            name: 'Shelves & Shelving Units',
            link: 'https://www.laredoute.co.uk/pplp/100/75363/158099/cat-75391.aspx',
            classNames: 'menuSelectionList data-id-1',
            iconImg : 'https://i.postimg.cc/g0wF2xHY/bg-Shelves-shelving-units.png'
          },
          {
            tag: 'div',
            id: '386007',
            name: 'Bedroom Storage Furniture',
            brand: '/index/brand-386007.aspx',
            link: '/pplp/cat-386007.aspx',
            iconImg : 'https://i.postimg.cc/ZY6mNytn/bg-Bedroom-storage-furniture.png',
            dropdowns: [
              {
                id: '75434',
                name: 'Chest of Drawers',
                brands: '/index/brand-75434.aspx',
                link: '/pplp/100/75363/158099/cat-75434.aspx',
              },
              {
                id: '75433',
                name: 'Dressing Tables',
                brands: '/index/brand-75433.aspx',
                link: '/pplp/100/75363/158099/cat-75433.aspx',
              },
              {
                id: '300594',
                name: 'Tallboys',
                brands: '/index/brand-300594.aspx',
                link: '/pplp/cat-300594.aspx',
              },
              {
                id: '75420',
                name: 'Kids Chest of Drawers',
                brands: '/index/brand-75420.aspx',
                link: '/pplp/100/75363/75416/cat-75420.aspx',
              },
              {
                id: '75530',
                name: 'Baby Changing Tables & Units',
                brands: '/index/brand-75530.aspx',
                link: '/pplp/100/75363/75526/cat-75530.aspx',
              }
            ]
          },
          {
            tag: 'div',
            id: '386008',
            name: 'Wardrobes & Clothes Storage',
            brand: '/index/brand-386008.aspx',
            link: '/pplp/cat-386008.aspx',
            iconImg : 'https://i.postimg.cc/MHSh5d2T/bg-Wardrobes-clothes-storage.png',
            dropdowns: [
              {
                id: '75430',
                name: 'Wardrobes',
                brands: '/index/brand-75430.aspx',
                link: '/pplp/100/75363/158099/cat-75430.aspx',
              },
              {
                id: '75417',
                name: 'Kids Wardrobes',
                brands: '/index/brand-75417.aspx',
                link: '/pplp/100/75363/75416/cat-75417.aspx',
              },
              {
                id: '75437',
                name: 'Shoe storage',
                brands: '/index/brand-75437.aspx',
                link: '/pplp/100/75363/158099/cat-75437.aspx',
              },
              {
                id: '75436',
                name: 'Modular Storage',
                brands: '/index/brand-75436.aspx',
                link: '/pplp/100/75363/158099/cat-75436.aspx',
              },
              {
                id: '75432',
                name: 'Clothes hangers & organisers',
                brands: '/index/brand-75432.aspx',
                link: '/pplp/100/75363/158099/cat-75432.aspx',
              },
              {
                id: '75489',
                name: 'Clothes bags & covers',
                brands: '/index/brand-75489.aspx',
                link: '/pplp/100/75363/158099/cat-75489.aspx',
              },
              {
                id: '75413',
                name: 'Clothing stands & rails',
                brands: '/index/brand-75413.aspx',
                link: '/pplp/100/75363/158099/cat-75413.aspx',
              },
              {
                id: '139742',
                name: 'Coat Racks',
                brands: '/index/brand-139742.aspx',
                link: '/pplp/100/75363/158099/cat-139742.aspx',
              }
            ]
          },
          {
            tag: 'div',
            id: '75383',
            name: 'Sideboards, Dressers & Cabinets',
            brand: '/index/brand-75383.aspx',
            link: '/pplp/100/75363/158099/cat-75383.aspx',
            iconImg : 'https://i.postimg.cc/N0Wh9QdR/bg-Sideboards-dressers-cabinets.png',
            dropdowns: [
              {
                id: '386004',
                name: 'Sideboards',
                brands: '/index/brand-386004.aspx',
                link: '/pplp/cat-386004.aspx',
              },
              {
                id: '386005',
                name: 'Dressers',
                brands: '/index/brand-386005.aspx',
                link: '/pplp/cat-386005.aspx',
              },
              {
                id: '75484',
                name: 'Bar Cabinets',
                brands: '/index/brand-75484.aspx',
                link: '/pplp/100/75363/158090/cat-75484.aspx',
              },
              {
                id: '75440',
                name: 'Kitchen Units',
                brands: '/index/brand-75440.aspx',
                link: '/pplp/100/75363/75438/cat-75440.aspx',
              }
            ]
          },
          {
            tag: 'li',
            name: 'Bookcases',
            link: 'https://www.laredoute.co.uk/pplp/100/75363/158099/cat-75390.aspx',
            classNames: 'menuSelectionList data-id-1',
            iconImg : 'https://i.postimg.cc/kXcd135d/bg-Bookcases.png'
          },
          {
            tag: 'div',
            id: '74834',
            name: 'Storage Décor',
            brand: '/index/brand-74834.aspx',
            link: '/pplp/100/74779/cat-74834.aspx',
            iconImg : 'https://i.postimg.cc/tJN8MWpz/bg-Storage-decor.png',
            dropdowns: [
              {
                id: '75490',
                name: 'Baskets & Boxes',
                brands: '/index/brand-75490.aspx',
                link: '/pplp/100/75363/158099/cat-75490.aspx',
              },
              {
                id: '75488',
                name: 'Storage Trunks & Chests',
                brands: '/index/brand-75488.aspx',
                link: '/pplp/100/75363/158099/cat-75488.aspx',
              },
              {
                id: '158111',
                name: 'Umbrella Stands',
                brands: '/index/brand-158111.aspx',
                link: '/pplp/100/75363/158099/cat-158111.aspx',
              },
              {
                id: '75459',
                name: 'Room Dividers & Screens',
                brands: '/index/brand-75459.aspx',
                link: '/pplp/100/75363/75443/cat-75459.aspx',
              },
              {
                id: '139742',
                name: 'Coat Racks & Hooks',
                brands: '/index/brand-139742.aspx',
                link: '/pplp/100/75363/158099/cat-139742.aspx',
              },
              {
                id: '385863',
                name: 'Kitchen Storage & Organisation',
                brands: '/index/brand-385863.aspx',
                link: '/pplp/cat-385863.aspx',
              },
              {
                id: '385864',
                name: 'Bathroom Storage',
                brands: '/index/brand-385864.aspx',
                link: '/pplp/cat-385864.aspx',
              },
              {
                id: '292884',
                name: 'Kids Baskets & Boxes',
                brands: '/index/brand-292884.aspx',
                link: '/pplp/cat-292884.aspx',
              },
              {
                id: '84009',
                name: 'Toy Boxes',
                brands: '/index/brand-84009.aspx',
                link: '/pplp/100/75363/75416/84004/cat-84009.aspx',
              }
            ]
          },
          {
            // will fix later sice it is not provided, given the id of first dropdown
            tag: 'div',
            id: '292884',
            name: 'Kids Storage',
            brand: '/index/brand-292884.aspx',
            link: '/pplp/100/74779/cat-292884.aspx',
            iconImg : 'https://i.postimg.cc/htZRnLxy/bg-Kids-storage.png',
            dropdowns: [
              {
                id: '292884',
                name: 'Kids Baskets & Boxes',
                brands: '/index/brand-292884.aspx',
                link: '/pplp/cat-292884.aspx',
              },
              {
                id: '84009',
                name: 'Toy Boxes',
                brands: '/index/brand-84009.aspx',
                link: '/pplp/100/75363/75416/84004/cat-84009.aspx',
              },
              {
                id: '75420',
                name: 'Kids Chest of Drawers',
                brands: '/index/brand-75420.aspx',
                link: '/pplp/100/75363/75416/cat-75420.aspx',
              },
              {
                id: '75530',
                name: 'Baby Changing Tables & Units',
                brands: '/index/brand-75530.aspx',
                link: '/pplp/100/75363/75526/cat-75530.aspx',
              },
              {
                id: '75417',
                name: 'Kids Wardrobes',
                brands: '/index/brand-75417.aspx',
                link: '/pplp/100/75363/75416/cat-75417.aspx',
              }
            ]
          },
          {
            tag: 'li',
            name: 'Hallway Storage',
            link: 'https://www.laredoute.co.uk/pplp/100/75363/158099/cat-158107.aspx',
            classNames: 'menuSelectionList data-id-1',
            iconImg : 'https://i.postimg.cc/9FVhYFCp/bg-Hallway-storage.png'
          },
          {
            tag: 'div',
            id: '158014',
            name: 'Food & Kitchen Storage',
            brand: '/index/brand-158014.aspx',
            link: '/pplp/100/74779/74834/cat-158014.aspx',
            iconImg : 'https://i.postimg.cc/g22b1SwL/bg-Food-kitchen-storage.png',
            dropdowns: [
              {
                id: '74783',
                name: 'Kitchen Canisters & Jars',
                brands: '/index/brand-74783.aspx',
                link: '/pplp/100/74779/74834/158014/cat-74783.aspx',
              },
              {
                id: '74791',
                name: 'Food Storage & Boxes',
                brands: '/index/brand-74791.aspx',
                link: '/pplp/100/74779/74834/158014/cat-74791.aspx',
              },
              {
                id: '74796',
                name: 'Travel Mugs',
                brands: '/index/brand-74796.aspx',
                link: '/pplp/100/74779/74834/158014/cat-74796.aspx',
              },
              {
                id: '275439',
                name: 'Bread Bins',
                brands: '/index/brand-275439.aspx',
                link: '/pplp/100/74779/74834/158014/cat-275439.aspx',
              }
            ]
          }
        ]

        // adding all sub elements
        console.log(insiderElements);

        insiderElements.forEach(element =>  {
          console.log('first for each');
          if(element.tag === 'li') {
            const listItem = document.createElement('li');
            listItem.className = element.classNames;
            // listItem.classList.add(element.classNames);
            listItem.setAttribute('data-haschild', 'false');
            listItem.setAttribute('data-cerberus', 'mainmenu-l2-cat');
            newListItemL2.appendChild(listItem);

            const listItemLink = document.createElement('a');
            listItemLink.innerText = element.name;
            listItemLink.href = element.link;
            listItem.classList.add('link-style');
            listItemLink.setAttribute('role', 'button');
            listItem.appendChild(listItemLink);

            const listIconSpan = document.createElement('span');
            listIconSpan.classList.add('menu_icon');
            listItemLink.insertAdjacentElement('afterbegin', listIconSpan);

            const listIconImg = document.createElement('img');
            listIconImg.src = element.iconImg;
            listIconImg.classList.add('img-size');
            listIconImg.alt = '';
            listIconSpan.appendChild(listIconImg);  
          
          } else {
            const listItem = document.createElement('div');
            listItem.classList.add('deployableSelectionList');
            newListItemL2.appendChild(listItem);

            const listDetails = document.createElement('details');
            listDetails.classList.add('deployableSelectionList_container');
            listDetails.setAttribute('data-lvl', '2');
            listItem.appendChild(listDetails);

            const listSummary = document.createElement('summary');
            listSummary.classList.add('deployableSelectionList_button');
            listSummary.setAttribute('data-lvl', '2');
            listDetails.appendChild(listSummary);

            const listIconSpan = document.createElement('span');
            listIconSpan.classList.add('menu_icon');
            listSummary.appendChild(listIconSpan);

            const listIconImg = document.createElement('img');
            listIconImg.src = element.iconImg;
            listIconImg.alt = '';
            listIconImg.classList.add('img-size');
            listIconSpan.appendChild(listIconImg);

            const listTextSpan = document.createElement('span');
            listTextSpan.classList.add('data-id-1');
            listTextSpan.setAttribute('data-haschild', 'true');
            listTextSpan.innerText = element.name;
            listSummary.appendChild(listTextSpan);

            // level 3 items
            const newL3List = document.createElement('div');
            newL3List.id = 'deployableSelectionListMenu1';
            newL3List.classList.add('deployableSelectionList_content');
            newL3List.setAttribute('aria-expanded', 'false');
            newL3List.setAttribute('aria-hidden', 'true');
            newL3List.setAttribute('role', 'definition');
            newL3List.setAttribute('tabindex', '-1');
            newL3List.setAttribute('aria-selected', 'false');
            listItem.appendChild(newL3List);

            const l3ListWrapper = document.createElement('div');
            l3ListWrapper.classList.add('deployableSelectionList_wrapper');
            newL3List.appendChild(l3ListWrapper);

            const l3ListContainer = document.createElement('div');
            l3ListContainer.classList.add('deployableSelectionList_itemsContainer');
            l3ListWrapper.appendChild(l3ListContainer);

            const l3ListItemParent = document.createElement('ul');
            l3ListItemParent.setAttribute('data-brands', element.brand);
            l3ListItemParent.setAttribute('data-link', element.link);
            l3ListItemParent.setAttribute('data-id', element.id);
            l3ListContainer.appendChild(l3ListItemParent);

            console.log(element.dropdowns);
            element.dropdowns.forEach(item => {

              const dropdownItem = document.createElement('li');
              dropdownItem.classList.add('deployableSelectionListItem');
              dropdownItem.setAttribute('data-lvl', '3');
              dropdownItem.setAttribute('data-haschild', 'false');
              dropdownItem.setAttribute('data-brands', item.brands);
              dropdownItem.setAttribute('data-menuid', 'null');
              dropdownItem.setAttribute('data-category-id', item.id);
              dropdownItem.setAttribute('data-category-label', item.name);
              dropdownItem.setAttribute('data-parentmenuid', 'null');
              l3ListItemParent.appendChild(dropdownItem);

              const dropdownItemLink = document.createElement('a');
              dropdownItemLink.href = item.link;
              dropdownItemLink.setAttribute('data-lvl', '3');
              dropdownItemLink.setAttribute('role', 'button');
              dropdownItemLink.setAttribute('data-cerberus', 'mainmenu-l2-cat');
              dropdownItemLink.innerText = item.name;
              dropdownItem.appendChild(dropdownItemLink);
            })
          }
        })
      })
      
      newListItem.addEventListener('click', () => {
        document.querySelector('#lrNewMenuV4 > div.panel-content').setAttribute('style', 'transform: translateX(-100%)');

        document.querySelector('#contentElement-root').classList.remove('panel-content-element--isOpen');
        document.querySelector('#contentElement-root').setAttribute('style', 'display: none');

        document.querySelector('#postNodeRoot').classList.remove('panel-content-element--isOpen');
        document.querySelector('#postNodeRoot').setAttribute('style', 'display: none');
        
        document.querySelector('#lrNewMenuV4 > div.panel-navbar > button.panel-navbar--back.lr-pillButton').setAttribute('style', 'display: flex');

        document.querySelector('#lrNewMenuV4 > div.panel-content > div:nth-child(3)').classList.add('panel-content-element--isOpen');
        document.querySelector('#lrNewMenuV4 > div.panel-content > div:nth-child(3)').setAttribute('style', 'display: grid');
      })
      
      // clicking the back button
      waitForElem('#lrNewMenuV4 > div.panel-navbar > button.panel-navbar--back.lr-pillButton', () => {
        // document.querySelectorAll('panel-content-element')
        document.querySelector('#lrNewMenuV4 > div.panel-navbar > button.panel-navbar--back.lr-pillButton')
                .addEventListener('click', () => {
                  document.querySelectorAll('.panel-content-element').forEach(e => {
                    e.setAttribute('style', 'display: none');
                  })
                  document.querySelector('#lrNewMenuV4 > div.panel-navbar > button.panel-navbar--back.lr-pillButton').setAttribute('style', 'display: none');
  
                  document.querySelector('#lrNewMenuV4 > div.panel-content').setAttribute('style', 'transform: unset');
  
                  document.querySelector('#contentElement-root').classList.add('panel-content-element--isOpen');
                  document.querySelector('#contentElement-root').setAttribute('style', 'display: grid');
  
                  document.querySelector('#postNodeRoot').classList.add('panel-content-element--isOpen');
                  document.querySelector('#postNodeRoot').setAttribute('style', 'display: grid');
  
                  document.querySelector('#lrNewMenuV4 > div.panel-content > div:nth-child(3)').classList.remove('panel-content-element--isOpen');
                  document.querySelector('#lrNewMenuV4 > div.panel-content > div:nth-child(3)').setAttribute('style', 'display: none');
                })
      })

    })
  }

  mainJs();
})();
