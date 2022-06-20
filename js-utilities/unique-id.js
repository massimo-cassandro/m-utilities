// import uniqid from '../../js/unique-id';
export default function () {
  return '_' + Number(Math.round(Math.random() * Date.now())).toString(36);
}
