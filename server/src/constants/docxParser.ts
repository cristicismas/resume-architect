import expressions from 'angular-expressions';
import merge from 'lodash.merge';

export default (tag: string) => {
  if (tag === '.') {
    return {
      get: function(s: string) {
        return s;
      }
    };
  }

  const expr = expressions.compile(tag.replace(/(’|“|”|‘)/g, "'"));

  return {
    get: function(scope, context) {
      let obj = {};
      const scopeList = context.scopeList;
      const num = context.num;
      for (let i = 0, len = num + 1; i < len; i++) {
        obj = merge(obj, scopeList[i]);
      }
      return expr(scope, obj);
    }
  };
};
