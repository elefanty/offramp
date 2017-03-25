const changePathname = (pathname) => ({ 
  type: 'PATHNAME_CHANGE',
  pathname
});

module.exports = { changePathname };