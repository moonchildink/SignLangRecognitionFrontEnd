let arrKeys = {}

function unlockey(key) {
  delete arrKeys[key]
}

function lockKey(key) {
  arrKeys[key] = true
}

export default function(e = {}) {
  e.type = e.type || 'throttle';
  e.immediate = (e.immediate === undefined ? true : e.immediate);
  if (e.type === 'debounce') {
    if (e.immediate && !arrKeys[e.key]) {
      e.success && e.success();
    }
    clearInterval(arrKeys[e.key])
    arrKeys[e.key] = setTimeout(() => {
      e.success && e.success();
      unlockey(e.key)
    }, e.time || 300)
  } else if (e.type === 'throttle') {
    if (!arrKeys[e.key]) {
      if (e.immediate) {
        lockKey(e.key);
        e.success && e.success();
      } else {
        lockKey(e.key);
      }
      if (e.time) {
        let t = setTimeout(() => {
          if (!e.immediate) {
            e.success && e.success();
          }
          unlockey(e.key)
          clearInterval(t)
          t = null
        }, e.time)
      }
    } else {
      e.fail && e.fail()
    }
  }
  console.log(arrKeys);
}