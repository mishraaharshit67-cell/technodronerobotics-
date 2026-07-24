export function body(field) {
  const checks = [];
  const mw = (req, res, next) => {
    let val = req.body ? req.body[field] : undefined;
    for (const c of checks) {
      let err = null;
      if (c.op === 'trim' && typeof val === 'string') val = val.trim();
      if (c.op === 'notEmpty' && (!val || (typeof val === 'string' && !val.trim())))
        err = { msg: c.msg || `${field} is required` };
      if (c.op === 'isEmail' && (!val || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)))
        err = { msg: c.msg || 'Valid email required' };
      if (c.op === 'isLength' && typeof val === 'string') {
        if (c.min && val.trim().length < c.min) err = { msg: c.msg || `${field} must be at least ${c.min} characters` };
        if (c.max && val.trim().length > c.max) err = { msg: c.msg || `${field} must be at most ${c.max} characters` };
      }
      if (c.op === 'equals' && val !== c.val) err = { msg: c.msg || 'Invalid value' };
      if (err) {
        req._ve = req._ve || [];
        req._ve.push(err);
        break;
      }
    }
    next();
  };
  mw.trim = function () { checks.push({ op: 'trim' }); return this; };
  mw.notEmpty = function () { checks.push({ op: 'notEmpty' }); return this; };
  mw.isEmail = function () { checks.push({ op: 'isEmail' }); return this; };
  mw.isLength = function (o) { checks.push({ op: 'isLength', min: o.min, max: o.max }); return this; };
  mw.equals = function (v) { checks.push({ op: 'equals', val: v }); return this; };
  mw.withMessage = function (msg) { if (checks.length) checks[checks.length - 1].msg = msg; return this; };
  mw.normalizeEmail = function () { return this; };
  return mw;
}

export function validationResult(req) {
  const errors = req._ve || [];
  return { isEmpty: () => errors.length === 0, array: () => errors, errors };
}
