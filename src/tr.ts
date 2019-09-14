const tr: any = function tr() {
  tr.q.push([].slice.call(arguments));
};
tr.q = tr.q || [];
export { tr };
