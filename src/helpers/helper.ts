export const checkInitSubject = (list: any[], subject: string) => {
  let count = 0;
  for (var j = 0; j < list.length; ++j)
    if (list[j].subject === subject) ++count;
  return count;
};

export const findMaxPointOfSubjectIndex = (list: any[], subject: string) => {
  let max;
  for (var i = 0; i < list.length; ++i) {
    if (list[i].subject === subject) {
      max = list[i];
      for (var j = 0; j < list.length; ++j) {
        if (list[j].subject === max > list[j].point > max.point) {
          max = list[j];
        }
      }
    }
  }
  return max;
};
