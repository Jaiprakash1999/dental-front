export const formatArray = (options = []) => {
  const newOptions = options?.map((option) => ({
    label: option,
    value: option,
  }));
  return newOptions;
};

export const formatArrayOfObject = (options = []) => {
  const newOptions = options.map((option) => ({
    label: option.name,
    value: option.name,
  }));
  return newOptions;
};
export const formatArrayForHabitations = (options = []) => {
  const newOptions = options.map((option) => ({
    label: option.habitat,
    value: option.value,
    id: option.id,
  }));
  return newOptions;
};

export const formatArrayForMMUhead = (options = []) => {
  const filteredOptions = options.filter((option) => !option.isDelete);
  const newOptions = filteredOptions.map((option) => ({
    label: option.name,
    value: option.name,
    id: option.id,
  }));
  return newOptions;
};

export const formatArrayOfObjectForHandoubts = (options = []) => {
  const newOptions = options.map((option) => ({
    label: option.title,
    value: option.tag,
  }));
  return newOptions;
};

export const formatArrayOfObjectForDrug = (options = []) => {
  const newOptions = options.map((option) => ({
    label: option.drug,
    value: option.drug,
    lingo: option.lingo,
  }));
  return newOptions;
};

export const formatStates = (options = []) => {
  const newOptions = options.map((option) => ({
    label: option.stateName,
    value: option.stateCode,
  }));
  return newOptions;
};

export const formatDistricts = (options = []) => {
  const newOptions = options.map((option) => ({
    label: option.name,
    value: option.code,
  }));
  return newOptions;
};

export const formatLabTest = (options = []) => {
  const newOptions = options.map((option) => ({
    labInvestigation: option,
    result: null,
    note: "",
  }));
  return newOptions;
};
