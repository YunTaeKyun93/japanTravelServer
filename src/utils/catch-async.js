const catchAsync = (fn) => {
  const newFn = async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return newFn;
};

module.exports = catchAsync;
