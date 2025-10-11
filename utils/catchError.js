export const catchAsyncError = (fu) => {
  return (req, res, next) => {
    fu(req, res, next).catch((err) => {
      next(err);
    });
  };
};
