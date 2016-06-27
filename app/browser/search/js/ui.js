function getFocusable() {
  return [document.querySelector('#el-search')]
    .concat([].slice.call(document.querySelectorAll('.el-item-dom')))
}

function selectBtn(n, $selItem) {
  let $btns = [].slice.call(($selItem||document).querySelectorAll('.el-item-dom.select .btn'))
  if ($btns.length === 0) return
  let prevIndex = $btns.findIndex($btn => $btn.classList.contains('select'))
  if (prevIndex >= 0){
    $btns[prevIndex].classList.remove('select')
  }
  let $selBtn = n
  switch (n) {
  case -1:
    $selBtn = $btns[(prevIndex- 1 + $btns.length) % $btns.length]
    break;
  case 1:
    $selBtn = $btns[(prevIndex + 1) % $btns.length]
    break;
  default:
  }
  $selBtn.classList.add('select')
}


//select item on Tab
document.addEventListener('focus', function (e) {
  if (e.target.classList.contains('el-item-dom')) {
    [].slice.call(document.querySelectorAll('.el-item-dom'))
      .forEach(item => item.classList.remove('select'))
    e.target.classList.add('select')
  }else if (e.target.classList.contains('btn-dom')) {
    selectBtn(e.target)
  }
}, true)

// auto focus in shown
window.addEventListener('focus', function () {
  document.querySelector('#el-search').focus()
})

let itemIsSel = $el =>
  $el === document.activeElement ||
  $el.classList.contains('select')
module.exports = {
    selectNextItem: function () {
      let $fItems = getFocusable()
      let prevIndex = $fItems.findIndex(itemIsSel)
      let $selItem = $fItems[(prevIndex + 1) % $fItems.length]
      $selItem.focus()
    },
    selectPrevItem: function () {
      let $fItems = getFocusable()
      let prevIndex = $fItems.findIndex(itemIsSel)
      let $selItem = $fItems[(prevIndex - 1 + $fItems.length) % $fItems.length]
      $selItem.focus()
    },
    selectNextItemOpt: function () {
      selectBtn(1)
    },
    selectPrevItemOpt: function () {
      selectBtn(-1)
    },
    renderItems: function (items) {
        let $itemUl = document.querySelector('#el-items')
        console.log(items);
        $itemUl.innerHTML = `${items.map((item, index)=>{
          return item.custom_view?
          `<li class="el-item el-item-dom" tabindex="0" data-item-index='${index}'>
            ${item.custom_view}
          </li>`:

          `<li class="el-item el-item-dom" tabindex="0" data-item-index='${index}'>
            <img class="el-item-icon" src="${item.icon}"/>
            <div class="el-item-info">
              <div class="el-item-name">${item.name}<span class="el-item-key">Alt+${index+1}</span></div>
              <div class="el-item-detail">${item.detail?item.detail:' '}</div>
            </div>
            ${item.opts?
              `<div class="btn-group">
                ${item.opts.map((opt,optIndex)=>
                  `<button class="btn btn-dom color-${optIndex} ${optIndex===0?  `select`:``}" data-name="${opt.name}">${opt.label}</button>`
                ).join('')}
              </div>`:``}
          </li>`
        }).join('')}`
  }
}
