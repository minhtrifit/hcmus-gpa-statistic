import { createAction } from "@reduxjs/toolkit";

export const importData = createAction("importData");
export const deleteData = createAction("deleteData");
export const deleteRecord = createAction("deleteRecord");
export const filterDublicate = createAction("filterDublicate");
export const filterEnglishSubject = createAction("filterEnglishSubject");
export const filterPESubject = createAction("filterPESubject");
export const filterdefenseAndSecurityEducationSubject = createAction(
  "filterdefenseAndSecurityEducationSubject"
);
export const searchSubject = createAction("searchSubject");
export const setGpaResult = createAction("setGpaResult");
