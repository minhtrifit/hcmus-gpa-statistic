import { createReducer } from "@reduxjs/toolkit";

import {
  importData,
  deleteData,
  deleteRecord,
  filterDublicate,
  filterEnglishSubject,
  filterPESubject,
  filterdefenseAndSecurityEducationSubject,
  searchSubject,
  setGpaResult,
} from "../actions/gpa.action";

import {
  checkInitSubject,
  findMaxPointOfSubjectIndex,
} from "../../helpers/helper";

import {
  englishSubject,
  PESubject,
  defenseAndSecurityEducationSubject,
} from "../../utils/subject";

// Reducer InitialState interface declair
interface GpaState {
  sourceData: any[] | undefined;
  data: any[] | undefined;
  checkDublicate: boolean;
  checkEnglish: boolean;
  checkPE: boolean;
  checkDSE: boolean;
  gpaSum: number | undefined;
  gpaResult: number | undefined;
}

// InitialState value
const initialState: GpaState = {
  sourceData: [],
  data: [],
  checkDublicate: false,
  checkEnglish: false,
  checkPE: false,
  checkDSE: false,
  gpaSum: 0,
  gpaResult: 0,
};

const gpaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(importData, (state, action: any) => {
      if (action.payload !== undefined) {
        state.sourceData = action.payload;
        state.data = action.payload;
      }
    })
    .addCase(deleteData, (state) => {
      state.data = [];
    })
    .addCase(deleteRecord, (state, action: any) => {
      if (state.data !== undefined && action.payload !== undefined) {
        const newData: any[] = state.data.filter(
          (item: any) => item.key !== action.payload.key
        );
        state.data = newData;
      }
    })
    .addCase(filterDublicate, (state, action: any) => {
      const list = action.payload?.list;
      const checked = action.payload?.checked;

      if (checked === true) {
        for (var i = 0; i < list.length; ++i) {
          const checkSubject = list[i].subject;
          const checkInit = checkInitSubject(list, checkSubject);
          if (checkInit === 2) {
            const newData = list.filter((value: any) => {
              if (value.subject === checkSubject) {
                return value === findMaxPointOfSubjectIndex(list, checkSubject);
              } else return value;
            });

            state.data = newData;
            state.checkDublicate = true;
          }
        }
      } else {
        state.data = state.sourceData;
        state.checkDublicate = false;
        let newData = state.sourceData;

        if (state.checkEnglish && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !englishSubject.includes(value.subject);
          });
        }
        if (state.checkPE && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !PESubject.includes(value.subject);
          });
        }
        if (state.checkDSE && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !defenseAndSecurityEducationSubject.includes(value.subject);
          });
        }
        state.data = newData;
      }
    })
    .addCase(filterEnglishSubject, (state, action: any) => {
      const list = action.payload?.list;
      const checked = action.payload?.checked;

      if (checked === true) {
        const newData = list.filter((value: any) => {
          return !englishSubject.includes(value.subject);
        });
        state.data = newData;
        state.checkEnglish = true;
      } else {
        state.data = state.sourceData;
        state.checkEnglish = false;

        let newData: any = state.sourceData;

        if (state.checkDublicate && newData !== undefined) {
          for (var i = 0; i < newData.length; ++i) {
            const checkSubject = newData[i].subject;
            const checkInit = checkInitSubject(newData, checkSubject);
            if (checkInit === 2) {
              const newData2 = newData.filter((value: any) => {
                if (value.subject === checkSubject) {
                  return (
                    value === findMaxPointOfSubjectIndex(newData, checkSubject)
                  );
                } else return value;
              });

              newData = newData2;
            }
          }
        }
        if (state.checkPE && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !PESubject.includes(value.subject);
          });
        }
        if (state.checkDSE && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !defenseAndSecurityEducationSubject.includes(value.subject);
          });
        }
        state.data = newData;
      }
    })
    .addCase(filterPESubject, (state, action: any) => {
      const list = action.payload?.list;
      const checked = action.payload?.checked;

      if (checked === true) {
        const newData = list.filter((value: any) => {
          return !PESubject.includes(value.subject);
        });
        state.data = newData;
        state.checkPE = true;
      } else {
        state.data = state.sourceData;
        state.checkPE = false;

        let newData: any = state.sourceData;

        if (state.checkDublicate && newData !== undefined) {
          for (var i = 0; i < newData.length; ++i) {
            const checkSubject = newData[i].subject;
            const checkInit = checkInitSubject(newData, checkSubject);
            if (checkInit === 2) {
              const newData2 = newData.filter((value: any) => {
                if (value.subject === checkSubject) {
                  return (
                    value === findMaxPointOfSubjectIndex(newData, checkSubject)
                  );
                } else return value;
              });

              newData = newData2;
            }
          }
        }
        if (state.checkEnglish && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !englishSubject.includes(value.subject);
          });
        }
        if (state.checkDSE && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !defenseAndSecurityEducationSubject.includes(value.subject);
          });
        }
        state.data = newData;
      }
    })
    .addCase(filterdefenseAndSecurityEducationSubject, (state, action: any) => {
      const list = action.payload?.list;
      const checked = action.payload?.checked;

      if (checked === true) {
        const newData = list.filter((value: any) => {
          return !defenseAndSecurityEducationSubject.includes(value.subject);
        });
        state.data = newData;
        state.checkDSE = true;
      } else {
        state.data = state.sourceData;
        state.checkDSE = false;

        let newData: any = state.sourceData;

        if (state.checkDublicate && newData !== undefined) {
          for (var i = 0; i < newData.length; ++i) {
            const checkSubject = newData[i].subject;
            const checkInit = checkInitSubject(newData, checkSubject);
            if (checkInit === 2) {
              const newData2 = newData.filter((value: any) => {
                if (value.subject === checkSubject) {
                  return (
                    value === findMaxPointOfSubjectIndex(newData, checkSubject)
                  );
                } else return value;
              });

              newData = newData2;
            }
          }
        }
        if (state.checkEnglish && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !englishSubject.includes(value.subject);
          });
        }
        if (state.checkPE && newData !== undefined) {
          newData = newData.filter((value: any) => {
            return !PESubject.includes(value.subject);
          });
        }

        state.data = newData;
      }
    })
    .addCase(searchSubject, (state, action: any) => {
      const value = action.payload?.value;

      if (value !== "" && state.sourceData !== undefined) {
        const newData = state.sourceData.filter((result: any) => {
          return result.subject.toLowerCase().includes(value.toLowerCase());
        });
        state.data = newData;
      } else state.data = state.sourceData;
    })
    .addCase(setGpaResult, (state, action: any) => {
      state.gpaSum = action.payload.sum;
      state.gpaResult = action.payload.result;
    });
});

export default gpaReducer;
