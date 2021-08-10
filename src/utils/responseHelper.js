export function handleGetKnowledgeModelAndDataResponse (res) {
  const baseData = res.knowledgeData.knowledgeBase
  baseData.classificationName = baseData.classificationEnt.categoryname
  // if (baseData.creatorEnt) {
  //   baseData.creatorName = baseData.creatorEnt.username
  // }
  const formData = res.knowledgeData.formData
  let formConfig = res.knowledgeModel.formModel
  formConfig = Array.isArray(formConfig) ? {
    formType: 1,
    relationForms: formConfig
  } : formConfig

  return {
    baseData,
    formData,
    formConfig
  }
}
