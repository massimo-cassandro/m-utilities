// import uniqid from '../../js/unique-id';
export default function () {
  return 'id' + Number(Math.round(Math.random() * Date.now())).toString(36);
}
