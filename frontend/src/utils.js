import { addModel, editModel, deleteModel } from "./actions";

// Handles model form input
export const handleInput = (value, model, field) => {
  model[field] = value;
}

// `Stringifies` Objects and Arrays so that they can be edited in a text form.
export const stringifyValues = (data) => {
  for (let key in data) {
    // An Array of foreign keys should not be stringified.
    if (key !== 'lessonIdOptions' && key !== 'exampleIdOptions' && data[key] !== null) {
      if (data[key].constructor === Object || data[key].constructor === Array) {
        data[key] = JSON.stringify(data[key]);
      }
    }
  }
  return data;
}

// Takes `stringified` model data and converts them back to Object or Array.
const parseValues = (model, fieldArray) => {
  for (let field of fieldArray) {
     model[field] = JSON.parse(model[field]);
  }
  return model;
}

// Saves changes made to an existing model or creates a new model.
export const handleSave = (adminAction, dispatch, modelName, modelData, fieldArray) => {

  if (adminAction === 'editModel') {
    
    dispatch(editModel(modelName, modelData.id, parseValues(modelData, fieldArray)));

  } else if (adminAction === 'addModel') {

    dispatch(addModel(modelName, parseValues(modelData, fieldArray)));

  }

  window.location.replace(`#/admin/${modelName}s`);
}

export const handleDelete = (dispatch, modelName, modelData) => {
  dispatch(deleteModel(modelName, modelData.id));
  window.location.replace(`#/admin/${modelName}s`);
}