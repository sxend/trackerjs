function newtr() {
  const tr: any = function() {
    tr.q.push([].slice.call(arguments));
  };
  tr.q = tr.q || [];
  return tr;
}
const tr: any = newtr();

export { tr, newtr };
