export function $(selector, context=document) {
  return context.querySelector(selector);
}
export function $$(selector, context=document) {
  return context.querySelectorAll(selector);
}
