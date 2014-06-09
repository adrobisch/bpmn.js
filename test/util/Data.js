function withData(fileName, success, autodone) {
  return function(done) {
    $.ajax("/base/"+fileName).done(function (requestedFile) {
      console.log(fileName +
          " loaded");
      success(requestedFile, done);
      if (!(autodone === false)) {
        done();
      }
    }).fail(function (error) {
      console.log("error while loading file: ", fileName, error.status);
    });
  };
}